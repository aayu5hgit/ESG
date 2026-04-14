import { useState } from "react";
import { Plus, FolderOpen } from "lucide-react";
import { useAdmin } from "../hooks/useAdmin";
import { useAssets } from "../hooks/useAssets";
import AnnouncementCard from "../components/ui/AnnouncementCard";
import SearchBar from "../components/ui/SearchBar";
import UploadAnnouncementModal from "../components/ui/UploadAnnouncementModal";
import QuickViewModal from "../components/ui/QuickViewModal";
import DeleteConfirmModal from "../components/ui/DeleteConfirmModal";
import { deleteAsset } from "../services/brandAssets";

const TABS = [
  { value: "", label: "All" },
  { value: "probation-completion", label: "Probation Completion" },
  { value: "hiring", label: "Hiring" },
  { value: "news-updates", label: "News & Updates" },
];

export default function AnnouncementTemplatesPage() {
  const { isAdmin } = useAdmin();
  const [activeTab, setActiveTab] = useState("");
  const [search, setSearch] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [quickViewAsset, setQuickViewAsset] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { assets, setAssets, loading, error } = useAssets({ category: "announcement-templates", subcategory: activeTab || undefined, search: search || undefined });

  const deleteTargetAsset = assets.find((a) => a.id === deleteTarget);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try { await deleteAsset(deleteTarget); setAssets((prev) => prev.filter((a) => a.id !== deleteTarget)); } catch {}
    setDeleteTarget(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="mt-1 text-sm text-gray-500">Templates and posts for team milestones, hiring, and updates.</p>
        </div>
        {isAdmin && (
          <button onClick={() => setUploadOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-900">
            <Plus size={16} /> New Announcement
          </button>
        )}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <div className="flex overflow-hidden rounded-lg border border-gray-200 text-sm font-medium">
          {TABS.map((tab) => (
            <button key={tab.value} onClick={() => setActiveTab(tab.value)} className={`px-4 py-2 transition-colors ${activeTab === tab.value ? "bg-brand-700 text-white" : "bg-white text-gray-600 hover:bg-gray-50"} ${tab.value ? "border-l border-gray-200" : ""}`}>{tab.label}</button>
          ))}
        </div>
        <SearchBar value={search} onChange={setSearch} placeholder="Search announcements..." />
      </div>
      <div className="mt-6">
        {loading ? (
          <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => (<div key={i} className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white"><div className="h-48 bg-gray-200" /><div className="space-y-3 p-5"><div className="h-3 w-20 rounded bg-gray-200" /><div className="h-5 w-2/3 rounded bg-gray-200" /><div className="h-3 w-full rounded bg-gray-200" /></div></div>))}</div>
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center"><p className="text-sm text-red-600">{error}</p></div>
        ) : !assets.length ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center"><FolderOpen className="mx-auto h-10 w-10 text-gray-300" /><p className="mt-3 text-sm font-medium text-gray-500">No announcements yet</p></div>
        ) : (
          <div className="mx-auto max-w-2xl space-y-5">
            {assets.map((asset) => (<AnnouncementCard key={asset.id} asset={asset} onDelete={isAdmin ? setDeleteTarget : undefined} onQuickView={setQuickViewAsset} />))}
          </div>
        )}
      </div>
      <UploadAnnouncementModal isOpen={uploadOpen} onClose={() => setUploadOpen(false)} onAssetAdded={(asset) => setAssets((prev) => [asset, ...prev])} />
      <QuickViewModal asset={quickViewAsset} onClose={() => setQuickViewAsset(null)} />
      <DeleteConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={confirmDelete} assetName={deleteTargetAsset?.name} />
    </div>
  );
}
