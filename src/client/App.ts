import {default as Express} from "express";
import {default as BCryptJs} from "bcryptjs";
import {Maybe} from "@host";
import {RedisClientType as RedisClientLike} from "redis";
import {createClient as RedisClient} from "redis";
import {Transpiler} from "@host";
import {assert} from "@host";
import {join} from "path";

async function reboot(app: App, delay: number): Promise<void> {
    const seconds = (ms: number) => ms / 1000;

    while (true) {
        try {
            await app.run();
            break;
        }
        catch (e) {
            console.error("PANIC", e);
            console.log(`restarting in ${seconds(delay)} seconds ...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}



type DatabaseStorageLayout = {
    users: Maybe<UserData[]>;
    products: Maybe<ProductData[]>;
};

type DatabaseSchema = 
    & Record<string, Maybe<object>>
    & {};
type Database<T extends DatabaseSchema> = {
    get<K extends keyof T>(key: K): Promise<T[K]>;
    set<K extends keyof T>(key: K, data: T[K]): Promise<void>;
};

type Redis<T extends DatabaseSchema> = 
    & Database<T>
    & {
        disconnect(): Promise<string>;
    };
async function Redis<T extends DatabaseSchema>(host: string, port: bigint, password: string): Promise<Redis<T>> {
    let _client: RedisClientLike;

    /***/ {
        /***/ {
            _client =
                RedisClient({
                    password: password,
                    socket: {
                        host: host,
                        port: Number(port)
                    }
                });
            try {
                await _client.connect();
            }
            catch (e) {
                await disconnect();
                throw e;
            }
        }

        /***/ {
            return {get, set, disconnect};
        }

        async function get<K extends keyof T>(key: K): Promise<T[K]> {
            return JSON.parse((await _client.get((key as string)))!);
        }

        async function set<K extends keyof T>(key: K, data: T[K]): Promise<void> {
            _client.set((key as string), JSON.stringify(data));
            return;
        }

        async function disconnect(): Promise<string> {
            return await _client.quit();
        }
    }
}


type UserSettingsData = {
    styleTags: string[];
};
type UserSettings = {
    styleTags(): Readonly<string[]>;
    styleTags(key: bigint): Readonly<string>;
    addStyleTags(... tags: string[]): void;
    removeStyleTags(... tags: string[]): void;
};
function UserSettings(): UserSettings;
function UserSettings(styleTags: string[]): UserSettings;
function UserSettings(styleTags?: string[]): UserSettings {
    let _styleTags: string[];

    /***/ {
        _styleTags = styleTags ?? [];
    }

    /***/ {
        /***/ {
            return {styleTags, addStyleTags, removeStyleTags};
        }

        function styleTags(): Readonly<string[]>;
        function styleTags(key: bigint): Readonly<string>;
        function styleTags(key?: bigint): Readonly<string[] | string> {
            if (key) {
                assert(key >= 0n);
                assert(key <= BigInt(_styleTags.length) - 1n);
                return _styleTags[Number(key)];
            }
            return _styleTags;
        }

        function addStyleTags(... tags: string[]): void {
            _styleTags.push(... tags);
            return;
        }

        function removeStyleTags(... tags: string[]): void {
            let keys: number[] = [];
            let i: number = 0;
            while (i < tags.length) {
                let tag: string = tags[i];
                let x: number = 0;
                while (x < _styleTags.length) {
                    let styleTag: string = _styleTags[i];
                    if (tag === styleTag) keys.push(x);
                    x += 1;
                }
                i += 1;
            }
            i = 0;
            while (i < keys.length) {
                let key: number = keys[i];
                _styleTags.splice(key, 1);
                i += 1;
            }
            return;
        }
    }
}



type UserConstructorPayload = {
    username: string;
    password?: string;
    settings?: UserSettings;
    database?: Database<DatabaseStorageLayout>;
};
type UserData = {
    username: string;
    hashedPassword: string;
    settings: UserSettingsData;
};
type User = {
    exists(): Promise<boolean>;
    username(): string | null;
    hashedPassword(): Promise<string | null>;
    signIn(): Promise<UserData>;
    signUp(): Promise<void>;
};
function User({username, password, settings, database}: UserConstructorPayload): User {
    let _username: string;
    let _password: string | null;
    let _settings: UserSettings | null;
    let _database: Database<DatabaseStorageLayout> | null;
    let _salt: number = 32;

    /***/ {
        _username = username;
        _password = password ?? null;
        _settings = settings ?? null;
        _database = database ?? null;
    }

    /***/ {
        /***/ {
            assert(_username.length !== 0);
            assert(_username.length < 64);
        }

        /***/ {
            return {exists, username, hashedPassword, signIn, signUp};
        }

        async function exists(): Promise<boolean> {
            assert(_database !== null, "MISSING_DATABASE");
            let users: Maybe<UserData[]> = await _database!.get("users");
            if (users === undefined || users === null) {
                await _database!.set("users", []);
                users = [];
            }
            let i: number = 0;
            while (i < users!.length) {
                let user: UserData = users![i];
                if (_username === user.username) return true;
                i += 1;
            }
            return false;
        }

        function username(): string | null {
            return _username;
        }

        async function hashedPassword(): Promise<string | null> {
            return _password === null ? null : await BCryptJs.hash(_password, _salt);
        }

        async function signIn(): Promise<UserData> {
            assert(_username !== null, "MISSING_USERNAME");
            assert(_password !== null, "MISSING_PASSWORD");
            assert(await exists(), "INVALID_USERNAME_OR_PASSWORD");
            let users: Maybe<UserData[]> = await _database!.get("users");
            if (users === undefined || users === null) {
                await _database!.set("users", []);
                users = [];
            }
            let i: number = 0;
            while (i < users!.length) {
                let user: UserData = users![i];
                if (_username === user.username) {
                    assert(await BCryptJs.compare(_password!, user.hashedPassword), "INVALID_USERNAME_OR_PASSWORD");
                    return user;
                };
                i += 1;
            }
            throw Error("PANIC");
        }

        async function signUp(): Promise<void> {
            assert(_username !== null, "MISSING_USERNAME");
            assert(_password !== null, "MISSING_PASSWORD");
            assert(!await exists(), "INVALID_USERNAME_OR_PASSWORD");
            let users: Maybe<UserData[]> = await _database!.get("users");
            if (users === undefined || users === null) {
                await _database!.set("users", []);
                users = [];
            }
            let settings: UserSettings = _settings === null ? UserSettings() : _settings;
            let user: UserData = {
                username: _username,
                hashedPassword: await BCryptJs.hash(_password!, _salt),
                settings: {
                    styleTags: [... settings.styleTags()]
                }
            };
            users.push(user);
            await _database!.set("users", users);
            return;
        }
    }
}



type ProductConstructorPayload = {
    name: string;
    description: string;
    price: bigint;
};
type ProductData = {
    name: string;
    description: string;
    price: number;
};
type Product = {
    name(): string;
    description(): string;
    price(): bigint;
};
function Product({name, description, price}: ProductConstructorPayload): Product {
    let _name: string;
    let _description: string;
    let _price: bigint;

    /***/ {
        _name = name;
        _description = description;
        _price = price;
    }

    /***/ {
        /***/ {
            assert(_name.length <= 32);
            assert(_name.length >= 4);
            assert(_price >= 0n);
        }
        
        /***/ {
            return {name, description, price};
        }

        function name(): string {
            return _name;
        }

        function description(): string {
            return _description;
        }

        function price(): bigint {
            return _price;
        }
    }
}



type App = {
    run(): Promise<void>;
};
function App(): App {
    let _products: Product[];

    /***/ {
        /***/ {
            _products = [];
        }

        /***/ {
            return {run};
        }

        async function run(): Promise<void> {
            await _transpile();
            let database: Redis<DatabaseStorageLayout> = await Redis("redis-15112.c259.us-central1-2.gce.redns.redis-cloud.com", 15112n, process.env?.["redis-key"]!);
            Express()
                .use(Express.static(__dirname))
                .use(Express.json())
                .get("/", async (request, response) => response.status(200).sendFile(join(__dirname, "App.html")))
                .get("/get/products", async (request, response) => {
                    try {
                        let products: Maybe<ProductData[]> = await database.get("products");
                        response.send(products ?? []);
                        return;
                    }
                    catch (e) {
                        if (e instanceof Error) response.send({message: e.message});
                        else throw e;
                    }
                })
                .post("/user/sign-in", async (request, response) => {
                    try {
                        let invalidRequestBodyErrorCode: string = "INVALID_REQUEST_BODY";
                        assert(typeof request.body.username === "string", invalidRequestBodyErrorCode);
                        assert(typeof request.body.password === "string", invalidRequestBodyErrorCode);
                        let user: User = User({
                            username: request.body.username,
                            password: request.body.password,
                            database: database
                        });
                        let userData: UserData = await user.signIn();
                        response.send({
                            message: "SIGN_IN_SUCCESSFUL",
                            user: userData
                        });
                        return;
                    }
                    catch (e) {
                        if (e instanceof Error) response.send({message: e.message});
                        else throw e;
                    }
                })
                .post("/user/sign-up", async (request, response) => {
                    try {
                        let invalidRequestBodyErrorCode: string = "INVALID_REQUEST_BODY";
                        assert(typeof request.body.username === "string", invalidRequestBodyErrorCode);
                        assert(typeof request.body.password === "string", invalidRequestBodyErrorCode);
                        assert(typeof request.body.settings === "object", invalidRequestBodyErrorCode);
                        assert("styleTags" in request.body.settings, invalidRequestBodyErrorCode);
                        assert(Array.isArray(request.body.settings.styleTags), invalidRequestBodyErrorCode);
                        let i: number = 0;
                        while (i < request.body.settings.styleTags.length) {
                            let tag: unknown = typeof request.body.settings.styleTags[i];
                            assert(typeof tag === "string", invalidRequestBodyErrorCode);
                            i += 1;
                        }
                        i = 0;
                        let user: User = User({
                            username: request.body.username,
                            password: request.body.password,
                            settings: request.body.password,
                            database: database
                        });
                        await user.signUp();
                        response.send({message: "SIGN_UP_SUCCESSFUL"});
                        return;
                    }
                    catch (e) {
                        if (e instanceof Error) response.send({message: e.message});
                        else throw e;
                    }
                })
                .listen(3000);
        }

        async function _transpile(): Promise<void> {
            let path0: string = join(__dirname, "App.tsx");
            let path1: string = __dirname;
            await Transpiler.transpile(path0, path1);
            return;
        }
    }
}



(async () => {
    let app: App = App();
    await reboot(app, 60000);
})();