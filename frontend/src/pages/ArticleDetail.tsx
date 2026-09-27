import { useEffect, useState } from "react";
import type { Artikel } from "../types";
import { getArticle } from "../api/articles";
import { ContentBlockRenderer } from "../components/article/ContentBlockRenderer";
import { Navigate, useParams } from "react-router-dom";
import usePrevLoc from "../utils/usePrevLoc";

export default function ArticleDetail() {
  const { id } = useParams();
  const prevLoc = usePrevLoc();
  if (!id) return <Navigate to={prevLoc?.pathname || "/berita"} replace />;
  const [artikel, setArtikel] = useState<Artikel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getArticle(id)
      .then(setArtikel)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Memuat...</p>;
  if (!artikel) return <p className="p-6">Artikel tidak ditemukan.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <a href={prevLoc?.pathname || "/berita"} className="mb-4 font-bold underline">
        &larr; Kembali
      </a>

      <span className="inline-block bg-black text-white text-xs px-2 py-1 rounded mb-2">
        {artikel.kategori}
      </span>
      <h1 className="text-3xl font-black mb-2">{artikel.judul}</h1>
      <p className="text-gray-600 mb-4">{artikel.ringkasan}</p>

      <div className="flex gap-4 text-sm text-gray-500 mb-6 border-b-2 border-black pb-4">
        <span>{artikel.penulis}</span>
        <span>{new Date(artikel.tanggal).toLocaleDateString("id-ID")}</span>
        <span>{artikel.waktuBaca} menit baca</span>
      </div>

      {artikel.konten.map((block) => (
        <ContentBlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
}
