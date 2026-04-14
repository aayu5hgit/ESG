import { Download, X, Calendar, HardDrive, FileType } from "lucide-react";

function formatFileSize(bytes) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const CATEGORY_LABELS = {
  "linkedin-banners": "LinkedIn Banner",
  "announcement-templates": "Announcement Template",
  "brand-assets": "Brand Asset",
};

const SUBCATEGORY_LABELS = {
  "probation-completion": "Probation Completion",
  hiring: "Hiring",
  "news-updates": "News & Updates",
};

export default function QuickViewModal({ asset, onClose }) {
  if (!asset) return null;

  const preview = asset.thumbnail_url || asset.file_url;
  const isImage = asset.file_type?.startsWith("image/");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left — Image preview */}
        <div className="flex w-3/5 items-center justify-center bg-gray-100 p-4">
          {isImage ? (
            <img
              src={preview}
              alt={asset.name}
              className="max-h-[70vh] w-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <FileType size={48} />
              <span className="text-sm font-medium">
                {asset.file_type?.split("/")[1]?.toUpperCase() || "FILE"}
              </span>
            </div>
          )}
        </div>

        {/* Right — Details */}
        <div className="flex w-2/5 flex-col p-6">
          <div className="flex items-start justify-between">
            <h2 className="text-lg font-bold text-gray-900">{asset.name}</h2>
            <button
              onClick={onClose}
              className="ml-2 shrink-0 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          </div>

          {asset.description && (
            <div
              className="mt-2 text-sm leading-relaxed text-gray-600 [&_a]:text-brand-700 [&_a]:underline [&_b]:font-semibold [&_i]:italic [&_li]:ml-4 [&_ol]:list-decimal [&_ol]:pl-1 [&_ul]:list-disc [&_ul]:pl-1"
              dangerouslySetInnerHTML={{ __html: asset.description }}
            />
          )}

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1.5 text-gray-400">
                <FileType size={14} />
              </span>
              <div>
                <p className="text-xs text-gray-400">Category</p>
                <p className="font-medium text-gray-700">
                  {CATEGORY_LABELS[asset.category] || asset.category}
                  {asset.subcategory &&
                    ` — ${SUBCATEGORY_LABELS[asset.subcategory] || asset.subcategory}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1.5 text-gray-400">
                <HardDrive size={14} />
              </span>
              <div>
                <p className="text-xs text-gray-400">File size</p>
                <p className="font-medium text-gray-700">
                  {formatFileSize(asset.file_size)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1.5 text-gray-400">
                <Calendar size={14} />
              </span>
              <div>
                <p className="text-xs text-gray-400">Uploaded</p>
                <p className="font-medium text-gray-700">
                  {formatDate(asset.created_at)}
                </p>
              </div>
            </div>

            {asset.file_type && (
              <div className="flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1.5 text-gray-400">
                  <FileType size={14} />
                </span>
                <div>
                  <p className="text-xs text-gray-400">File type</p>
                  <p className="font-medium text-gray-700">{asset.file_type}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-auto pt-6">
            <a
              href={asset.file_url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-900"
            >
              <Download size={16} />
              Download Asset
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
