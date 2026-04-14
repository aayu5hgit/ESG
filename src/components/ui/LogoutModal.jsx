import { X, LogOut } from "lucide-react";

export default function LogoutModal({ isOpen, onClose, onConfirm, email }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <LogOut size={18} className="text-gray-500" />
            <h2 className="text-base font-semibold text-gray-900">
              Logout from Admin
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <p className="mb-1 text-sm text-gray-600">
          You are signed in as:
        </p>
        <p className="mb-4 text-sm font-medium text-gray-900">{email}</p>
        <p className="mb-5 text-sm text-gray-500">
          You will lose access to admin actions until you sign in again.
        </p>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-md bg-brand-900 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-950"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
