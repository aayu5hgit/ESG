import { useState } from "react";
import { Plus } from "lucide-react";
import { useAssets } from "../hooks/useAssets";
import AssetGrid from "../components/ui/AssetGrid";
import SearchBar from "../components/ui/SearchBar";
import UploadAssetModal from "../components/ui/UploadAssetModal";
import { deleteAsset } from "../services/brandAssets";

const TABS = [
  { value: "", label: "All" },
  { value: "probation-completion", label: "Probation Completion" },
  { value: "hiring", label: "Hiring" },
  { value: "news-updates", label: "News & Updates" },
];

export default function AnnouncementTemplatesPage() {
  const [activeTab, setActiveTab] = useState("");
  const [search, setSearch] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);

  const { assets, setAssets, loading, error } = useAssets({
    category: "announcement-templates",
    subcategory: activeTab || undefined,
    search: search || undefined,
  });

  const handleDelete = async (id) => {
    if (!confirm("Delete this asset?")) return;
    try {
      await deleteAsset(id);
      setAssets((prev) => prev.filter((a) => a.id !== id));
    } catch {}
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Announcement Templates
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            LinkedIn announcement templates for team milestones and updates.
          </p>
        </div>
        <button
          onClick={() => setUploadOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-900"
        >
          <Plus size={16} />
          Upload Template
        </button>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex overflow-hidden rounded-lg border border-gray-200 text-sm font-medium">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 transition-colors ${
                activeTab === tab.value
                  ? "bg-brand-700 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              } ${tab.value ? "border-l border-gray-200" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className="mt-6">
        <AssetGrid
          assets={assets}
          loading={loading}
          error={error}
          onDelete={handleDelete}
        />
      </div>

      <UploadAssetModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        defaultCategory="announcement-templates"
        onAssetAdded={(asset) => setAssets((prev) => [asset, ...prev])}
      />
    </div>
  );
}
