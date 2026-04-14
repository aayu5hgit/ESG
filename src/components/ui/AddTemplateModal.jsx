import { useMemo, useState } from "react";
import { X, FileText, Sheet } from "lucide-react";
import { addAsset } from "../../services/brandAssets";

function detectType(url) {
  if (!url) return "";
  if (url.includes("docs.google.com/document")) return "google-doc";
  if (url.includes("docs.google.com/spreadsheets")) return "google-sheet";
  return "";
}

function isValidGoogleUrl(url) {
  return /docs\.google\.com\/(document|spreadsheets)\/d\/[a-zA-Z0-9_-]+/.test(url);
}

export default function AddTemplateModal({ isOpen, onClose, onAssetAdded }) {
  const adminPassword = useMemo(
    () => import.meta.env.VITE_ADD_EMPLOYEE_PASSWORD || "",
    [],
  );

  const [step, setStep] = useState("password");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [form, setForm] = useState({
    url: "",
    name: "",
    type: "",
    description: "",
  });
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetAndClose = () => {
    setStep("password");
    setPassword("");
    setAuthError("");
    setForm({ url: "", name: "", type: "", description: "" });
    setFormError("");
    setSubmitting(false);
    onClose();
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!adminPassword) {
      setAuthError("Admin password is not configured.");
      return;
    }
    if (password !== adminPassword) {
      setAuthError("Incorrect password. Try again.");
      return;
    }
    setAuthError("");
    setStep("form");
  };

  const handleUrlChange = (url) => {
    const detected = detectType(url);
    setForm((p) => ({ ...p, url, type: detected || p.type }));
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.url || !isValidGoogleUrl(form.url)) {
      setFormError("Please enter a valid Google Docs or Sheets URL.");
      return;
    }
    if (!form.name) {
      setFormError("Name is required.");
      return;
    }
    if (!form.type) {
      setFormError("Please select the template type.");
      return;
    }

    setSubmitting(true);
    try {
      const created = await addAsset({
        name: form.name.trim(),
        category: "google-templates",
        subcategory: form.type,
        description: form.description.trim(),
        file_url: form.url.trim(),
        thumbnail_url: "",
        file_type: form.type === "google-sheet" ? "application/vnd.google-apps.spreadsheet" : "application/vnd.google-apps.document",
        file_size: 0,
      });
      onAssetAdded?.(created);
      setStep("success");
    } catch (err) {
      setFormError(err?.message || "Failed to add template.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const detectedType = detectType(form.url);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-lg font-semibold">
            {step === "success" ? "Template Added" : "Add Google Template"}
          </h2>
          <button onClick={resetAndClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        {step === "password" && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Admin Password</label>
              <input
                type="password"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            {authError ? (
              <p className="text-sm text-red-600">{authError}</p>
            ) : (
              <p className="text-xs text-gray-500">Enter the admin password to add templates.</p>
            )}
            <button
              type="submit"
              className="w-full rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900"
            >
              Continue
            </button>
          </form>
        )}

        {step === "form" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Google URL</label>
              <input
                type="url"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                placeholder="https://docs.google.com/document/d/..."
                value={form.url}
                onChange={(e) => handleUrlChange(e.target.value)}
                required
              />
              {detectedType && (
                <div className="mt-1.5 flex items-center gap-1.5">
                  {detectedType === "google-doc" ? (
                    <FileText size={13} className="text-blue-600" />
                  ) : (
                    <Sheet size={13} className="text-green-600" />
                  )}
                  <span className="text-xs text-gray-500">
                    Detected: Google {detectedType === "google-doc" ? "Doc" : "Sheet"}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                placeholder="Template name"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <div className="mt-1 flex gap-2">
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, type: "google-doc" }))}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-md border px-3 py-2.5 text-sm font-medium transition-colors ${
                    form.type === "google-doc"
                      ? "border-blue-300 bg-blue-50 text-blue-700"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <FileText size={16} />
                  Google Doc
                </button>
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, type: "google-sheet" }))}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-md border px-3 py-2.5 text-sm font-medium transition-colors ${
                    form.type === "google-sheet"
                      ? "border-green-300 bg-green-50 text-green-700"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Sheet size={16} />
                  Google Sheet
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <textarea
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                placeholder="What is this template for?"
                rows={2}
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              />
            </div>

            {formError && <p className="text-sm text-red-600">{formError}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900 disabled:opacity-60"
            >
              {submitting ? "Adding..." : "Add Template"}
            </button>
          </form>
        )}

        {step === "success" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              The template has been added and is now available for the team.
            </p>
            <button
              onClick={resetAndClose}
              className="w-full rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
