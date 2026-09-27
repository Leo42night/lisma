import {
    ArrowRight,
    BookOpen,
    FlaskConical,
    Lightbulb,
} from "lucide-react";
import { AchievementSlider } from '../components/AchievementSlider';

function App() {
    return (
        <main>
            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="absolute -right-40 -top-40 h-125 w-125 rounded-full bg-lisma-cyan/15 blur-3xl" />
                <div className="absolute -left-40 bottom-0 h-100 w-100 rounded-full bg-lisma-blue/10 blur-3xl" />

                <div className="relative mx-auto grid min-h-170 max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
                    <div>
                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-lisma-blue/20 bg-lisma-blue/5 px-4 py-2">
                            <span className="h-2 w-2 rounded-full bg-lisma-yellow" />
                            <span className="text-xs font-bold uppercase tracking-lisma-wide text-lisma-blue">
                                UKM Penalaran & Penelitian
                            </span>
                        </div>

                        <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-lisma-tight text-lisma-navy sm:text-6xl lg:text-7xl dark:text-white">
                            Membangun
                            <br />
                            <span className="text-lisma-blue">
                                Generasi Peneliti
                            </span>
                        </h1>

                        <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                            Lingkar Ilmiah Studi Mahasiswa (LISMA) adalah wadah mahasiswa Universitas Tanjungpura untuk mengembangkan
                            kemampuan berpikir kritis, penelitian, dan inovasi.
                        </p>

                        <div className="mt-9 flex flex-wrap gap-3">
                            <a
                                href="#gabung"
                                className="group flex items-center gap-3 rounded-full bg-lisma-blue px-6 py-3.5 text-sm font-bold text-white transition hover:bg-lisma-blue-dark"
                            >
                                Kenali LISMA
                                <ArrowRight
                                    size={17}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </a>

                            <a
                                href="#program"
                                className="rounded-full border border-border bg-background px-6 py-3.5 text-sm font-bold transition hover:bg-muted"
                            >
                                Lihat Program
                            </a>
                        </div>

                        <div className="mt-12 flex items-center gap-8">
                            <div>
                                <div className="text-3xl font-extrabold tracking-lisma-tight text-lisma-navy dark:text-white">
                                    10+
                                </div>
                                <div className="mt-1 text-xs font-medium text-muted-foreground">
                                    Tahun Berkarya
                                </div>
                            </div>

                            <div className="h-10 w-px bg-border" />

                            <div>
                                <div className="text-3xl font-extrabold tracking-lisma-tight text-lisma-navy dark:text-white">
                                    100+
                                </div>
                                <div className="mt-1 text-xs font-medium text-muted-foreground">
                                    Anggota
                                </div>
                            </div>

                            <div className="h-10 w-px bg-border" />

                            <div>
                                <div className="text-3xl font-extrabold tracking-lisma-tight text-lisma-navy dark:text-white">
                                    50+
                                </div>
                                <div className="mt-1 text-xs font-medium text-muted-foreground">
                                    Karya Penelitian
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* HERO VISUAL */}
                    <AchievementSlider />
                </div>
            </section>

            {/* ABOUT */}
            <section id="about" className="bg-muted/40 py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-lisma-wide text-lisma-blue">
                                Tentang Kami
                            </span>

                            <h2 className="mt-4 max-w-xl text-4xl font-extrabold leading-tight tracking-lisma-tight text-lisma-navy sm:text-5xl dark:text-white">
                                Tempat ide tumbuh menjadi karya.
                            </h2>
                        </div>

                        <div>
                            <p className="text-lg leading-8 text-muted-foreground">
                                LISMA UNTAN merupakan wadah mahasiswa yang berfokus pada
                                pengembangan penalaran, penelitian, dan kemampuan akademik.
                                Kami mendorong mahasiswa untuk tidak hanya menemukan
                                masalah, tetapi juga menciptakan solusi berbasis pengetahuan.
                            </p>

                            <a
                                href="#"
                                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-lisma-blue"
                            >
                                Selengkapnya
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROGRAM */}
            <section id="program" className="py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-lisma-wide text-lisma-blue">
                                Program Kami
                            </span>

                            <h2 className="mt-3 text-4xl font-extrabold tracking-lisma-tight text-lisma-navy sm:text-5xl dark:text-white">
                                Berkarya bersama.
                            </h2>
                        </div>

                        <a
                            href="#"
                            className="flex items-center gap-2 text-sm font-bold text-lisma-blue"
                        >
                            Semua program
                            <ArrowRight size={16} />
                        </a>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        <ProgramCard
                            icon={<FlaskConical />}
                            number="01"
                            title="Penelitian"
                            description="Mengembangkan kemampuan penelitian dan menghasilkan karya ilmiah."
                        />

                        <ProgramCard
                            icon={<Lightbulb />}
                            number="02"
                            title="Pengembangan"
                            description="Meningkatkan kemampuan berpikir kritis dan pemecahan masalah."
                        />

                        <ProgramCard
                            icon={<BookOpen />}
                            number="03"
                            title="Literasi"
                            description="Membangun budaya membaca, berdiskusi, dan berbagi pengetahuan."
                        />
                    </div>
                </div>
            </section>

            {/* NEWS */}
            <section id="berita" className="bg-lisma-navy py-24 text-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-lisma-wide text-lisma-cyan">
                                Berita & Kegiatan
                            </span>

                            <h2 className="mt-3 text-4xl font-extrabold tracking-lisma-tight sm:text-5xl">
                                Cerita terbaru.
                            </h2>
                        </div>

                        <a
                            href="#"
                            className="hidden items-center gap-2 text-sm font-bold text-lisma-cyan sm:flex"
                        >
                            Lihat semua
                            <ArrowRight size={16} />
                        </a>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        <NewsCard
                            category="Kegiatan"
                            title="Workshop Penelitian Mahasiswa"
                        />

                        <NewsCard
                            category="Prestasi"
                            title="LISMA UNTAN Raih Prestasi Nasional"
                        />

                        <NewsCard
                            category="Artikel"
                            title="Membangun Budaya Riset di Kampus"
                        />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section id="gabung" className="px-6 py-24 lg:px-8">
                <div className="mx-auto max-w-7xl overflow-hidden rounded-4xl bg-lisma-blue px-8 py-16 text-center text-white sm:px-16">
                    <div className="mx-auto max-w-2xl">
                        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-lisma-yellow text-lisma-navy">
                            <Lightbulb size={26} />
                        </div>

                        <h2 className="text-4xl font-extrabold leading-tight tracking-lisma-tight sm:text-5xl">
                            Punya ide?
                            <br />
                            Mari wujudkan bersama.
                        </h2>

                        <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-white/80">
                            Bergabung dan kembangkan kemampuanmu bersama komunitas
                            mahasiswa yang memiliki semangat untuk belajar dan berkarya.
                        </p>

                        <button className="mt-8 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-lisma-blue transition hover:bg-lisma-yellow hover:text-lisma-navy">
                            Bergabung dengan LISMA
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}


