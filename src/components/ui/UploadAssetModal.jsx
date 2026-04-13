import { useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { uploadBrandAsset, addAsset } from "../../services/brandAssets";

const CATEGORIES = [
  { value: "linkedin-banners", label: "LinkedIn Banners" },
  { value: "announcement-templates", label: "Announcement Templates" },
  { value: "brand-assets", label: "Brand Assets" },
];

const SUBCATEGORIES = {
  "announcement-templates": [
    { value: "probation-completion", label: "Probation Completion" },
    { value: "hiring", label: "Hiring" },
    { value: "news-updates", label: "News & Updates" },
  ],
};

export default function UploadAssetModal({ isOpen, onClose, defaultCategory, onAssetAdded }) {
  const fileInputRef = useRef(null);
  const adminPassword = useMemo(
    () => import.meta.env.VITE_ADD_EMPLOYEE_PASSWORD || "",
    [],
  );

  const [step, setStep] = useState("password");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: defaultCategory || "",
    subcategory: "",
    description: "",
    file: null,
    filePreview: "",
  });
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetAndClose = () => {
    setStep("password");
    setPassword("");
    setAuthError("");
    setForm({ name: "", category: defaultCategory || "", subcategory: "", description: "", file: null, filePreview: "" });
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

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    if (form.filePreview) URL.revokeObjectURL(form.filePreview);
    setForm((prev) => ({
      ...prev,
      file,
      filePreview: file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
      name: prev.name || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
    }));
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.file) {
      setFormError("Please select a file to upload.");
      return;
    }
    if (!form.name || !form.category) {
      setFormError("Name and category are required.");
      return;
    }

    setSubmitting(true);
    try {
      const fileUrl = await uploadBrandAsset(form.file, form.category);
      const created = await addAsset({
        name: form.name.trim(),
        category: form.category,
        subcategory: form.subcategory || "",
        description: form.description.trim(),
        file_url: fileUrl,
        thumbnail_url: form.file.type.startsWith("image/") ? fileUrl : "",
        file_type: form.file.type,
        file_size: form.file.size,
      });
      onAssetAdded?.(created);
      setStep("success");
    } catch (err) {
      setFormError(err?.message || "Failed to upload asset.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-lg font-semibold">
            {step === "success" ? "Asset Uploaded" : "Upload Asset"}
          </h2>
          <button onClick={resetAndClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        {step === "password" && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Admin Password
              </label>
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
              <p className="text-xs text-gray-500">
                Enter the admin password to upload assets.
              </p>
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
              <label className="block text-sm font-medium text-gray-700">File</label>
              <input
                ref={fileInputRef}
                type="file"
                className="sr-only"
                onChange={handleFileChange}
              />
              {form.filePreview ? (
                <div className="mt-1 flex items-center gap-3">
                  <img
                    src={form.filePreview}
                    alt="Preview"
                    className="h-20 w-20 rounded-md border object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm font-medium text-brand-700 hover:text-brand-900"
                  >
                    Change file
                  </button>
                </div>
              ) : form.file ? (
                <div className="mt-1 flex items-center gap-3">
                  <div className="flex h-20 w-20 items-center justify-center rounded-md border bg-gray-50 text-xs font-medium text-gray-500">
                    {form.file.type.split("/")[1]?.toUpperCase() || "FILE"}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm font-medium text-brand-700 hover:text-brand-900"
                  >
                    Change file
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-1 flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-4 py-6 text-center text-sm text-gray-500 hover:border-gray-400"
                >
                  <span className="font-medium text-gray-700">Click to upload</span>
                  <span className="text-xs">PNG, JPG, PDF, SVG, or any file</span>
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                placeholder="Asset name"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value, subcategory: "" }))}
                required
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            {SUBCATEGORIES[form.category] && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                <select
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
                  value={form.subcategory}
                  onChange={(e) => setForm((p) => ({ ...p, subcategory: e.target.value }))}
                >
                  <option value="">Select subcategory</option>
                  {SUBCATEGORIES[form.category].map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                placeholder="Optional description"
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
              {submitting ? "Uploading..." : "Upload Asset"}
            </button>
          </form>
        )}

        {step === "success" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              The asset was uploaded successfully and is now available for download.
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
