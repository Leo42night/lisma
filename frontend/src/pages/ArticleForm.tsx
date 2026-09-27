import { useEffect, useState } from "react";
import type { ContentBlock } from "../types";
import { createArticle, updateArticle, getArticle } from "../api/articles";
import { useParams } from "react-router-dom";
import { RichTextEditor } from "../components/article/RichTextEditor";

function emptyBlock(type: ContentBlock["type"]): ContentBlock {
    const id = crypto.randomUUID();
    switch (type) {
        case "paragraf":
            return { id, type, teks: "" };
        case "subheading":
            return { id, type, teks: "" };
        case "gambar":
            return { id, type, url: "", caption: "" };
        case "kutipan":
            return { id, type, kutipan: "", kutipanSumber: "" };
        case "eventData":
            return { id, type, lokasi: "", waktu: "", pemateri: "" };
    }
}

export default function ArticleForm() {
    const { id } = useParams();
    const [judul, setJudul] = useState("");
    const [ringkasan, setRingkasan] = useState("");
    const [kategori, setKategori] = useState("");
    const [penulis, setPenulis] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [waktuBaca, setWaktuBaca] = useState(1);
    const [konten, setKonten] = useState<ContentBlock[]>([]);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(!!id);

    useEffect(() => {
        if (!id) return;
        getArticle(id)
            .then((a) => {
                setJudul(a.judul);
                setRingkasan(a.ringkasan);
                setKategori(a.kategori);
                setPenulis(a.penulis);
                setTanggal(a.tanggal.slice(0, 10));
                setWaktuBaca(a.waktuBaca);
                setKonten(a.konten);
            })
            .finally(() => setLoading(false));
    }, [id]);

    const addBlock = (type: ContentBlock["type"]) =>
        setKonten((k) => [...k, emptyBlock(type)]);

    const removeBlock = (blockId: string) =>
        setKonten((k) => k.filter((b) => b.id !== blockId));

    const updateBlock = (blockId: string, patch: Partial<ContentBlock>) =>
        setKonten((k) =>
            k.map((b) => (b.id === blockId ? ({ ...b, ...patch } as ContentBlock) : b)),
        );

    const moveBlock = (index: number, dir: -1 | 1) =>
        setKonten((k) => {
            const next = [...k];
            const target = index + dir;
            if (target < 0 || target >= next.length) return k;
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const data = { judul, ringkasan, kategori, penulis, tanggal, waktuBaca, konten };
        try {
            if (id) {
                await updateArticle(id, data);
            } else {
                await createArticle(data);
            }
            //   onDone();
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p className="p-6">Memuat...</p>;

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-4">
            <h1 className="text-3xl font-black mb-4">
                {id ? "Edit Artikel" : "Artikel Baru"}
            </h1>

            <input
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Judul"
                required
                className="w-full border-2 border-black rounded-lg p-2 font-bold"
            />
            <textarea
                value={ringkasan}
                onChange={(e) => setRingkasan(e.target.value)}
                placeholder="Ringkasan"
                required
                rows={2}
                className="w-full border-2 border-black rounded-lg p-2"
            />

            <div className="grid grid-cols-2 gap-4">
                <input
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    placeholder="Kategori"
                    required
                    className="border-2 border-black rounded-lg p-2"
                />
                <input
                    value={penulis}
                    onChange={(e) => setPenulis(e.target.value)}
                    placeholder="Penulis"
                    required
                    className="border-2 border-black rounded-lg p-2"
                />
                <input
                    type="date"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    required
                    className="border-2 border-black rounded-lg p-2"
                />
                <input
                    type="number"
                    min={1}
                    value={waktuBaca}
                    onChange={(e) => setWaktuBaca(Number(e.target.value))}
                    placeholder="Waktu baca (menit)"
                    required
                    className="border-2 border-black rounded-lg p-2"
                />
            </div>

            <div className="border-t-2 border-black pt-4">
                <h2 className="font-bold text-lg mb-3">Konten</h2>

                <div className="space-y-3">
                    {konten.map((block, index) => (
                        <div
                            key={block.id}
                            className="border-2 border-black rounded-lg p-3 bg-gray-50"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold uppercase bg-black text-white px-2 py-1 rounded">
                                    {block.type}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => moveBlock(index, -1)}
                                        className="font-bold"
                                        aria-label="Pindah ke atas"
                                    >
                                        ↑
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => moveBlock(index, 1)}
                                        className="font-bold"
                                        aria-label="Pindah ke bawah"
                                    >
                                        ↓
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => removeBlock(block.id)}
                                        className="font-bold text-red-600"
                                        aria-label="Hapus blok"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            {block.type === "paragraf" && (
                                <RichTextEditor
                                    value={block.teks}
                                    onChange={(html: string) => updateBlock(block.id, { teks: html })}
                                    placeholder="Tulis paragraf... (bisa tautan, list, dsb.)"
                                />
                            )}

                            {block.type === "subheading" && (
                                <input
                                    value={block.teks}
                                    onChange={(e) => updateBlock(block.id, { teks: e.target.value })}
                                    placeholder="Isi subheading"
                                    className="w-full border rounded p-2 font-bold"
                                />
                            )}

                            {block.type === "gambar" && (
                                <div className="space-y-2">
                                    <input
                                        value={block.url}
                                        onChange={(e) => updateBlock(block.id, { url: e.target.value })}
                                        placeholder="URL gambar"
                                        className="w-full border rounded p-2"
                                    />
                                    <input
                                        value={block.caption ?? ""}
                                        onChange={(e) =>
                                            updateBlock(block.id, { caption: e.target.value })
                                        }
                                        placeholder="Keterangan gambar (opsional)"
                                        className="w-full border rounded p-2"
                                    />
                                </div>
                            )}

                            {block.type === "kutipan" && (
                                <div className="space-y-2">
                                    <textarea
                                        value={block.kutipan}
                                        onChange={(e) =>
                                            updateBlock(block.id, { kutipan: e.target.value })
                                        }
                                        placeholder="Isi kutipan"
                                        rows={2}
                                        className="w-full border rounded p-2"
                                    />
                                    <input
                                        value={block.kutipanSumber}
                                        onChange={(e) =>
                                            updateBlock(block.id, { kutipanSumber: e.target.value })
                                        }
                                        placeholder="Sumber kutipan"
                                        className="w-full border rounded p-2"
                                    />
                                </div>
                            )}

                            {block.type === "eventData" && (
                                <div className="grid grid-cols-1 gap-2">
                                    <input
                                        value={block.lokasi}
                                        onChange={(e) =>
                                            updateBlock(block.id, { lokasi: e.target.value })
                                        }
                                        placeholder="Lokasi"
                                        className="w-full border rounded p-2"
                                    />
                                    <input
                                        value={block.waktu}
                                        onChange={(e) =>
                                            updateBlock(block.id, { waktu: e.target.value })
                                        }
                                        placeholder="Waktu"
                                        className="w-full border rounded p-2"
                                    />
                                    <input
                                        value={block.pemateri}
                                        onChange={(e) =>
                                            updateBlock(block.id, { pemateri: e.target.value })
                                        }
                                        placeholder="Pemateri"
                                        className="w-full border rounded p-2"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                    <button
                        type="button"
                        onClick={() => addBlock("paragraf")}
                        className="border-2 border-black rounded px-3 py-1 text-sm font-bold"
                    >
                        + Paragraf
                    </button>
                    <button
                        type="button"
                        onClick={() => addBlock("subheading")}
                        className="border-2 border-black rounded px-3 py-1 text-sm font-bold"
                    >
                        + Subheading
                    </button>
                    <button
                        type="button"
                        onClick={() => addBlock("gambar")}
                        className="border-2 border-black rounded px-3 py-1 text-sm font-bold"
                    >
                        + Gambar
                    </button>
                    <button
                        type="button"
                        onClick={() => addBlock("kutipan")}
                        className="border-2 border-black rounded px-3 py-1 text-sm font-bold"
                    >
                        + Kutipan
                    </button>
                    <button
                        type="button"
                        onClick={() => addBlock("eventData")}
                        className="border-2 border-black rounded px-3 py-1 text-sm font-bold"
                    >
                        + Data Acara
                    </button>
                </div>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-black text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50"
                >
                    {saving ? "Menyimpan..." : "Simpan"}
                </button>
                <button
                    type="button"
                    //   onClick={onDone}
                    className="border-2 border-black px-6 py-2 rounded-lg font-bold"
                >
                    Batal
                </button>
            </div>
        </form>
    );
}
