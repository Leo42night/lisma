import { Elysia, t } from "elysia";
import { randomUUID } from "crypto";
import { prisma } from "../../prisma/db";

// Skema validasi untuk satu blok konten (union berdasarkan "type")
const contentBlockSchema = t.Union([
    t.Object({
        id: t.String(),
        type: t.Literal("paragraf"),
        teks: t.String(),
    }),
    t.Object({
        id: t.String(),
        type: t.Literal("subheading"),
        teks: t.String(),
    }),
    t.Object({
        id: t.String(),
        type: t.Literal("gambar"),
        url: t.String(),
        caption: t.Optional(t.String()),
    }),
    t.Object({
        id: t.String(),
        type: t.Literal("kutipan"),
        kutipan: t.String(),
        kutipanSumber: t.String(),
    }),
    t.Object({
        id: t.String(),
        type: t.Literal("eventData"),
        lokasi: t.String(),
        waktu: t.String(),
        pemateri: t.String(),
    }),
]);

const articleBody = t.Object({
    judul: t.String({ minLength: 1 }),
    ringkasan: t.String({ minLength: 1 }),
    kategori: t.String({ minLength: 1 }),
    penulis: t.String({ minLength: 1 }),
    tanggal: t.String(), // ISO date string, mis. "2026-09-27"
    waktuBaca: t.Number({ minimum: 1 }),
    konten: t.Array(contentBlockSchema),
});

// Prisma menyimpan konten sebagai string JSON; helper ini
// mem-parse-nya kembali jadi array sebelum dikirim ke client.
function serialize(article: {
    id: string;
    judul: string;
    ringkasan: string;
    kategori: string;
    penulis: string;
    tanggal: Date;
    waktuBaca: number;
    konten: string;
    createdAt: Date;
    updatedAt: Date;
}) {
    return {
        ...article,
        konten: JSON.parse(article.konten),
    };
}

export const articleRoutes = new Elysia({ prefix: "/articles" })
    // GET /articles — daftar semua artikel, terbaru dulu
    .get("/", async () => {
        const articles = await prisma.article.findMany({
            orderBy: { tanggal: "desc" },
        });
        return articles.map(serialize);
    })

    // GET /articles/:id — detail satu artikel
    .get("/:id", async ({ params, set }) => {
        const article = await prisma.article.findUnique({
            where: { id: params.id },
        });
        if (!article) {
            set.status = 404;
            return { message: "Artikel tidak ditemukan" };
        }
        return serialize(article);
    })

    // POST /articles — buat artikel baru
    .post(
        "/",
        async ({ body, set }) => {
            // pastikan tiap blok konten punya id, walau frontend lupa mengisi
            const konten = body.konten.map((block) => ({
                ...block,
                id: block.id || randomUUID(),
            }));

            const article = await prisma.article.create({
                data: {
                    judul: body.judul,
                    ringkasan: body.ringkasan,
                    kategori: body.kategori,
                    penulis: body.penulis,
                    tanggal: new Date(body.tanggal),
                    waktuBaca: body.waktuBaca,
                    konten: JSON.stringify(konten),
                },
            });

            set.status = 201;
            return serialize(article);
        },
        { body: articleBody },
    )

    // PUT /articles/:id — perbarui artikel
    .put(
        "/:id",
        async ({ params, body, set }) => {
            try {
                const article = await prisma.article.update({
                    where: { id: params.id },
                    data: {
                        judul: body.judul,
                        ringkasan: body.ringkasan,
                        kategori: body.kategori,
                        penulis: body.penulis,
                        tanggal: new Date(body.tanggal),
                        waktuBaca: body.waktuBaca,
                        konten: JSON.stringify(body.konten),
                    },
                });
                return serialize(article);
            } catch {
                set.status = 404;
                return { message: "Artikel tidak ditemukan" };
            }
        },
        { body: articleBody },
    )

    // DELETE /articles/:id — hapus artikel
    .delete("/:id", async ({ params, set }) => {
        try {
            await prisma.article.delete({ where: { id: params.id } });
            return { message: "Artikel berhasil dihapus" };
        } catch {
            set.status = 404;
            return { message: "Artikel tidak ditemukan" };
        }
    });
