import { Trash2, Calendar, FileText, Sheet, ExternalLink } from "lucide-react";

const TYPE_CONFIG = {
  "google-doc": {
    label: "Doc",
    color: "bg-blue-100 text-blue-700",
    icon: FileText,
    iconColor: "text-blue-600",
  },
  "google-sheet": {
    label: "Sheet",
    color: "bg-green-100 text-green-700",
    icon: Sheet,
    iconColor: "text-green-600",
  },
};

function extractFileId(url) {
  const match = url?.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match?.[1] || null;
}

function getEmbedUrl(url, subcategory) {
  const fileId = extractFileId(url);
  if (!fileId) return null;
  if (subcategory === "google-sheet") {
    return `https://docs.google.com/spreadsheets/d/${fileId}/preview`;
  }
  return `https://docs.google.com/document/d/${fileId}/preview`;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function TemplateCard({ asset, onDelete }) {
  const config = TYPE_CONFIG[asset.subcategory] || TYPE_CONFIG["google-doc"];
  const TypeIcon = config.icon;
  const embedUrl = getEmbedUrl(asset.file_url, asset.subcategory);

  return (
    <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Preview area */}
      <a
        href={asset.file_url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={asset.name}
              className="h-full w-full scale-[0.5] origin-top-left pointer-events-none"
              style={{ width: "200%", height: "200%" }}
              sandbox="allow-scripts allow-same-origin"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <TypeIcon size={40} className={config.iconColor} />
              <span className="text-xs text-gray-400">
                {config.label} Template
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
            <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-700 opacity-0 shadow transition-opacity group-hover:opacity-100">
              <ExternalLink size={13} />
              Open in Google {config.label === "Doc" ? "Docs" : "Sheets"}
            </span>
          </div>
        </div>
      </a>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${config.color}`}
            >
              <TypeIcon size={11} />
              {config.label}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar size={11} />
              {formatDate(asset.created_at)}
            </span>
          </div>
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(asset.id);
              }}
              className="rounded-md p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>

        <a
          href={asset.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block text-sm font-semibold text-gray-900 hover:text-brand-700"
        >
          {asset.name}
        </a>

        {asset.description && (
          <p className="mt-1 truncate text-xs text-gray-500">
            {asset.description}
          </p>
        )}
      </div>
    </div>
  );
}
