import type { Artikel, ArtikelInput } from "../types";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3000'}/articles`;

export async function getArticles(): Promise<Artikel[]> {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Gagal memuat daftar artikel");
    return res.json();
}

export async function getArticle(id: string): Promise<Artikel> {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Artikel tidak ditemukan");
    return res.json();
}

export async function createArticle(data: ArtikelInput): Promise<Artikel> {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Gagal membuat artikel");
    return res.json();
}

export async function updateArticle(
    id: string,
    data: ArtikelInput,
): Promise<Artikel> {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Gagal memperbarui artikel");
    return res.json();
}

export async function deleteArticle(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Gagal menghapus artikel");
}