/* =========================================================
   COMPONENTS
   ========================================================= */

function ProgramCard({
    icon,
    number,
    title,
    description,
}: {
    icon: React.ReactNode;
    number: string;
    title: string;
    description: string;
}) {
    return (
        <article className="group rounded-3xl border border-border bg-card p-7 transition duration-300 hover:-translate-y-1 hover:border-lisma-blue/40 hover:shadow-xl">
            <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lisma-blue/10 text-lisma-blue">
                    {icon}
                </div>

                <span className="text-xs font-bold text-muted-foreground">
                    {number}
                </span>
            </div>

            <h3 className="mt-8 text-2xl font-extrabold tracking-lisma-tight text-lisma-navy dark:text-white">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {description}
            </p>

            <ArrowRight
                size={18}
                className="mt-7 text-lisma-blue transition-transform group-hover:translate-x-1"
            />
        </article>
    );
}


function NewsCard({
    category,
    title,
}: {
    category: string;
    title: string;
}) {
    return (
        <article className="group overflow-hidden rounded-3xl bg-white/5">
            <div className="aspect-16/10 bg-linear-to-br from-lisma-blue/80 to-lisma-cyan/30 transition duration-500 group-hover:scale-105" />

            <div className="p-6">
                <div className="text-[10px] font-bold uppercase tracking-lisma-wide text-lisma-yellow">
                    {category}
                </div>

                <h3 className="mt-3 text-xl font-bold leading-tight tracking-lisma-tight">
                    {title}
                </h3>

                <a
                    href="#"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-lisma-cyan"
                >
                    Baca selengkapnya
                    <ArrowRight size={15} />
                </a>
            </div>
        </article>
    );
}

export default App;