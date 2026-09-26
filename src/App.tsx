import { Routes, Route, Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";
// Internal
import Home from './pages/Home';
import Program from './pages/Program';
import Kalender from './pages/Kalender';
import Dokumentasi from './pages/Dokumentasi';
import Navbar from './components/Navbar';
import { MapModal } from './components/MapModal';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar Selalu Muncul di Semua Halaman */}
      <Navbar />

      {/* Dynamic Route View */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/program" element={<Program />} />
        <Route path="/kalender" element={<Kalender />} />
        <Route path="/dokumentasi" element={<Dokumentasi />} />

        {/* Fallback 404 Route */}
        <Route
          path="*"
          element={
            <div className="p-12 text-center text-red-500">
              <h2 className="text-xl font-bold">404 - Halaman Tidak Ditemukan</h2>
              <Link to="/" className="text-blue-600 underline mt-2 block">
                Kembali ke Beranda
              </Link>
            </div>
          }
        />
      </Routes>

      {/* FOOTER */}
      <footer id="kontak" className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="grid gap-12 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="text-2xl font-extrabold tracking-lisma-tight text-lisma-navy dark:text-white">
                LISMA UNTAN
              </div>

              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                UKM Penalaran dan Penelitian Universitas Tanjungpura.
              </p>
            </div>

            <div>
              <div className="text-sm font-bold">Navigasi</div>

              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <a className="block hover:text-lisma-blue" href="#about">
                  Tentang
                </a>
                <a className="block hover:text-lisma-blue" href="#program">
                  Program
                </a>
                <a className="block hover:text-lisma-blue" href="#berita">
                  Berita
                </a>
              </div>
            </div>

            <div>
              <div className="text-sm font-bold">Kontak</div>

              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-2">
                  <MapPin size={17} />
                  Universitas Tanjungpura
                </div>

                <div className="flex gap-2">
                  <Mail size={17} />
                  lisma@untan.ac.id
                </div>

                <div className="flex gap-2">
                  <FaInstagram size={17} />
                  @lismauntan
                </div>
              </div>
            </div>
            <div className="w-full rounded-lg overflow-hidden border">
              <MapModal />
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} LISMA UNTAN. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}