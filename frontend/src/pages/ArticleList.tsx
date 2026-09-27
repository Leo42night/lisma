import { useEffect, useState } from "react";
import type { Artikel } from "../types";
import { getArticles, deleteArticle } from "../api/articles";
import { NavLink } from "react-router-dom";

export default function ArticleList() {
    const [articles, setArticles] = useState<Artikel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = () => {
        setLoading(true);
        getArticles()
            .then(setArticles)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    };

    useEffect(load, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Hapus artikel ini?")) return;
        await deleteArticle(id);
        load();
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-black">Daftar Artikel</h1>
                <a
                    href='/berita/new'
                    className="bg-black text-white px-4 py-2 rounded-lg font-bold border-2 border-black hover:bg-white hover:text-black transition-colors"
                >
                    + Artikel Baru
                </a>
            </div>

            {loading && <p>Memuat...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && articles.length === 0 && (
                <p className="text-gray-500">Belum ada artikel.</p>
            )}

            <div className="space-y-4">
                {articles.map((a) => (
                    <div
                        key={a.id}
                        className="border-2 border-black rounded-lg p-4 flex justify-between items-start gap-4"
                    >
                        <NavLink to={`/berita/${a.id}`}
                            className="cursor-pointer flex-1"
                        >
                            <span className="inline-block text-xs bg-gray-200 px-2 py-1 rounded mb-1">
                                {a.kategori}
                            </span>
                            <h2 className="text-xl font-bold">{a.judul}</h2>
                            <p className="text-gray-600 text-sm">{a.ringkasan}</p>
                            <p className="text-gray-400 text-xs mt-2">
                                {a.penulis} • {new Date(a.tanggal).toLocaleDateString("id-ID")}{" "}
                                • {a.waktuBaca} menit baca
                            </p>
                        </NavLink>
                        <div className="flex flex-col gap-2 shrink-0">
                            <NavLink to={`/berita/${a.id}/edit`}
                                className="font-bold underline"
                            >
                                Edit
                            </NavLink>
                            <button
                                onClick={() => handleDelete(a.id)}
                                className="font-bold text-red-600 underline"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
