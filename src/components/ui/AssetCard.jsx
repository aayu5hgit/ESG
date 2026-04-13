import { Download, Trash2 } from "lucide-react";

function formatFileSize(bytes) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AssetCard({ asset, onDelete }) {
  const preview = asset.thumbnail_url || asset.file_url;
  const isImage = asset.file_type?.startsWith("image/");

  return (
    <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex aspect-video items-center justify-center overflow-hidden bg-gray-100">
        {isImage ? (
          <img
            src={preview}
            alt={asset.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-1 text-gray-400">
            <span className="text-2xl">
              {asset.file_type?.split("/")[1]?.toUpperCase() || "FILE"}
            </span>
          </div>
        )}
      </div>

      <div className="p-3">
        <p className="truncate text-sm font-medium text-gray-900">
          {asset.name}
        </p>
        {asset.description && (
          <p className="mt-0.5 truncate text-xs text-gray-500">
            {asset.description}
          </p>
        )}
        <div className="mt-0.5 text-xs text-gray-400">
          {formatFileSize(asset.file_size)}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <a
            href={asset.file_url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-700 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-900"
          >
            <Download size={13} />
            Download
          </a>
          {onDelete && (
            <button
              onClick={() => onDelete(asset.id)}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
