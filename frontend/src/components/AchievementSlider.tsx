import React, { useState, useEffect } from 'react';
import { FlaskConical, Award, ChevronLeft, ChevronRight, Sparkles, BookOpen } from 'lucide-react';

interface AchievementItem {
    id: number;
    type: 'research' | 'competition';
    category: string;
    title: string;
    subtitle: string;
    author: string;
    badge: string;
    imageUrl: string; // Properti gambar ditambah
    icon: React.ReactNode;
}

const achievementsData: AchievementItem[] = [
    {
        id: 1,
        type: 'competition',
        category: 'PIMNAS 2025',
        title: 'Juara 1 Lomba Karya Tulis Ilmiah Nasional',
        subtitle: 'Pengembangan Biomaterial Berbasis Limbah Kelapa Sawit',
        author: 'Tim Riset Energi LISMA',
        badge: '🏆 Medali Emas',
        // Gambar dokumentasi lomba/penelitian
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
        icon: <Award className="text-lisma-yellow" size={28} />,
    },
    {
        id: 2,
        type: 'research',
        category: 'Penelitian Terapan',
        title: 'Sistem Deteksi Dini Gambut Berbasis IoT',
        subtitle: 'Mitigasi Kebakaran Lahan di Kalimantan Barat',
        author: 'Divisi Penelitian & Teknologi',
        badge: '📚 Published',
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
        icon: <FlaskConical className="text-lisma-yellow" size={28} />,
    },
    {
        id: 3,
        type: 'competition',
        category: 'World Invention Competition',
        title: 'Gold Medalist - Innovation in Agriculture',
        subtitle: 'Inovasi Pupuk Organik Cair Hasil Fermentasi Lokal',
        author: 'Siti Rahma & Tim',
        badge: '🌐 International Award',
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
        icon: <Sparkles className="text-lisma-yellow" size={28} />,
    },
    {
        id: 4,
        type: 'research',
        category: 'Publikasi Ilmiah',
        title: 'Studi Etnobotani Tumbuhan Obat Suku Dayak',
        subtitle: 'Terpublikasi di Jurnal Sinta 2 Bidang Farmasi',
        author: 'Tim Bionalar LISMA',
        badge: '📚 Published',
        imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
        icon: <BookOpen className="text-lisma-yellow" size={28} />,
    },
];

export function AchievementSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % achievementsData.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + achievementsData.length) % achievementsData.length);
    };

    const activeItem = achievementsData[currentIndex];

    return (
        <div className="relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-4xl bg-lisma-navy shadow-2xl transition-all duration-500">

                {/* Foto Background dengan Zoom-In Transition */}
                <img
                    key={activeItem.id}
                    src={activeItem.imageUrl}
                    alt={activeItem.title}
                    className="absolute inset-0 h-full w-full object-cover animate-fade-in transition-transform duration-700 ease-out scale-105"
                />

                {/* Overlay Dark Gradient (Melindungi Keterbacaan Teks) */}
                <div className="absolute inset-0 bg-linear-to-t from-[#06142f] via-[#06142f]/70 to-black/30" />

                {/* Top Floating Badge & Icon */}
                <div className="absolute left-6 top-6 right-6 flex items-center justify-between z-10">
                    <div className="rounded-2xl border border-white/20 bg-white/10 p-3.5 backdrop-blur-md shadow-lg">
                        {activeItem.icon}
                    </div>

                    <span className="px-3 py-1.5 text-xs font-semibold tracking-wide text-white bg-white/20 border border-white/30 rounded-full backdrop-blur-md shadow-md">
                        {activeItem.badge}
                    </span>
                </div>

                {/* Floating Decorative Ring */}
                <div className="absolute -right-10 top-1/3 h-40 w-40 rounded-full border-25 border-lisma-yellow/80 pointer-events-none z-10" />

                {/* Main Content Area */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col justify-end">
                    {/* Sub Header / Category */}
                    <div className="text-xs font-bold uppercase tracking-lisma-wide text-lisma-cyan flex items-center gap-2 drop-shadow-sm">
                        <span>LISMA UNTAN</span>
                        <span>•</span>
                        <span className="text-white/90">{activeItem.category}</span>
                    </div>

                    {/* Dynamic Title */}
                    <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight tracking-lisma-tight text-white drop-shadow-md">
                        {activeItem.title}
                    </h3>

                    {/* Dynamic Subtitle & Author */}
                    <p className="mt-2 text-xs sm:text-sm text-gray-200 line-clamp-2 leading-relaxed drop-shadow-sm">
                        {activeItem.subtitle}
                    </p>

                    <p className="mt-3 text-[11px] font-semibold text-lisma-yellow flex items-center gap-1">
                        👤 {activeItem.author}
                    </p>

                    {/* Bottom Toolbar: Indicators & Navigation */}
                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/20">
                        {/* Slide Indicators */}
                        <div className="flex gap-1.5">
                            {achievementsData.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                                        ? 'w-6 bg-lisma-yellow'
                                        : 'w-2 bg-white/40 hover:bg-white/70'
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrev}
                                className="p-2 text-white bg-black/30 hover:bg-black/50 active:scale-95 rounded-xl backdrop-blur-md transition-all border border-white/20"
                                aria-label="Previous Slide"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            <button
                                onClick={handleNext}
                                className="p-2 text-white bg-black/30 hover:bg-black/50 active:scale-95 rounded-xl backdrop-blur-md transition-all border border-white/20"
                                aria-label="Next Slide"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}