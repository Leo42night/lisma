import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { articleRoutes } from "./routes/articles";
import { prisma } from "../prisma/db"; // turso LibSQL

interface ApiResponse<T> {
    data: T;
    message?: string;
}

const app = new Elysia()
    .use(cors())
    .use(articleRoutes)
    .get("/", async (): Promise<ApiResponse<any>> => {
        const start = Date.now(); // 1. Mulai hitung waktu

        let dbStatus = "ok";
        let dbMessage = "connected";

        try {
            // 2. Cek koneksi database dengan query paling ringan ($queryRaw)
            await prisma.$queryRaw`SELECT 1`;
        } catch (error) {
            dbStatus = "error";
            dbMessage = error instanceof Error ? error.message : "database connection failed";
        }

        const responseTime = `${Date.now() - start}ms`; // 3. Hitung total durasi

        return {
            data: {
                version: "v2.2",
                status: dbStatus === "ok" ? "ok" : "degraded",
                database: {
                    status: dbStatus,
                    message: dbMessage
                },
                uptime: process.uptime(), // Bonus: durasi server berjalan
                responseTime: responseTime
            },
            message: dbStatus === "ok" ? "server and database are running" : "database issue detected",
        };
    })
    .listen(3000);

console.log(
    `🦊 Run: http://${app.server?.hostname}:${app.server?.port}`,
);
