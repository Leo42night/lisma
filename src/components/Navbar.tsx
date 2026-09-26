import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

const NAV_LINKS = [
    { to: "/#about", label: "Tentang", exact: false, isAnchor: true },
    { to: "/program", label: "Program", exact: false },
    { to: "/berita", label: "Berita", exact: false },
    { to: "/kalender", label: "Kalender", exact: false },
    { to: "/dokumentasi", label: "Dokumentasi", exact: false },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    // Kunci scroll body saat menu mobile terbuka
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    // Tutup menu otomatis saat layar melebar ke breakpoint md
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        const handler = (e: MediaQueryListEvent) => e.matches && setOpen(false);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `text-sm font-medium transition hover:text-lisma-blue ${isActive ? "border-b-2 border-lisma-blue text-lisma-blue" : ""
        }`;

    return (
        <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
                {/* Logo */}
                <NavLink to="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                    <img
                        src="/lisma-logo.svg"
                        alt="LISMA UNTAN"
                        className="h-10 w-10 shrink-0 object-contain sm:h-14 sm:w-14"
                    />

                    <div className="min-w-0 leading-none">
                        <div className="truncate text-base font-extrabold tracking-lisma-tight text-lisma-navy dark:text-white sm:mb-1 sm:text-xl">
                            LISMA UNTAN
                        </div>
                        {/* Subjudul disembunyikan di layar sempit agar tidak mendesak judul */}
                        <div className="hidden text-[9px] mb-1 font-semibold tracking-lisma-wide text-lisma-blue sm:block">
                            UKM PENALARAN & PENELITIAN
                        </div>
                        <div className="hidden text-[9px] font-semibold tracking-lisma-wide text-lisma-blue sm:block">
                            UNIVERSITAS TANJUNGPURA
                        </div>
                    </div>
                </NavLink>

                {/* Nav desktop */}
                <div className="hidden items-center gap-8 md:flex">
                    {NAV_LINKS.map((link) =>
                        link.isAnchor ? (
                            <a
                                key={link.to}
                                href={link.to}
                                className="text-sm font-medium transition hover:text-lisma-blue"
                            >
                                {link.label}
                            </a>
                        ) : (
                            <NavLink key={link.to} to={link.to} className={linkClass}>
                                {link.label}
                            </NavLink>
                        )
                    )}
                </div>

                {/* Aksi kanan */}
                <div className="flex items-center gap-1.5 sm:gap-3">
                    <button
                        type="button"
                        aria-label="Cari"
                        className="hidden rounded-full p-2.5 transition hover:bg-muted sm:block"
                    >
                        <Search size={19} />
                    </button>

                    <DarkModeToggle />

                    <a
                        href="#gabung"
                        className="hidden rounded-full bg-lisma-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-lisma-blue-dark sm:block"
                    >
                        Gabung Kami
                    </a>

                    <button
                        type="button"
                        aria-label={open ? "Tutup menu" : "Buka menu"}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        onClick={() => setOpen((prev) => !prev)}
                        className="rounded-full p-2.5 transition hover:bg-muted md:hidden"
                    >
                        {open ? <X size={21} /> : <Menu size={21} />}
                    </button>
                </div>
            </nav>

            {/* Panel menu mobile */}
            <div
                id="mobile-menu"
                className={`grid overflow-hidden border-t border-border/70 bg-background transition-[grid-template-rows] duration-300 ease-in-out md:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="flex flex-col gap-1 px-4 py-4">
                        {NAV_LINKS.map((link) =>
                            link.isAnchor ? (
                                <a
                                    key={link.to}
                                    href={link.to}
                                    onClick={() => setOpen(false)}
                                    className="rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-muted"
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
                                        `rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-muted ${isActive ? "bg-muted text-lisma-blue" : ""
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            )
                        )}

                        <div className="mt-2 flex items-center gap-2 border-t border-border/70 pt-4">
                            <button
                                type="button"
                                aria-label="Cari"
                                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"
                            >
                                <Search size={16} />
                                Cari
                            </button>
                        </div>

                        <a
                            href="#gabung"
                            onClick={() => setOpen(false)}
                            className="mt-2 rounded-full bg-lisma-blue px-5 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-lisma-blue-dark"
                        >
                            Gabung Kami
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}