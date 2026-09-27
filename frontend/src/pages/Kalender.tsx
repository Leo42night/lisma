import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, ImageOff, MapPin } from "lucide-react";
import DOMPurify from "dompurify";

// Paksa setiap <a> hasil sanitasi dibuka di tab baru & aman dari tabnabbing.
// Hook ini didaftarkan sekali di level modul, bukan di dalam komponen.
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName === "A") {
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noopener noreferrer");
    }
});

/* =========================================================
   TIPE DATA
   ========================================================= */

interface CalendarAttachment {
    fileUrl: string;
    title: string;
    mimeType: string;
    iconLink?: string;
    fileId?: string;
}

interface CalendarEvent {
    id: string;
    summary: string;
    description?: string;
    location?: string;
    htmlLink: string;
    eventType?: string;
    start: { date?: string; dateTime?: string };
    end: { date?: string; dateTime?: string };
    attachments?: CalendarAttachment[];
}

/* =========================================================
   HELPER — TANGGAL & WAKTU
   ========================================================= */

const toDateKey = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
        d.getDate()
    ).padStart(2, "0")}`;

const HARI_PANJANG = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

function formatSingleDate(d: Date) {
    return `${HARI_PANJANG[d.getDay()]}, ${d.getDate()} ${BULAN[d.getMonth()]}, ${d.getFullYear()}`;
}

function getEffectiveStartDate(event: CalendarEvent): Date | null {
    if (event.start.dateTime) return new Date(event.start.dateTime);
    if (event.start.date) return new Date(event.start.date);
    return null;
}

function getEffectiveEndDate(event: CalendarEvent): Date | null {
    if (event.end.dateTime) return new Date(event.end.dateTime);
    if (event.end.date) {
        // end.date pada all-day event bersifat eksklusif (hari setelah hari terakhir),
        // jadi dikurangi satu hari untuk mendapatkan tanggal terakhir yang sebenarnya.
        const d = new Date(event.end.date);
        d.setDate(d.getDate() - 1);
        return d;
    }
    return null;
}

/** "Sabtu, 26 September, 2026" atau, jika lintas hari, "Sabtu, 26 September, 2026—Minggu, 27 September, 2026" */
function formatDateHeading(event: CalendarEvent) {
    const start = getEffectiveStartDate(event);
    if (!start) return "";

    const end = getEffectiveEndDate(event);
    if (!end || toDateKey(start) === toDateKey(end)) return formatSingleDate(start);

    return `${formatSingleDate(start)}—${formatSingleDate(end)}`;
}

function formatTime(dateTimeString: string) {
    return new Date(dateTimeString).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

/** Menampilkan rentang waktu mulai–selesai, atau "Sepanjang hari" untuk all-day event */
function formatTimeRange(event: CalendarEvent) {
    if (event.start.date && !event.start.dateTime) return "Sepanjang hari";
    if (!event.start.dateTime || !event.end.dateTime) return "";
    return `${formatTime(event.start.dateTime)} – ${formatTime(event.end.dateTime)}`;
}

/**
 * Label kategori di atas jam. Prioritas: prefix "type:" di description,
 * lalu eventType bawaan Calendar, baru fallback "Acara".
 */
function eventKind(event: CalendarEvent, kindFromDescription: string | null) {
    if (kindFromDescription) return kindFromDescription;
    if (event.eventType && event.eventType !== "default") {
        return event.eventType.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
    }
    return "Acara";
}

/**
 * Mencari prefix "type:" (huruf kecil) di awal description, mengambil nilainya
 * sampai baris baru (\n), lalu mengembalikan sisa description tanpa baris itu.
 * Contoh input: "type: Tour\nOk<br><ol>...".
 */
function extractEventKind(description?: string): { kind: string | null; rest: string } {
    if (!description) return { kind: null, rest: "" };

    const trimmed = description.replace(/^\s+/, "");
    const match = trimmed
        .toLowerCase()
        .match(/^type:\s*([^\n]*?)(?:\n|<br\s*\/?>|$)/i);
    if (!match) return { kind: null, rest: description };

    const kind = match[1].trim();
    console.log(match)
    const rest = trimmed.slice(match[0].length);
    return { kind: kind || null, rest };
}

/* =========================================================
   HELPER — DESKRIPSI (deskripsi Google Calendar adalah HTML,
   bukan plain text: <br>, <ol>/<ul><li>, <a href> dsb.)
   ========================================================= */

function sanitizeDescription(html: string) {
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            "a", "b", "strong", "i", "em", "u", "br",
            "p", "div", "span", "ul", "ol", "li", "blockquote",
        ],
        ALLOWED_ATTR: ["href", "class"],
    });
}

/* =========================================================
   HELPER — COVER DARI ATTACHMENT DRIVE
   ========================================================= */

function getImageAttachment(attachments?: CalendarAttachment[]) {
    return attachments?.find((a) => a.mimeType?.startsWith("image/")) ?? null;
}

function getDriveFileId(attachment: CalendarAttachment) {
    return attachment.fileId ?? attachment.fileUrl.match(/[-\w]{20,}/)?.[0] ?? null;
}

/**
 * fileUrl (webViewLink, contoh: drive.google.com/open?id=...) tidak bisa
 * dipakai langsung sebagai <img src>, jadi dikonversi ke endpoint thumbnail
 * publik Google Drive. Endpoint ini TIDAK RESMI/didokumentasikan dan sering
 * gagal (403/404) kalau:
 *   1. File belum di-share sebagai "Anyone with the link" — penyebab paling umum.
 *   2. Drive membatasi akses thumbnail lintas-domain (dianggap hotlinking),
 *      terutama untuk ukuran (`sz`) besar atau traffic dari domain baru.
 *   3. File sempat dipindai/di-scan Google dan link thumbnail-nya kedaluwarsa.
 * Karena tidak ada jaminan endpoint ini selalu berhasil, komponen di bawah
 * selalu punya fallback: kalau <img> gagal, tampilkan tombol yang membuka
 * fileUrl (link "Buka di Drive") sebagai gantinya.
 */
function buildThumbnailUrl(attachment: CalendarAttachment) {
    const fileId = getDriveFileId(attachment);
    return fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000` : null;
}

