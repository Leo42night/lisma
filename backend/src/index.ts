import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { articleRoutes } from "./routes/articles";

const app = new Elysia()
    .use(cors())
    .use(articleRoutes)
    .listen(3000);

console.log(
    `🦊 Run: http://${app.server?.hostname}:${app.server?.port}`,
);
