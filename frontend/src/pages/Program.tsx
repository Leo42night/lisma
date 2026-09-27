import { useState } from 'react';
import { ExternalLink, BookOpen, Download, Search, Tag } from 'lucide-react';

// Interface Data Publikasi
interface Publication {
    id: number;
    title: string;
    category: string;
    date: string;
    author: string;
    imageUrl: string;
    link: string;
    type: 'journal' | 'proceeding' | 'book';
}

// Data Dummy Publikasi UKM PP LISMA UNTAN
const publicationsData: Publication[] = [
    {
        id: 1,
        title: 'Pengembangan Biomaterial Berbasis Limbah Kelapa Sawit untuk Komposit Ramah Lingkungan',
        category: 'Jurnal Ilmiah',
        date: '15 Jan 2026',
        author: 'Tim Riset Energi & Material LISMA',
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
        link: '#',
        type: 'journal',
    },
    {
        id: 2,
        title: 'Implementasi Internet of Things (IoT) pada Sistem Deteksi Dini Kebakaran Lahan Gambut',
        category: 'Prosiding Seminar Nasional',
        date: '10 Des 2025',
        author: 'Divisi Penelitian & Teknologi',
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
        link: '#',
        type: 'proceeding',
    },
    {
        id: 3,
        title: 'Studi Etnobotani Tumbuhan Obat Tradisional oleh Masyarakat Lokal Kalimantan Barat',
        category: 'Jurnal Sinta 3',
        date: '28 Nov 2025',
        author: 'Tim Bionalar LISMA',
        imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
        link: '#',
        type: 'journal',
    },
    {
        id: 4,
        title: 'Modul Panduan Metodologi Penelitian Ilmiah Mahasiswa Tingkat Dasar',
        category: 'Buku Ajar / Modul',
        date: '05 Okt 2025',
        author: 'Bidang Penalaran LISMA UNTAN',
        imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
        link: '#',
        type: 'book',
    },
    {
        id: 5,
        title: 'Strategi Pengolahan Air Bersih Berbasis Membran Filtrasi Sederhana di Daerah Pesisir',
        category: 'Prosiding Internasional',
        date: '20 Agus 2025',
        author: 'Siti Rahma & Tim LISMA',
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
        link: '#',
        type: 'proceeding',
    },
    {
        id: 6,
        title: 'Analisis Komposisi Kimia dan Potensi Ekstrak Daun Pasak Bumi Terhadap Bakteri Pathogen',
        category: 'Jurnal Nasional',
        date: '12 Jun 2025',
        author: 'Rifky & Tim Farmasi LISMA',
        imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
        link: '#',
        type: 'journal',
    },
];

export default function Publikasi() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Filter Publikasi Berdasarkan Kategori dan Pencarian
    const filteredPublications = publicationsData.filter((item) => {
        const matchesCategory =
            selectedCategory === 'All' || item.type === selectedCategory;
        const matchesSearch =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lisma-blue/10 text-lisma-blue dark:bg-lisma-cyan/10 dark:text-lisma-cyan text-xs font-semibold uppercase tracking-wider mb-4">
                        <BookOpen size={16} /> Publikasi & Karya Ilmiah
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Publikasi Penelitian LISMA UNTAN
                    </h1>
                    <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                        Daftar karya ilmiah, jurnal, prosiding seminar, dan jurnalistik karya anggota UKM PP Lisma Universitas Tanjungpura.
                    </p>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">

                    {/* Category Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
                        {[
                            { label: 'Semua', value: 'All' },
                            { label: 'Jurnal', value: 'journal' },
                            { label: 'Prosiding', value: 'proceeding' },
                            { label: 'Buku / Modul', value: 'book' },
                        ].map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setSelectedCategory(tab.value)}
                                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all duration-200 ${selectedCategory === tab.value
                                    ? 'bg-lisma-navy text-white shadow-md shadow-lisma-navy/20 dark:bg-lisma-cyan dark:text-slate-950'
                                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Cari judul / penulis..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-lisma-blue dark:focus:ring-lisma-cyan transition-all"
                        />
                    </div>
                </div>

                {/* Publication Grid */}
                {filteredPublications.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPublications.map((item) => (
                            <div
                                key={item.id}
                                className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                    {/* Category Badge */}
                                    <span className="absolute top-4 left-4 px-3 py-1 text-[11px] font-semibold text-white bg-slate-950/70 backdrop-blur-md rounded-full border border-white/20">
                                        {item.category}
                                    </span>
                                </div>

                                {/* Card Body */}
                                <div className="p-6 flex flex-col flex-1 justify-between">
                                    <div>
                                        {/* Meta info */}
                                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                                            <span>{item.date}</span>
                                            <span>•</span>
                                            <span className="truncate font-medium text-lisma-blue dark:text-lisma-cyan">
                                                {item.author}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-lisma-blue dark:group-hover:text-lisma-cyan transition-colors leading-snug line-clamp-3">
                                            {item.title}
                                        </h2>
                                    </div>

                                    {/* Link Button Footer */}
                                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-between w-full px-4 py-2.5 text-xs sm:text-sm font-semibold text-lisma-navy dark:text-white bg-slate-100 hover:bg-lisma-navy hover:text-white dark:bg-slate-800 dark:hover:bg-lisma-cyan dark:hover:text-slate-950 rounded-xl transition-all duration-200 group/btn"
                                        >
                                            <span className="flex items-center gap-2">
                                                <Download size={16} /> Baca Publikasi
                                            </span>
                                            <ExternalLink
                                                size={16}
                                                className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
                        <Tag className="mx-auto text-slate-400 mb-3" size={36} />
                        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">Tidak ada publikasi ditemukan</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau filter Anda.</p>
                    </div>
                )}

            </div>
        </div>
    );
}