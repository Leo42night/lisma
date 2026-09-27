import type { ReactElement } from "react";

/**
 * Halaman detail berita — UKM Penalaran dan Penelitian
 * Pakai data dummy dulu
 * Nanti akan pakai akses data dari DB, fitur CRUD sedang dibuat.
 */
interface Artikel {
    kategori: string;
    judul: string;
    ringkasan: string;
    penulis: string;
    tanggal: string;
    waktuBaca: string;
    lokasi?: string;
    jadwal?: string;
    pembicara?: string;
    paragraf: string[];
    kutipan: string;
    kutipanSumber: string;
}
const artikel: Artikel = {
    kategori: "Kegiatan Organisasi",
    judul: "Workshop Penelitian Mahasiswa: Merancang Riset yang Berdampak",
    ringkasan:
        "LISMA UNTAN mengajak mahasiswa dari berbagai program studi untuk menyusun proposal penelitian yang lebih terarah, mulai dari perumusan masalah hingga strategi publikasi.",
    penulis: "Divisi Kaderisasi & Riset LISMA",
    tanggal: "18 September 2026",
    waktuBaca: "6 menit baca",
    lokasi: "Aula Fakultas MIPA, Universitas Tanjungpura",
    jadwal: "Sabtu, 26 September 2026 · 08.00 – 15.00 WIB",
    pembicara: "Dr. Yulianto Pratama, S.Si., M.Sc. — Peneliti Bidang Metodologi Riset",
    paragraf: [
        "Sebagai bagian dari agenda tahunan Unit Kegiatan Mahasiswa Penalaran dan Penelitian, Lingkar Ilmiah Studi Mahasiswa (LISMA) Universitas Tanjungpura kembali menyelenggarakan Workshop Penelitian Mahasiswa. Kegiatan ini dirancang untuk menjembatani jarak antara ide penelitian yang masih mentah dan proposal yang siap diajukan ke ajang kompetisi ilmiah maupun hibah penelitian internal kampus.",
        "Peserta diajak menyusun kerangka penelitian secara bertahap: mulai dari mengidentifikasi masalah yang relevan dengan isu lokal Kalimantan Barat, merumuskan pertanyaan penelitian yang terukur, hingga memilih metode yang sesuai dengan sumber daya yang tersedia. Pendekatan ini sengaja dipilih karena banyak mahasiswa baru terhenti di tahap ide dan kesulitan menerjemahkannya menjadi rancangan yang bisa dieksekusi.",
        "Selain sesi materi, workshop ini menyediakan waktu klinik proposal, di mana peserta dapat membawa naskah yang sedang dikerjakan untuk ditinjau langsung oleh tim mentor. Format ini dipilih berdasarkan evaluasi kegiatan serupa tahun lalu, yang menunjukkan bahwa pendampingan langsung jauh lebih efektif dibanding penyampaian teori satu arah.",
        "LISMA berharap kegiatan ini menjadi titik awal bagi lebih banyak mahasiswa Untan untuk berani menulis dan mengirimkan karya ilmiahnya, baik ke Pekan Ilmiah Mahasiswa Nasional (PIMNAS) maupun jurnal-jurnal ilmiah tingkat universitas.",
    ],
    kutipan:
        "Penelitian yang baik tidak dimulai dari jawaban yang sempurna, tetapi dari pertanyaan yang berani ditanyakan dengan jujur.",
    kutipanSumber: "Dr. Yulianto Pratama, dalam sesi pembuka workshop",
};

const beritaTerkait = [
    {
        judul: "LISMA Buka Pendaftaran Kelompok Studi Riset Semester Ganjil",
        tanggal: "10 September 2026",
    },
    {
        judul: "Delegasi Untan Raih Juara II Lomba Karya Tulis Ilmiah Regional",
        tanggal: "2 September 2026",
    },
    {
        judul: "Kaderisasi Anggota Baru LISMA 2026: Membentuk Nalar Kritis Mahasiswa",
        tanggal: "25 Agustus 2026",
    },
];

