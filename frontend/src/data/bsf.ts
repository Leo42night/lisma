export type Category = 'semua' | 'foto' | 'video' | 'awarding' | 'karya';

export interface MediaItem {
    id: string;
    title: string;
    category: Category;
    categoryLabel: string;
    type: 'image' | 'video';
    url: string;
    thumbnailUrl: string;
    date: string;
    author: string;
    description: string;
    likes: number;
}

export interface BSFEdition {
    id: string;
    code: string; // e.g. "BSF", "BSF 2", "BSF 3"
    title: string;
    year: string;
    theme: string;
    bgGradient: string;
    borderColor: string;
    accentColor: string;
    badgeBg: string;
    motifType: 'ethnic-gold' | 'amber-pattern' | 'maroon-dayak' | 'emerald-[#0243CE]' | 'navy-royal' | 'dark-tech' | 'cyan-[#0264D9]';
    mediaCount: {
        foto: number;
        video: number;
        awarding: number;
        karya: number;
    };
    items: MediaItem[];
}

export const BSF_EDITIONS: BSFEdition[] = [
    {
        id: 'bsf-1',
        code: 'BSF',
        title: 'Borneo Scientific Fair 1',
        year: '2020',
        theme: 'Inovasi Sains Kebangsaan untuk Pembangunan Kalimantan',
        bgGradient: 'from-[#2A1713] via-[#1A0E0B] to-[#0D0705]',
        borderColor: '#C59B27',
        accentColor: '#FBEE31',
        badgeBg: '#C59B27',
        motifType: 'ethnic-gold',
        mediaCount: { foto: 12, video: 3, awarding: 5, karya: 8 },
        items: [
            {
                id: 'b1-1',
                title: 'Pembukaan Perdana BSF & Welcoming Ceremony',
                category: 'foto',
                categoryLabel: 'Foto Lomba',
                type: 'image',
                url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200',
                thumbnailUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
                date: '12 Okt 2020',
                author: 'Panitia LISMA BSF 1',
                description: 'Momen bersejarah pembukaan Borneo Scientific Fair edisi perdana yang dihadiri oleh ratusan delegasi nasional.',
                likes: 184
            },
            {
                id: 'b1-2',
                title: 'Presentasi Karya Ilmiah Terbaik BSF 1',
                category: 'karya',
                categoryLabel: 'Karya Tulis',
                type: 'image',
                url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
                thumbnailUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
                date: '13 Okt 2020',
                author: 'Tim Juri LKTI BSF 1',
                description: 'Sesi tanya jawab kritis antara dewan juri pakar dengan para finalis karya tulis bidang Lingkungan & Energi.',
                likes: 210
            },
            {
                id: 'b1-3',
                title: 'Highlight Malam Penganugerahan BSF 1',
                category: 'video',
                categoryLabel: 'Video Presentasi',
                type: 'video',
                url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
                thumbnailUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
                date: '14 Okt 2020',
                author: 'Multimedia LISMA',
                description: 'Video rekapan pengumuman pemenang piala bergilir Borneo Scientific Fair 1.',
                likes: 312
            }
        ]
    },
    {
        id: 'bsf-2',
        code: 'BSF 2',
        title: 'Borneo Scientific Fair 2',
        year: '2021',
        theme: 'Optimisme Riset Pemuda dalam Era Digitalisasi Borneo',
        bgGradient: 'from-[#5C3D06] via-[#3B2602] to-[#1F1300]',
        borderColor: '#E6A119',
        accentColor: '#FBEE31',
        badgeBg: '#E6A119',
        motifType: 'amber-pattern',
        mediaCount: { foto: 18, video: 5, awarding: 6, karya: 10 },
        items: [
            {
                id: 'b2-1',
                title: 'Expo & Pameran Poster Ilmiah BSF 2',
                category: 'awarding',
                categoryLabel: 'Dokumentasi Awarding',
                type: 'image',
                url: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=1200',
                thumbnailUrl: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=800',
                date: '18 Nov 2021',
                author: 'Divisi Acara LISMA',
                description: 'Gelaran stan pameran prototipe riset dan poster inovasi mahasiswa se-Indonesia.',
                likes: 156
            },
            {
                id: 'b2-2',
                title: 'Pemenang Juara 1 LKTI BSF 2',
                category: 'awarding',
                categoryLabel: 'Pengumuman Juara',
                type: 'image',
                url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=1200',
                thumbnailUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800',
                date: '19 Nov 2021',
                author: 'Panitia LISMA BSF 2',
                description: 'Penyerahan medali emas dan trophy penghargaan utama oleh Ketua Umum LISMA.',
                likes: 420
            }
        ]
    },
    {
        id: 'bsf-3',
        code: 'BSF 3',
        title: 'Borneo Scientific Fair 3',
        year: '2022',
        theme: 'Sinergi Eko-Inovasi Kebudayaan dan Teknologi Masa Depan',
        bgGradient: 'from-[#4A0E17] via-[#30080E] to-[#1A0306]',
        borderColor: '#E0142F',
        accentColor: '#4BC6FB',
        badgeBg: '#E0142F',
        motifType: 'maroon-dayak',
        mediaCount: { foto: 22, video: 8, awarding: 7, karya: 14 },
        items: [
            {
                id: 'b3-1',
                title: 'Field Trip & Cultural Tour Peserta BSF 3',
                category: 'foto',
                categoryLabel: 'Foto Lomba',
                type: 'image',
                url: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200',
                thumbnailUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=800',
                date: '05 Okt 2022',
                author: 'Humas BSF 3',
                description: 'Kunjungan budaya dan konservasi lingkungan bersama para peserta finalis BSF 3 di Kalimantan West.',
                likes: 275
            },
            {
                id: 'b3-2',
                title: 'Video Teaser Resmi BSF 3 LISMA',
                category: 'video',
                categoryLabel: 'Video Presentasi',
                type: 'video',
                url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200',
                thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
                date: '01 Okt 2022',
                author: 'Tim Creative LISMA',
                description: 'Sinematik teaser resmi perjalanan Borneo Scientific Fair edisi ke-3.',
                likes: 512
            }
        ]
    },
    {
        id: 'bsf-4',
        code: 'BSF 4',
        title: 'Borneo Scientific Fair 4',
        year: '2023',
        theme: 'Green Horizon: Akselerasi Sustainable Development Goals',
        bgGradient: 'from-[#123E34] via-[#0B2A23] to-[#041511]',
        borderColor: '#10B981',
        accentColor: '#FBEE31',
        badgeBg: '#059669',
        motifType: 'emerald-[#0243CE]',
        mediaCount: { foto: 25, video: 6, awarding: 8, karya: 15 },
        items: [
            {
                id: 'b4-1',
                title: 'Sesi Seminar Nasional BSF 4',
                category: 'foto',
                categoryLabel: 'Foto Lomba',
                type: 'image',
                url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200',
                thumbnailUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800',
                date: '14 Sep 2023',
                author: 'Dokumentasi BSF 4',
                description: 'Keynote speech dari Peneliti BRIN pada gelaran utama Seminar Nasional BSF 4.',
                likes: 380
            }
        ]
    },
    {
        id: 'bsf-5',
        code: 'BSF 5',
        title: 'Borneo Scientific Fair 5',
        year: '2024',
        theme: 'Empowering Young Researchers for Smart Society 5.0',
        bgGradient: 'from-[#1A1245] via-[#100A30] to-[#07041A]',
        borderColor: '#8B5CF6',
        accentColor: '#FBEE31',
        badgeBg: '#6D28D9',
        motifType: 'navy-royal',
        mediaCount: { foto: 30, video: 10, awarding: 10, karya: 18 },
        items: [
            {
                id: 'b5-1',
                title: 'Gala Dinner & Night of Appreciation BSF 5',
                category: 'awarding',
                categoryLabel: 'Dokumentasi Awarding',
                type: 'image',
                url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200',
                thumbnailUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
                date: '22 Okt 2024',
                author: 'Panitia LISMA BSF 5',
                description: 'Malam keakraban peserta BSF 5 dengan jamuan kearifan lokal Pontianak.',
                likes: 490
            }
        ]
    },
    {
        id: 'bsf-6',
        code: 'BSF 6',
        title: 'Borneo Scientific Fair 6',
        year: '2025',
        theme: 'AI & Clean Energy Breakthroughs for Archipelago Sustainability',
        bgGradient: 'from-[#3A1407] via-[#240C04] to-[#120501]',
        borderColor: '#F97316',
        accentColor: '#4BC6FB',
        badgeBg: '#EA580C',
        motifType: 'dark-tech',
        mediaCount: { foto: 35, video: 12, awarding: 12, karya: 20 },
        items: [
            {
                id: 'b6-1',
                title: 'Pitching Finalis Karya Tulis Terapan BSF 6',
                category: 'karya',
                categoryLabel: 'Karya Tulis',
                type: 'image',
                url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
                thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
                date: '10 Sep 2025',
                author: 'LISMA Media Center',
                description: 'Para peserta mempresentasikan karya terapan berbasis teknologi energi terbarukan.',
                likes: 620
            }
        ]
    },
    {
        id: 'bsf-7',
        code: 'BSF 7',
        title: 'Borneo Scientific Fair 7',
        year: '2026',
        theme: 'Pinnacle Innovation: Shaping Indonesia Emas 2045',
        bgGradient: 'from-[#072B45] via-[#031A2B] to-[#010C14]',
        borderColor: '#0264D9',
        accentColor: '#FBEE31',
        badgeBg: '#0264D9',
        motifType: 'cyan-[#0264D9]',
        mediaCount: { foto: 40, video: 15, awarding: 15, karya: 25 },
        items: [
            {
                id: 'b7-1',
                title: 'Dokumentasi Utama BSF 7 Current Edition',
                category: 'foto',
                categoryLabel: 'Foto Lomba',
                type: 'image',
                url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200',
                thumbnailUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
                date: '25 Sep 2026',
                author: 'Tim BSF 7 LISMA',
                description: 'Momen puncak pelaksanaan BSF 7 tahun 2026 yang paling terbaru.',
                likes: 850
            }
        ]
    }
];