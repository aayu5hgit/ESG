import { useMemo, useState } from "react";
import { X, ShieldAlert } from "lucide-react";

export default function AdminPasswordModal({ isOpen, onClose, onConfirm, title, message }) {
  const adminPassword = useMemo(
    () => import.meta.env.VITE_ADD_EMPLOYEE_PASSWORD || "",
    [],
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!adminPassword) {
      setError("Admin password is not configured.");
      return;
    }
    if (password !== adminPassword) {
      setError("Incorrect password.");
      return;
    }
    setPassword("");
    setError("");
    onConfirm();
  };

  const handleClose = () => {
    setPassword("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert size={18} className="text-red-500" />
            <h2 className="text-base font-semibold text-gray-900">
              {title || "Admin Verification"}
            </h2>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <p className="mb-4 text-sm text-gray-600">
          {message || "Enter the admin password to continue."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
            placeholder="Admin password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            autoFocus
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
