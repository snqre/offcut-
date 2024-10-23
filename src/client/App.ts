import * as Host from "@host";

const path0: string = Host.Path.join(__dirname, "App.tsx");
const path1: string = __dirname;
await Host.Transpiler.transpile(path0, path1);
const server = Host.Express()
    .use(Host.Express.static(__dirname))
    .use(Host.Express.json())
    .get("/", async (request, response) => response.status(200).sendFile(Host.Path.join(__dirname, "App.html")))
    .listen(3000);