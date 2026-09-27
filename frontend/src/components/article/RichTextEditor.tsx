import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

interface Props {
  value: string; // HTML
  onChange: (html: string) => void;
  placeholder?: string;
}

// Editor teks kaya untuk blok "paragraf": mendukung bold, italic,
// tautan (link), serta daftar berurutan (ol) dan tak berurutan (ul).
// Hasilnya disimpan sebagai HTML string di ContentBlock.teks.
export function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // subheading sudah jadi blok terpisah, bukan bagian dari paragraf
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Placeholder.configure({
        placeholder: placeholder ?? "Tulis paragraf...",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none min-h-[6rem] p-2",
      },
    },
  });

  // Sinkronkan editor kalau value berubah dari luar
  // (mis. saat data artikel selesai dimuat untuk mode edit).
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      // If you do NOT want to emit an update event
      editor.commands.setContent(value, { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  if (!editor) return null;

  const setLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL tautan", previous ?? "https://");
    if (url === null) return; // batal
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const buttonClass = (active: boolean) =>
    `px-2 py-1 text-xs font-bold rounded border-2 border-black ${active ? "bg-black text-white" : "bg-white hover:bg-gray-100"
    }`;

  return (
    <div className="border-2 border-black rounded-lg overflow-hidden bg-white">
      <div className="flex flex-wrap gap-1 p-2 border-b-2 border-black bg-gray-100">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonClass(editor.isActive("bold"))}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonClass(editor.isActive("italic"))}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buttonClass(editor.isActive("bulletList"))}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={buttonClass(editor.isActive("orderedList"))}
        >
          1. List
        </button>
        <button
          type="button"
          onClick={setLink}
          className={buttonClass(editor.isActive("link"))}
        >
          Link
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
          className={`${buttonClass(false)} disabled:opacity-30`}
        >
          Hapus Link
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
