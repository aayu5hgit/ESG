import { Trash2, Calendar } from "lucide-react";
import ReactionBar from "./ReactionBar";

const SUBCATEGORY_LABELS = {
  "probation-completion": "Probation Completion",
  hiring: "Hiring",
  "news-updates": "News & Updates",
};

const SUBCATEGORY_COLORS = {
  "probation-completion": "bg-purple-100 text-purple-700",
  hiring: "bg-blue-100 text-blue-700",
  "news-updates": "bg-amber-100 text-amber-700",
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AnnouncementCard({ asset, onDelete, onQuickView }) {
  const preview = asset.thumbnail_url || asset.file_url;
  const isImage = asset.file_type?.startsWith("image/");
  const badge = asset.subcategory
    ? SUBCATEGORY_LABELS[asset.subcategory] || asset.subcategory
    : null;
  const badgeColor =
    SUBCATEGORY_COLORS[asset.subcategory] || "bg-gray-100 text-gray-600";

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image */}
      {isImage && (
        <div
          className="flex cursor-pointer items-center justify-center overflow-hidden bg-gray-50"
          onClick={() => onQuickView?.(asset)}
        >
          <img
            src={preview}
            alt={asset.name}
            className="max-h-[500px] w-full object-contain"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Header: badge + date + delete */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {badge && (
              <span
                className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeColor}`}
              >
                {badge}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar size={12} />
              {formatDate(asset.created_at)}
            </span>
          </div>
          {onDelete && (
            <button
              onClick={() => onDelete(asset.id)}
              className="rounded-md p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-3 text-base font-semibold text-gray-900">
          {asset.name}
        </h3>

        {/* Rich text description */}
        {asset.description && (
          <div
            className="mt-2 text-sm leading-relaxed text-gray-600 [&_a]:text-brand-700 [&_a]:underline [&_b]:font-semibold [&_i]:italic [&_li]:ml-4 [&_ol]:list-decimal [&_ol]:pl-1 [&_ul]:list-disc [&_ul]:pl-1"
            dangerouslySetInnerHTML={{ __html: asset.description }}
          />
        )}

        {/* Reactions */}
        <div className="mt-4 border-t border-gray-100 pt-3">
          <ReactionBar
            assetId={asset.id}
            initialReactions={asset.reactions || {}}
          />
        </div>
      </div>
    </div>
  );
}
