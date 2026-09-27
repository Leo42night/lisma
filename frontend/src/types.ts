// Setiap blok konten artikel adalah salah satu tipe berikut.
// "id" dipakai sebagai React key & untuk operasi edit/hapus/reorder.

export type ContentBlock =
    | { id: string; type: "paragraf"; teks: string }
    | { id: string; type: "subheading"; teks: string }
    | { id: string; type: "gambar"; url: string; caption?: string }
    | { id: string; type: "kutipan"; kutipan: string; kutipanSumber: string }
    | {
        id: string;
        type: "eventData";
        lokasi: string;
        waktu: string;
        pemateri: string;
    };

export interface Artikel {
    id: string;
    judul: string;
    ringkasan: string;
    kategori: string;
    penulis: string;
    tanggal: string; // ISO date string
    waktuBaca: number; // menit
    konten: ContentBlock[];
    createdAt?: string;
    updatedAt?: string;
}

export type ArtikelInput = Omit<Artikel, "id" | "createdAt" | "updatedAt">;
