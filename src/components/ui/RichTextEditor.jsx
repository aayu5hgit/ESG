import { useRef, useCallback } from "react";
import { Bold, Italic, List, ListOrdered, Link, Undo, Redo } from "lucide-react";

function ToolbarButton({ icon: Icon, label, onClick, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`rounded p-1.5 transition-colors ${
        active
          ? "bg-brand-700/10 text-brand-700"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      }`}
    >
      <Icon size={15} />
    </button>
  );
}

export default function RichTextEditor({ value, onChange, placeholder = "Write something..." }) {
  const editorRef = useRef(null);

  const exec = useCallback((command, val = null) => {
    document.execCommand(command, false, val);
    editorRef.current?.focus();
    if (onChange) onChange(editorRef.current?.innerHTML || "");
  }, [onChange]);

  const handleInput = () => {
    if (onChange) onChange(editorRef.current?.innerHTML || "");
  };

  const handleLink = () => {
    const url = prompt("Enter URL:");
    if (url) exec("createLink", url);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  return (
    <div className="overflow-hidden rounded-md border border-gray-300 focus-within:border-brand-700">
      <div className="flex items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1">
        <ToolbarButton icon={Bold} label="Bold" onClick={() => exec("bold")} />
        <ToolbarButton icon={Italic} label="Italic" onClick={() => exec("italic")} />
        <div className="mx-1 h-4 w-px bg-gray-300" />
        <ToolbarButton icon={List} label="Bullet list" onClick={() => exec("insertUnorderedList")} />
        <ToolbarButton icon={ListOrdered} label="Numbered list" onClick={() => exec("insertOrderedList")} />
        <div className="mx-1 h-4 w-px bg-gray-300" />
        <ToolbarButton icon={Link} label="Link" onClick={handleLink} />
        <div className="mx-1 h-4 w-px bg-gray-300" />
        <ToolbarButton icon={Undo} label="Undo" onClick={() => exec("undo")} />
        <ToolbarButton icon={Redo} label="Redo" onClick={() => exec("redo")} />
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        className="min-h-[120px] px-3 py-2 text-sm leading-relaxed text-gray-900 outline-none empty:before:text-gray-400 empty:before:content-[attr(data-placeholder)]"
        dangerouslySetInnerHTML={{ __html: value || "" }}
      />
    </div>
  );
}
