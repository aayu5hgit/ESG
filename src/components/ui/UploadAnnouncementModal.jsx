import { useRef, useState } from "react";
import { X } from "lucide-react";
import { uploadBrandAsset, addAsset } from "../../services/brandAssets";
import RichTextEditor from "./RichTextEditor";

const SUBCATEGORIES = [
  { value: "probation-completion", label: "Probation Completion" },
  { value: "hiring", label: "Hiring" },
  { value: "news-updates", label: "News & Updates" },
];

export default function UploadAnnouncementModal({ isOpen, onClose, onAssetAdded }) {
  const fileInputRef = useRef(null);
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({ name: "", subcategory: "", description: "", file: null, filePreview: "" });
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetAndClose = () => {
    setStep("form");
    setForm({ name: "", subcategory: "", description: "", file: null, filePreview: "" });
    setFormError("");
    setSubmitting(false);
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    if (form.filePreview) URL.revokeObjectURL(form.filePreview);
    setForm((prev) => ({ ...prev, file, filePreview: file.type.startsWith("image/") ? URL.createObjectURL(file) : "" }));
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.name) { setFormError("Title is required."); return; }

    setSubmitting(true);
    try {
      let fileUrl = "", fileType = "", fileSize = 0;
      if (form.file) {
        fileUrl = await uploadBrandAsset(form.file, "announcement-templates");
        fileType = form.file.type;
        fileSize = form.file.size;
      }
      const created = await addAsset({
        name: form.name.trim(), category: "announcement-templates", subcategory: form.subcategory || "",
        description: form.description, file_url: fileUrl,
        thumbnail_url: form.file?.type.startsWith("image/") ? fileUrl : "",
        file_type: fileType || "text/html", file_size: fileSize,
      });
      onAssetAdded?.(created);
      setStep("success");
    } catch (err) { setFormError(err?.message || "Failed to create announcement."); }
    finally { setSubmitting(false); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-lg font-semibold">{step === "success" ? "Announcement Created" : "New Announcement"}</h2>
          <button onClick={resetAndClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>

        {step === "form" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none" placeholder="Announcement title" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none" value={form.subcategory} onChange={(e) => setForm((p) => ({ ...p, subcategory: e.target.value }))}>
                <option value="">Select type</option>
                {SUBCATEGORIES.map((s) => (<option key={s.value} value={s.value}>{s.label}</option>))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
              <RichTextEditor value={form.description} onChange={(html) => setForm((p) => ({ ...p, description: html }))} placeholder="Write the announcement details..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image <span className="font-normal text-gray-400">(optional)</span></label>
              <input ref={fileInputRef} type="file" accept="image/*" className="sr-only" onChange={handleFileChange} />
              {form.filePreview ? (
                <div className="mt-1 flex items-center gap-3">
                  <img src={form.filePreview} alt="Preview" className="h-20 w-32 rounded-md border object-contain" />
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm font-medium text-brand-700 hover:text-brand-900">Change image</button>
                </div>
              ) : (
                <button type="button" onClick={() => fileInputRef.current?.click()} className="mt-1 flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-4 py-4 text-center text-sm text-gray-500 hover:border-gray-400">
                  <span className="font-medium text-gray-700">Click to upload image</span>
                  <span className="text-xs">PNG, JPG, or WEBP</span>
                </button>
              )}
            </div>
            {formError && <p className="text-sm text-red-600">{formError}</p>}
            <button type="submit" disabled={submitting} className="w-full rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900 disabled:opacity-60">{submitting ? "Publishing..." : "Publish Announcement"}</button>
          </form>
        )}

        {step === "success" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">The announcement has been published successfully.</p>
            <button onClick={resetAndClose} className="w-full rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900">Done</button>
          </div>
        )}
      </div>
    </div>
  );
}
