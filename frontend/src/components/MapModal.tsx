import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Helper untuk menangkap event klik peta & memperbarui koordinat terpilih
function MapEventsHandler({ onSelectPosition }: { onSelectPosition: (latlng: L.LatLng) => void }) {
  useMapEvents({
    click(e) {
      onSelectPosition(e.latlng);
    },
  });
  return null;
}

export function MapModal() {
  const defaultPosition: [number, number] = [-0.053977, 109.349761];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number }>({
    lat: defaultPosition[0],
    lng: defaultPosition[1],
  });
  const [isCopied, setIsCopied] = useState(false);

  // String format koordinat
  const coordString = `${selectedCoords.lat.toFixed(6)}, ${selectedCoords.lng.toFixed(6)}`;

  // Link langsung ke Google Maps
  const googleMapsUrl = `https://www.google.com/maps?q=${selectedCoords.lat},${selectedCoords.lng}`;

  // Fungsi menyalin koordinat ke clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coordString);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Gagal menyalin:', err);
    }
  };

  return (
    <div className="w-full h-full">
      {/* Peta Ringkas Utama (Preview) */}
      <div
        className="relative w-full h-full cursor-pointer group"
        onClick={() => setIsModalOpen(true)}
      >
        <MapContainer
          center={defaultPosition}
          zoom={13}
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={defaultPosition} icon={customIcon} />
        </MapContainer>

        {/* Overlay Petunjuk Perbesar */}
        <div className="absolute inset-0 z-500 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <span className="px-4 py-2 text-sm font-semibold text-white bg-black/60 rounded-full backdrop-blur-sm">
            Klik untuk memperbesar peta 🔍
          </span>
        </div>
      </div>

      {/* MODAL PETA BESAR (90vw x 80vh) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-9999 bg-black/70 flex items-center justify-center p-4">
          <div className="relative w-[90vw] h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">

            {/* Header Modal */}
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Eksplorasi Lokasi</h2>
                <p className="text-xs text-gray-500">Klik area peta untuk menentukan titik koordinat</p>
              </div>

              {/* Tombol Close */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>

            {/* Container Peta */}
            <div className="relative flex-1 w-full h-full">
              <MapContainer
                center={[selectedCoords.lat, selectedCoords.lng]}
                zoom={14}
                scrollWheelZoom={true}
                style={{ width: '100%', height: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapEventsHandler
                  onSelectPosition={(latlng) => setSelectedCoords({ lat: latlng.lat, lng: latlng.lng })}
                />

                <Marker position={[selectedCoords.lat, selectedCoords.lng]} icon={customIcon} />
              </MapContainer>
            </div>

            {/* Footer Toolbar: Info Koordinat & Aksi */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-gray-50 border-t">
              {/* Tampilan Koordinat */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Koordinat:</span>
                <code className="px-3 py-1.5 bg-gray-200 rounded text-sm font-mono font-semibold text-gray-800">
                  {coordString}
                </code>
              </div>

              {/* Tombol Salin & Buka Google Maps */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopy}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors border ${isCopied
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                >
                  {isCopied ? '✓ Tersalin!' : '📋 Salin Koordinat'}
                </button>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  🌐 Buka di Google Maps
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}