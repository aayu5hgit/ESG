import { useState } from "react";
import { Plus, FolderOpen } from "lucide-react";
import { useAssets } from "../hooks/useAssets";
import TemplateCard from "../components/ui/TemplateCard";
import SearchBar from "../components/ui/SearchBar";
import AddTemplateModal from "../components/ui/AddTemplateModal";
import AdminPasswordModal from "../components/ui/AdminPasswordModal";
import { deleteAsset } from "../services/brandAssets";

const TABS = [
  { value: "", label: "All" },
  { value: "google-doc", label: "Google Docs" },
  { value: "google-sheet", label: "Google Sheets" },
];

export default function GoogleTemplatesPage() {
  const [activeTab, setActiveTab] = useState("");
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { assets, setAssets, loading, error } = useAssets({
    category: "google-templates",
    subcategory: activeTab || undefined,
    search: search || undefined,
  });

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteAsset(deleteTarget);
      setAssets((prev) => prev.filter((a) => a.id !== deleteTarget));
    } catch {}
    setDeleteTarget(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Google Templates</h1>
          <p className="mt-1 text-sm text-gray-500">
            Google Doc and Sheet templates for team use.
          </p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-900"
        >
          <Plus size={16} />
          Add Template
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
        <SearchBar value={search} onChange={setSearch} placeholder="Search templates..." />
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="space-y-2 p-4">
                  <div className="h-3 w-16 rounded bg-gray-200" />
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        ) : !assets.length ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center">
            <FolderOpen className="mx-auto h-10 w-10 text-gray-300" />
            <p className="mt-3 text-sm font-medium text-gray-500">No templates yet</p>
            <p className="mt-1 text-xs text-gray-400">
              Add your first Google Doc or Sheet template.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {assets.map((asset) => (
              <TemplateCard
                key={asset.id}
                asset={asset}
                onDelete={setDeleteTarget}
              />
            ))}
          </div>
        )}
      </div>

      <AddTemplateModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onAssetAdded={(asset) => setAssets((prev) => [asset, ...prev])}
      />

      <AdminPasswordModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Template"
        message="Enter the admin password to delete this template."
      />
    </div>
  );
}
