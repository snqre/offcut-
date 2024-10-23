export type Closure<Payload extends unknown[], Result> =
    | ((... payload: Payload) => Promise<Result>)
    | ((... payload: Payload) => Result);

export type Function<Payload, Return> = 
    | ((payload: Payload) => Promise<Return>)
    | ((payload: Payload) => Return);

export type Maybe<T> =
    | T
    | null
    | undefined;

export function assert(condition: boolean): asserts condition is true;
export function assert(condition: boolean, message: string): asserts condition is true;
export function assert(condition: boolean, error: Error): asserts condition is true;
export function assert(condition: boolean, data?: Error | string): asserts condition is true {
    if (condition) return;
    if (typeof data === "string") throw Error(data); 
    if (!data) throw Error();
    throw data;
}

export * from "./Product";