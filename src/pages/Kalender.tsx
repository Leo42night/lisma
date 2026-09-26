import { useEffect, useState } from 'react';

interface CalendarEvent {
    id: string;
    summary: string;
    description?: string;
    location?: string; // Menambahkan field lokasi
    start: { dateTime?: string; date?: string };
    end: { dateTime?: string; date?: string };
    htmlLink: string;
}

export default function GoogleCalendarEvents() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID;

    useEffect(() => {
        const fetchPublicEvents = async () => {
            setLoading(true);
            setError(null);

            const timeMin = new Date().toISOString();
            const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
                calendarId
            )}/events?key=${apiKey}&timeMin=${timeMin}&singleEvents=true&orderBy=startTime`;

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.error?.message || 'Gagal mengambil data kalender');
                }

                const data = await response.json();
                setEvents(data.items || []);
            } catch (err: any) {
                console.error('Error fetching calendar:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (apiKey && calendarId) {
            fetchPublicEvents();
        } else {
            setError('API Key atau Calendar ID belum dikonfigurasi di file .env');
            setLoading(false);
        }
    }, [apiKey, calendarId]);

    // Helper Format Tanggal
    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6 pb-4 border-b">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Jadwal Acara Publik</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Berikut adalah jadwal program kerja, seminar, workshop, dan seluruh rangkaian kegiatan UKM Penalaran dan Penelitian yang terintegrasi langsung dari Google Calendar.
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-gray-500">Memuat acara...</div>
                ) : error ? (
                    <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                        <strong>Terjadi Kesalahan:</strong> {error}
                    </div>
                ) : events.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">Tidak ada acara mendatang.</div>
                ) : (
                    <div className="space-y-4">
                        {events.map((event) => {
                            const startDate = event.start.dateTime || event.start.date;

                            // Link ke Google Maps jika ada lokasi
                            const googleMapsUrl = event.location
                                ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`
                                : null;

                            return (
                                <div
                                    key={event.id}
                                    className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                                >
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-gray-900">{event.summary}</h3>

                                        {/* TANGGAL & WAKTU */}
                                        <p className="text-xs text-blue-600 font-medium flex items-center gap-1">
                                            <span>📅</span> {formatDate(startDate)}
                                        </p>

                                        {/* LOKASI (DITAMPILKAN JIKA ADA) */}
                                        {event.location && (
                                            <p className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                                                <span>📍</span>
                                                <a
                                                    href={googleMapsUrl!}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:underline"
                                                    title="Buka lokasi di Google Maps"
                                                >
                                                    {event.location}
                                                </a>
                                            </p>
                                        )}

                                        {/* DESKRIPSI */}
                                        {event.description && (
                                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{event.description}</p>
                                        )}
                                    </div>

                                    <a
                                        href={event.htmlLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded hover:bg-white hover:text-gray-900 transition-colors whitespace-nowrap self-start sm:self-center"
                                    >
                                        Buka di Calendar ↗
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}