function HeroGrafis(): ReactElement {
    return (
        <svg viewBox="0 0 800 420" className="h-full w-full" aria-hidden="true">
            <rect width="800" height="420" className="fill-secondary" />
            <circle cx="650" cy="80" r="180" className="fill-primary" opacity="0.35" />
            <circle cx="90" cy="360" r="140" className="fill-accent" opacity="0.5" />
            <g className="stroke-lisma-white" strokeWidth="2" opacity="0.5">
                <line x1="120" y1="120" x2="300" y2="90" />
                <line x1="300" y1="90" x2="470" y2="180" />
                <line x1="470" y1="180" x2="620" y2="130" />
                <line x1="300" y1="90" x2="330" y2="260" />
                <line x1="470" y1="180" x2="520" y2="330" />
            </g>
            {[
                [120, 120],
                [300, 90],
                [470, 180],
                [620, 130],
                [330, 260],
                [520, 330],
            ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r={i === 2 ? 10 : 6} className="fill-lisma-yellow" />
            ))}
            <text
                x="60"
                y="380"
                className="fill-lisma-white"
                style={{ font: "600 22px Montserrat, sans-serif", letterSpacing: "-0.02em" }}
            >
                Workshop Penelitian Mahasiswa
            </text>
        </svg>
    );
}

export default function BeritaDetail(): ReactElement {
    return (
        <div className="min-h-screen bg-background text-foreground">

            <main className="mx-auto max-w-3xl px-6 py-10">
                {/* Breadcrumb */}
                <p className="text-xs text-muted-foreground">
                    Berita <span className="mx-1.5">/</span>
                    <span className="text-foreground">{artikel.kategori}</span>
                </p>

                {/* Kepala artikel */}
                <div className="mt-4">
                    <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                        {artikel.kategori}
                    </span>
                    <h1 className="mt-4 text-3xl font-bold leading-tight tracking-lisma text-foreground sm:text-4xl">
                        {artikel.judul}
                    </h1>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                        {artikel.ringkasan}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-border py-3 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">{artikel.penulis}</span>
                        <span aria-hidden="true">·</span>
                        <span>{artikel.tanggal}</span>
                        <span aria-hidden="true">·</span>
                        <span>{artikel.waktuBaca}</span>
                    </div>
                </div>

                {/* Hero */}
                <div className="mt-6 overflow-hidden rounded-xl">
                    <div className="aspect-[16/9] w-full">
                        <HeroGrafis />
                    </div>
                </div>

                {/* Kotak info kegiatan */}
                <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-border bg-card p-5 text-sm sm:grid-cols-3">
                    <div>
                        <p className="text-xs uppercase text-muted-foreground">Jadwal</p>
                        <p className="mt-1 font-medium text-card-foreground">{artikel.jadwal}</p>
                    </div>
                    <div>
                        <p className="text-xs uppercase text-muted-foreground">Lokasi</p>
                        <p className="mt-1 font-medium text-card-foreground">{artikel.lokasi}</p>
                    </div>
                    <div>
                        <p className="text-xs uppercase text-muted-foreground">Pemateri</p>
                        <p className="mt-1 font-medium text-card-foreground">{artikel.pembicara}</p>
                    </div>
                </div>

                {/* Isi artikel */}
                <article className="mt-8 max-w-[68ch] space-y-5 text-[15px] leading-relaxed text-foreground">
                    {artikel.paragraf.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </article>

                {/* Kutipan */}
                <blockquote className="my-8 border-l-4 border-primary bg-muted px-5 py-4">
                    <p className="text-lg font-medium leading-snug text-foreground">
                        “{artikel.kutipan}”
                    </p>
                    <cite className="mt-2 block text-sm not-italic text-muted-foreground">
                        — {artikel.kutipanSumber}
                    </cite>
                </blockquote>

                {/* Bagikan */}
                <div className="flex items-center justify-between border-t border-border pt-5">
                    <p className="text-sm text-muted-foreground">Bagikan artikel ini</p>
                    <div className="flex gap-2">
                        {["WA", "X", "IG"].map((label) => (
                            <button
                                key={label}
                                type="button"
                                className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Berita terkait */}
                <section className="mt-10">
                    <h2 className="text-lg font-bold text-foreground">Berita lainnya</h2>
                    <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
                        {beritaTerkait.map((b, i) => (
                            <div key={i} className="flex items-center justify-between gap-4 p-4">
                                <p className="text-sm font-medium text-card-foreground">{b.judul}</p>
                                <span className="whitespace-nowrap text-xs text-muted-foreground">
                                    {b.tanggal}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="border-t border-border py-8">
                <p className="mx-auto max-w-3xl px-6 text-xs text-muted-foreground">
                    © 2026 UKM Penalaran dan Penelitian — Lingkar Ilmiah Studi Mahasiswa,
                    Universitas Tanjungpura.
                </p>
            </footer>
        </div>
    );
}