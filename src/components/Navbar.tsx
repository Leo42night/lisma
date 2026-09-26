import { NavLink } from 'react-router-dom';
import {
    Menu,
    Search,
} from "lucide-react";
import DarkModeToggle from './DarkModeToggle';

// 1. Komponent Navigation Bar Simple
export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                <NavLink to="/" className="flex items-center gap-3">
                    {/* Ganti dengan logo asli */}
                    <img
                        src="/lisma-logo.svg"
                        alt="LISMA UNTAN"
                        className="h-14 w-14 object-contain"
                    />

                    <div className="leading-none">
                        <div className="text-xl mb-1 font-extrabold tracking-lisma-tight text-lisma-navy dark:text-white">
                            LISMA UNTAN
                        </div>
                        <div className="text-[9px] mb-1 font-semibold tracking-lisma-wide text-lisma-blue">
                            UKM PENALARAN & PENELITIAN
                        </div>
                        <div className="text-[9px] font-semibold tracking-lisma-wide text-lisma-blue">
                            UNIVERSITAS TANJUNGPURA
                        </div>
                    </div>
                </NavLink>

                <div className="hidden items-center gap-8 md:flex">
                    <a className="text-sm font-medium transition hover:text-lisma-blue" href="/#about">
                        Tentang
                    </a>
                    <NavLink to="/program" className={({ isActive }) => `${isActive ? 'border-b-2 border-zinc-500' : ''} text-sm font-medium transition hover:text-lisma-blue`}>
                        program
                    </NavLink>
                    <a className="text-sm font-medium transition hover:text-lisma-blue" href="/#berita">
                        Berita
                    </a>
                    <a className="text-sm font-medium transition hover:text-lisma-blue" href="/#kontak">
                        Kontak
                    </a>
                    <NavLink to="/kalender" className={({ isActive }) => `${isActive ? 'border-b-2 border-zinc-500' : ''} text-sm font-medium transition hover:text-lisma-blue`}>
                        Kalender
                    </NavLink>
                    <NavLink to="/dokumentasi" className={({ isActive }) => `${isActive ? 'border-b-2 border-zinc-500' : ''} text-sm font-medium transition hover:text-lisma-blue`}>
                        Dokumentasi
                    </NavLink>
                </div>

                <div className="flex items-center gap-3">
                    <button className="hidden rounded-full p-2.5 transition hover:bg-muted sm:block">
                        <Search size={19} />
                    </button>

                    {/* Dark Mode Switcher */}
                    <DarkModeToggle />

                    <a
                        href="#gabung"
                        className="hidden rounded-full bg-lisma-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-lisma-blue-dark sm:block"
                    >
                        Gabung Kami
                    </a>

                    <button className="rounded-full p-2.5 hover:bg-muted md:hidden">
                        <Menu size={21} />
                    </button>
                </div>
            </nav>
        </header>
    );
}