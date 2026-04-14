import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, assetName }) {
  const [input, setInput] = useState("");

  const handleClose = () => {
    setInput("");
    onClose();
  };

  const handleConfirm = () => {
    if (input !== "DELETE") return;
    setInput("");
    onConfirm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-500" />
            <h2 className="text-base font-semibold text-gray-900">
              Delete Asset
            </h2>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        {assetName && (
          <p className="mb-2 text-sm font-medium text-gray-900">
            &ldquo;{assetName}&rdquo;
          </p>
        )}

        <p className="mb-4 text-sm text-gray-600">
          This action cannot be undone. Type{" "}
          <span className="font-mono font-bold text-red-600">DELETE</span>{" "}
          to confirm.
        </p>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type "DELETE"'
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:border-red-500 focus:outline-none"
          autoFocus
        />

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleClose}
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={input !== "DELETE"}
            className="flex-1 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-40"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
