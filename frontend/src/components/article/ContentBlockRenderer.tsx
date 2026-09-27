import DOMPurify from "dompurify";
import type { ContentBlock } from "../../types";

export function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraf":
      // block.teks adalah HTML hasil RichTextEditor (bisa berisi <a>, <ul>,
      // <ol>, <strong>, <em>, dsb.) — selalu disanitasi sebelum dirender.
      return (
        <div
          className="prose prose-sm max-w-none text-gray-800 mb-4"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(block.teks),
          }}
        />
      );

    case "subheading":
      return <h3 className="text-xl font-bold mt-6 mb-3">{block.teks}</h3>;

    case "gambar":
      return (
        <figure className="mb-6">
          <img
            src={block.url}
            alt={block.caption ?? ""}
            className="w-full rounded-lg border-2 border-black"
          />
          {block.caption && (
            <figcaption className="text-sm text-gray-500 mt-2 text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "kutipan":
      return (
        <blockquote className="border-l-4 border-black pl-4 italic my-6">
          <p className="text-lg">&ldquo;{block.kutipan}&rdquo;</p>
          <footer className="text-sm text-gray-500 mt-2">
            — {block.kutipanSumber}
          </footer>
        </blockquote>
      );

    case "eventData":
      return (
        <div className="border-2 border-black rounded-lg p-4 my-6 bg-yellow-50">
          <h4 className="font-bold mb-2">Detail Acara</h4>
          <p>
            <span className="font-semibold">Lokasi:</span> {block.lokasi}
          </p>
          <p>
            <span className="font-semibold">Waktu:</span> {block.waktu}
          </p>
          <p>
            <span className="font-semibold">Pemateri:</span>{" "}
            {block.pemateri}
          </p>
        </div>
      );

    default:
      return null;
  }
}
