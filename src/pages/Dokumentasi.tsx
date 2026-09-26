import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  Play,
  Image as ImageIcon,
  X,
  Trophy,
  Sparkles,
  Eye,
  Search,
  ChevronRight,
  FolderOpen,
  Award,
  FileText,
} from 'lucide-react';
import type { BSFEdition, MediaItem, Category } from '../data/bsf.ts';
import { BSF_EDITIONS } from '../data/bsf.ts';

const CustomStyles: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

    :root {
      --background: #FFFFFF;
      --foreground: #0B2A66;
      --primary: #0264D9;
      --primary-foreground: #FFFFFF;
      --secondary: #0243CE;
      --secondary-foreground: #FFFFFF;
      --accent: #FBEE31;
      --accent-foreground: #0B2A66;
      --destructive: #E0142F;
      --destructive-foreground: #FFFFFF;
      --muted: #F1F5F9;
      --muted-foreground: #64748B;
      --border: #DCE6F2;
      --input: #DCE6F2;
      --ring: #0264D9;
      --card: #FFFFFF;
      --card-foreground: #0B2A66;
      --popover: #FFFFFF;
      --popover-foreground: #0B2A66;

      --lisma-navy: #0B2A66;
      --lisma-blue: #0264D9;
      --lisma-blue-dark: #0243CE;
      --lisma-yellow: #FBEE31;
      --lisma-red: #E0142F;
      --lisma-cyan: #4BC6FB;
    }

    .dark {
      --background: #071A3D;
      --foreground: #F8FAFC;
      --primary: #4BC6FB;
      --primary-foreground: #071A3D;
      --secondary: #0264D9;
      --secondary-foreground: #FFFFFF;
      --accent: #FBEE31;
      --accent-foreground: #071A3D;
      --destructive: #E0142F;
      --destructive-foreground: #FFFFFF;
      --muted: #102A55;
      --muted-foreground: #A8B6CC;
      --border: #1D4275;
      --input: #1D4275;
      --ring: #4BC6FB;
      --card: #0B2450;
      --card-foreground: #F8FAFC;
      --popover: #0B2450;
      --popover-foreground: #F8FAFC;
    }

    body, html {
      font-family: 'Montserrat', sans-serif;
    }

    /* Custom Scrollbar */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #0264D9;
      border-radius: 8px;
    }
  `}</style>
);

const HornbillLogoSvg = ({ code }: { code: string }) => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center p-3">
      {/* Decorative Outer Circle Badge */}
      <div className="relative w-36 h-36 rounded-full border-2 border-white/30 flex items-center justify-center p-2 bg-black/20 backdrop-blur-xs">
        <div className="w-full h-full rounded-full border border-dashed border-white/40 flex items-center justify-center">

          {/* Enggang Bird / Hornbill Vector Illustration */}
          <svg className="w-20 h-20 text-white drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Hornbill Beak & Head Motif */}
            <path d="M20 50 C25 25, 60 20, 85 28 C70 38, 55 42, 45 42 C35 42, 25 45, 20 50 Z" fill="currentColor" opacity="0.9" />
            <path d="M85 28 C75 35, 60 48, 48 50 C40 51, 30 52, 25 60 C35 58, 50 55, 70 42 Z" fill="#FBEE31" />
            <circle cx="42" cy="35" r="3" fill="#E0142F" />
            {/* Dayak Pattern Wing Swirls */}
            <path d="M30 65 C40 55, 65 60, 75 80 C60 78, 45 75, 30 65 Z" fill="currentColor" opacity="0.8" />
            <path d="M15 40 C10 30, 25 15, 45 18 C35 25, 25 32, 15 40 Z" fill="#4BC6FB" />
          </svg>
        </div>
      </div>

      {/* Main Brand Title Inside Emblem */}
      <div className="mt-4">
        <h2 className="text-xl font-black tracking-tight text-white drop-shadow-lg uppercase leading-none">
          BORNEO
        </h2>
        <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#FBEE31] uppercase block mt-0.5">
          SCIENTIFIC FAIR
        </span>
      </div>

      {/* Ribbon Banner */}
      <div className="mt-3 px-3 py-0.5 bg-white/20 backdrop-blur-md rounded border border-white/30 text-[9px] font-bold tracking-widest text-white uppercase">
        PREPARE YOUR TEAM !
      </div>
    </div>
  );
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEdition, setSelectedEdition] = useState<BSFEdition | null>(null);
  const [activeTab, setActiveTab] = useState<Category>('semua');
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);

  /* Search & Filter Logic */
  const filteredEditions = useMemo(() => {
    if (!searchQuery.trim()) return BSF_EDITIONS;
    const q = searchQuery.toLowerCase();
    return BSF_EDITIONS.filter(ed =>
      ed.title.toLowerCase().includes(q) ||
      ed.code.toLowerCase().includes(q) ||
      ed.year.includes(q) ||
      ed.theme.toLowerCase().includes(q) ||
      ed.items.some(item => item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  /* Filter items in selected edition drawer */
  const editionMediaItems = useMemo(() => {
    if (!selectedEdition) return [];
    if (activeTab === 'semua') return selectedEdition.items;
    return selectedEdition.items.filter(item => item.category === activeTab);
  }, [selectedEdition, activeTab]);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white text-[#0B2A66] dark:bg-[#071A3D] dark:text-[#F8FAFC]">
      <CustomStyles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-['Montserrat']">

        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0264D9] dark:text-[#4BC6FB] mb-1">
              <Sparkles className="w-4 h-4 text-lisma-yellow" />
              <span>Arsip Galeri Karya Tulis Ilmiah</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--foreground)]">
              Welcome to the Universe
            </h1>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1 font-medium">
              Dokumentasi Resmi Lomba Karya Tulis Ilmiah Borneo Scientific Fair (BSF) LISMA
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari BSF, tahun, karya..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[#0264D9] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--muted-foreground)] hover:text-[#E0142F]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        { }
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[var(--foreground)] flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-[#0264D9] dark:text-[#4BC6FB]" />
            <span>Koleksi Cover Dokumentasi BSF</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] font-semibold">
              {filteredEditions.length} Edisi
            </span>
          </h2>
          <span className="text-xs text-[var(--muted-foreground)] hidden sm:block">
            Klik red button edisi BSF untuk membuka galeri dokumentasi lengkap
          </span>
        </div>

        {/* Vertical Covers Grid (Matches exact design from prompt) */}
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin scrollbar-thumb-white/20">
          {filteredEditions.map((edition) => (
            <div
              key={edition.id}
              className="group relative min-w-[220px] h-[420px] rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between border border-white/10"
              style={{
                // backgroundImage: `url(${import.meta.env.VITE_R2_URL}/card-${edition.id}.png)`,
                backgroundImage: `url(${import.meta.env.VITE_R2_URL}/card-${edition.id}.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.5)`
              }}
            >
              {/* Decorative Card Borders/Corner Accents */}
              <div
                className="absolute inset-2 border rounded border-dashed pointer-events-none z-10 transition-colors"
                style={{ borderColor: `${edition.borderColor}77` }}
              />

              {/* Top Corner Batik Ornaments */}
              <div className="absolute top-2 left-2 z-10 text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-black/40 text-white/80 border border-white/10">
                {edition.year}
              </div>

              <div
                className="absolute top-2 right-2 w-5 h-5 rounded-bl-lg border-r border-t z-10"
                style={{ borderColor: edition.accentColor }}
              />

              {/* Bottom Bar: Title + Red Circle Arrow (Matches user reference image) */}
              <div className="mt-auto relative z-20 p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex items-center justify-between gap-2">
                <div className="truncate">
                  <h3 className="text-lg font-black text-white leading-none tracking-tight drop-shadow-md">
                    {edition.code}
                  </h3>
                  <p className="text-[10px] text-white/70 font-medium truncate mt-1">
                    {edition.items.length} Dokumen
                  </p>
                </div>

                {/* Red Circular Arrow Button */}
                <div
                  className="cursor-pointer shrink-0 w-8 h-8 rounded-full text-white flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-110"
                  style={{ backgroundColor: '#E0142F' }}
                  onClick={() => {
                    setSelectedEdition(edition);
                    setActiveTab('semua');
                  }}
                >
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State when no edition matches search */}
        {filteredEditions.length === 0 && (
          <div className="text-center py-16 bg-[var(--card)] rounded-2xl border border-[var(--border)] mt-4">
            <Trophy className="w-12 h-12 text-[var(--muted-foreground)] mx-auto mb-3" />
            <p className="text-lg font-bold text-[var(--foreground)]">Edisi BSF Tidak Ditemukan</p>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">
              Tidak ada hasil untuk pencarian "{searchQuery}". Coba kata kunci lain.
            </p>
          </div>
        )}

        { }
        {selectedEdition && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div
              className="relative w-full max-w-5xl h-[90vh] bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl overflow-hidden shadow-2xl border border-[var(--border)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`p-6 bg-gradient-to-r ${selectedEdition.bgGradient} text-white relative shrink-0 border-b border-white/10`}>
                <button
                  onClick={() => setSelectedEdition(null)}
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#E0142F] transition-colors"
                  aria-label="Tutup Galeri"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-black"
                    style={{ backgroundColor: selectedEdition.accentColor }}
                  >
                    {selectedEdition.code} ({selectedEdition.year})
                  </span>
                  <span className="text-xs text-white/80 font-semibold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#FBEE31]" /> Official LISMA Archive
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {selectedEdition.title}
                </h2>
                <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-2xl font-medium">
                  Tema: "{selectedEdition.theme}"
                </p>
              </div>

              {/* Filter Tabs Header */}
              <div className="px-6 py-3 border-b border-[var(--border)] bg-[var(--muted)]/50 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
                {[
                  { key: 'semua', label: 'Semua Media' },
                  { key: 'foto', label: 'Foto Lomba' },
                  { key: 'video', label: 'Video Presentasi' },
                  { key: 'awarding', label: 'Pengumuman Juara' },
                  { key: 'karya', label: 'Karya Tulis / Poster' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as Category)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeTab === tab.key
                      ? 'bg-[#0264D9] text-white shadow-sm'
                      : 'bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--border)]'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Modal Body Grid (Scrollable Media List) */}
              <div className="p-6 overflow-y-auto custom-scrollbar grow">
                {editionMediaItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {editionMediaItems.map((media) => (
                      <div
                        key={media.id}
                        onClick={() => setLightboxItem(media)}
                        className="group relative rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card)] shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col"
                      >
                        {/* Media Thumbnail Container */}
                        <div className="relative aspect-video bg-black overflow-hidden">
                          <img
                            src={media.thumbnailUrl}
                            alt={media.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

                          {/* Media Tag */}
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center gap-1">
                              {media.type === 'video' ? (
                                <>
                                  <Play className="w-3 h-3 text-[#FBEE31] fill-[#FBEE31]" />
                                  Video
                                </>
                              ) : (
                                <>
                                  <ImageIcon className="w-3 h-3 text-[#4BC6FB]" />
                                  Foto
                                </>
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Text Metadata */}
                        <div className="p-4 flex flex-col justify-between grow">
                          <div>
                            <span className="text-[10px] font-bold text-[#0264D9] dark:text-[#4BC6FB] uppercase tracking-wider">
                              {media.categoryLabel}
                            </span>
                            <h4 className="text-sm font-bold text-[var(--foreground)] line-clamp-2 mt-1 leading-snug">
                              {media.title}
                            </h4>
                            <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 mt-1">
                              {media.description}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--muted-foreground)] font-medium">
                            <span>{media.date}</span>
                            <span className="text-[#0264D9] dark:text-[#4BC6FB] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              Lihat Detail <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <FileText className="w-12 h-12 text-[var(--muted-foreground)] mx-auto mb-2" />
                    <p className="text-sm font-bold text-[var(--foreground)]">Tidak ada media untuk kategori ini</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Silakan pilih kategori media yang lain di atas.</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t border-[var(--border)] bg-[var(--card)] flex items-center justify-between shrink-0 text-xs font-semibold text-[var(--muted-foreground)]">
                <span>Total Media: {selectedEdition.items.length} Dokumentasi</span>
                <button
                  onClick={() => setSelectedEdition(null)}
                  className="px-4 py-2 rounded-lg bg-[var(--muted)] text-[var(--foreground)] hover:bg-[#E0142F] hover:text-white transition-colors"
                >
                  Tutup Galeri Edisi
                </button>
              </div>
            </div>
          </div>
        )}

        { }
        {lightboxItem && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
            <div
              className="relative w-full max-w-4xl bg-[var(--card)] rounded-2xl overflow-hidden shadow-2xl border border-[var(--border)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-[#E0142F] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={lightboxItem.url}
                  alt={lightboxItem.title}
                  className="w-full h-full object-contain"
                />
                {lightboxItem.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="w-16 h-16 rounded-full bg-[#0264D9] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                      <Play className="w-8 h-8 fill-white translate-x-0.5" />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] mb-2">
                  <span className="px-2 py-0.5 rounded bg-[#0264D9]/10 text-[#0264D9] dark:text-[#4BC6FB] font-bold">
                    {lightboxItem.categoryLabel}
                  </span>
                  <span>•</span>
                  <span>{lightboxItem.date}</span>
                  <span>•</span>
                  <span>Oleh {lightboxItem.author}</span>
                </div>

                <h3 className="text-xl font-extrabold text-[var(--foreground)] mb-2">
                  {lightboxItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {lightboxItem.description}
                </p>

                <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-semibold text-[var(--muted-foreground)]">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-[#0264D9]" /> {lightboxItem.likes} Pasang Mata
                    </span>
                  </div>

                  <button
                    onClick={() => setLightboxItem(null)}
                    className="px-4 py-2 rounded-lg bg-[#0264D9] text-white text-xs font-bold hover:bg-[#0243CE] transition-colors"
                  >
                    Selesai
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}