function CoverImage({ attachment, alt }: { attachment: CalendarAttachment | null; alt: string }) {
    const [failed, setFailed] = useState(false);
    const thumbSrc = attachment ? buildThumbnailUrl(attachment) : null;

    if (!attachment) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
                <ImageOff size={28} />
                <span className="text-xs">Tanpa lampiran gambar</span>
            </div>
        );
    }

    if (!thumbSrc || failed) {
        // Thumbnail gagal dimuat → alternatif: tombol onClick yang membuka link Drive.
        return (
            <a
                href={attachment.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted p-4 text-center text-muted-foreground transition hover:border-lisma-blue hover:text-lisma-blue"
            >
                <ExternalLink size={24} />
                <span className="text-xs font-medium">Gambar gagal dimuat</span>
                <span className="text-xs underline">Buka lampiran ↗</span>
            </a>
        );
    }

    return (
        <img
            src={thumbSrc}
            alt={alt}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
        />
    );
}

/* =========================================================
   MINI KALENDER
   ========================================================= */

const HARI = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const BULAN = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function buildMonthGrid(viewedMonth: Date): (Date | null)[] {
    const year = viewedMonth.getFullYear();
    const month = viewedMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (Date | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
}

function MiniCalendar({
    viewedMonth,
    setViewedMonth,
    selectedDate,
    setSelectedDate,
    eventDateKeys,
}: {
    viewedMonth: Date;
    setViewedMonth: (d: Date) => void;
    selectedDate: Date;
    setSelectedDate: (d: Date) => void;
    eventDateKeys: Set<string>;
}) {
    const cells = useMemo(() => buildMonthGrid(viewedMonth), [viewedMonth]);
    const todayKey = toDateKey(new Date());
    const selectedKey = toDateKey(selectedDate);

    return (
        <div className="overflow-hidden rounded-2xl border border-border">
            <div className="flex items-center justify-between bg-lisma-navy px-4 py-4 text-white dark:bg-black">
                <button
                    type="button"
                    aria-label="Bulan sebelumnya"
                    onClick={() =>
                        setViewedMonth(new Date(viewedMonth.getFullYear(), viewedMonth.getMonth() - 1, 1))
                    }
                    className="rounded-full p-1.5 transition hover:bg-white/10"
                >
                    <ChevronLeft size={20} />
                </button>
                <p className="text-base font-bold">
                    {BULAN[viewedMonth.getMonth()]} {viewedMonth.getFullYear()}
                </p>
                <button
                    type="button"
                    aria-label="Bulan berikutnya"
                    onClick={() =>
                        setViewedMonth(new Date(viewedMonth.getFullYear(), viewedMonth.getMonth() + 1, 1))
                    }
                    className="rounded-full p-1.5 transition hover:bg-white/10"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            <div className="grid grid-cols-7 text-center text-xs font-semibold text-muted-foreground">
                {HARI.map((h) => (
                    <div key={h} className="border-b border-border py-2.5">
                        {h}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7">
                {cells.map((date, i) => {
                    if (!date) return <div key={i} className="border-b border-r border-border p-3" />;

                    const key = toDateKey(date);
                    const isToday = key === todayKey;
                    const isSelected = key === selectedKey;
                    const hasEvent = eventDateKeys.has(key);

                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setSelectedDate(date)}
                            className={`relative border-b border-r border-border p-3 text-sm font-semibold transition-colors
                                ${isToday ? "bg-lisma-navy text-white dark:bg-black" : ""}
                                ${isSelected && !isToday ? "bg-muted" : ""}
                                ${!isToday ? "hover:bg-muted" : ""}
                            `}
                        >
                            {date.getDate()}
                            {hasEvent && !isToday && (
                                <span className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-lisma-blue" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

/* =========================================================
   KARTU ACARA (kiri + tengah)
   ========================================================= */

function EventDetail({ event }: { event: CalendarEvent }) {
    const imageAttachment = getImageAttachment(event.attachments);
    const { kind: kindFromDescription, rest: cleanedDescription } = extractEventKind(event.description);
    const [venueName, ...addressParts] = (event.location ?? "").split(",");
    const address = addressParts.join(",").trim();
    const mapsUrl = event.location
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`
        : null;

    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[220px_1fr] lg:gap-10">
            {/* Cover dari attachment Drive, dengan fallback link kalau gagal dimuat */}
            <div>
                <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-muted">
                    <CoverImage attachment={imageAttachment} alt={imageAttachment?.title ?? event.summary} />
                </div>
                {imageAttachment && (
                    <p className="mt-2 text-xs leading-snug text-muted-foreground">{imageAttachment.title}</p>
                )}
            </div>

            {/* Detail acara */}
            <div>
                <p className="text-2xl font-bold text-foreground">{formatDateHeading(event)}</p>
                <h2 className="mt-1 text-xl font-semibold leading-snug text-foreground">{event.summary}</h2>

                <div className="mt-5">
                    <p className="text-sm font-medium text-muted-foreground">
                        {eventKind(event, kindFromDescription)}
                    </p>
                    <p className="text-base font-semibold text-foreground">{formatTimeRange(event)}</p>
                </div>

                {event.location && (
                    <div className="mt-5">
                        <p className="flex items-center gap-1.5 text-base font-semibold text-foreground">
                            <MapPin size={16} className="text-lisma-blue" />
                            {venueName.trim()}
                        </p>
                        {address && (
                            <a
                                href={mapsUrl ?? undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-muted-foreground hover:text-lisma-blue hover:underline"
                            >
                                {address}
                            </a>
                        )}
                    </div>
                )}

                {cleanedDescription && (
                    <div
                        className="prose-events mt-5 text-sm leading-relaxed text-muted-foreground
                            [&_a]:text-lisma-blue [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-lisma-blue-dark
                            [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:pl-5 [&_ul]:pl-5 [&_li]:my-0.5
                            [&_br]:content-[''] [&_p]:my-2"
                        // cleanedDescription = event.description tanpa baris "type: ..." di depannya,
                        // tetap disanitasi lewat DOMPurify sebelum dirender sebagai HTML.
                        dangerouslySetInnerHTML={{ __html: sanitizeDescription(cleanedDescription) }}
                    />
                )}

                <a
                    href={event.htmlLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block text-sm font-medium text-lisma-blue hover:underline"
                >
                    Buka di Google Calendar ↗
                </a>
            </div>
        </div>
    );
}

/* =========================================================
   KOMPONEN UTAMA
   ========================================================= */

export default function GoogleCalendarEvents() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [viewedMonth, setViewedMonth] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    });
    const [selectedDate, setSelectedDate] = useState(() => new Date());

    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID;

    useEffect(() => {
        const fetchEventsForMonth = async () => {
            setLoading(true);
            setError(null);

            const timeMin = new Date(viewedMonth.getFullYear(), viewedMonth.getMonth(), 1).toISOString();
            const timeMax = new Date(viewedMonth.getFullYear(), viewedMonth.getMonth() + 1, 0, 23, 59, 59).toISOString();

            const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
                calendarId
            )}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.error?.message || "Gagal mengambil data kalender");
                }
                const data = await response.json();
                setEvents(data.items || []);
            } catch (err: any) {
                console.error("Error fetching calendar:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (apiKey && calendarId) {
            fetchEventsForMonth();
        } else {
            setError("API Key atau Calendar ID belum dikonfigurasi di file .env");
            setLoading(false);
        }
    }, [apiKey, calendarId, viewedMonth]);

    const eventDateKeys = useMemo(() => {
        const set = new Set<string>();
        events.forEach((e) => {
            const raw = e.start.dateTime || e.start.date;
            if (raw) set.add(toDateKey(new Date(raw)));
        });
        return set;
    }, [events]);

    const eventsOnSelectedDay = useMemo(
        () =>
            events.filter((e) => {
                const raw = e.start.dateTime || e.start.date;
                return raw && toDateKey(new Date(raw)) === toDateKey(selectedDate);
            }),
        [events, selectedDate]
    );

    return (
        <main className="min-h-screen bg-background px-4 py-12 font-sans text-foreground transition-colors duration-300 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 border-b border-border pb-4">
                    <h2 className="text-xl font-bold text-foreground">Jadwal Acara Publik</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Program kerja, seminar, workshop, dan seluruh rangkaian kegiatan UKM Penalaran dan
                        Penelitian yang terintegrasi langsung dari Google Calendar.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
                    {/* Kiri + tengah: detail acara hari terpilih */}
                    <div>
                        {loading ? (
                            <div className="p-8 text-center text-muted-foreground">Memuat acara...</div>
                        ) : error ? (
                            <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
                                <strong>Terjadi Kesalahan:</strong> {error}
                            </div>
                        ) : eventsOnSelectedDay.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground">
                                Tidak ada acara pada tanggal ini.
                            </div>
                        ) : (
                            <div className="space-y-10">
                                {eventsOnSelectedDay.map((event) => (
                                    <EventDetail key={event.id} event={event} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Kanan: mini kalender */}
                    <MiniCalendar
                        viewedMonth={viewedMonth}
                        setViewedMonth={setViewedMonth}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        eventDateKeys={eventDateKeys}
                    />
                </div>
            </div>
        </main>
    );
}