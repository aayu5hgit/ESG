import { useState } from "react";
import { Plus } from "lucide-react";
import { useAssets } from "../hooks/useAssets";
import AssetGrid from "../components/ui/AssetGrid";
import SearchBar from "../components/ui/SearchBar";
import UploadAssetModal from "../components/ui/UploadAssetModal";
import QuickViewModal from "../components/ui/QuickViewModal";
import AdminPasswordModal from "../components/ui/AdminPasswordModal";
import { deleteAsset } from "../services/brandAssets";

export default function BrandAssetsPage() {
  const [search, setSearch] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [quickViewAsset, setQuickViewAsset] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { assets, setAssets, loading, error } = useAssets({
    category: "brand-assets",
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
          <h1 className="text-2xl font-bold text-gray-900">Brand Assets</h1>
          <p className="mt-1 text-sm text-gray-500">
            Logos, fonts, color palettes, and other brand materials.
          </p>
        </div>
        <button
          onClick={() => setUploadOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-900"
        >
          <Plus size={16} />
          Upload Asset
        </button>
      </div>

      <div className="mt-6">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className="mt-6">
        <AssetGrid
          assets={assets}
          loading={loading}
          error={error}
          onDelete={setDeleteTarget}
          onQuickView={setQuickViewAsset}
        />
      </div>

      <UploadAssetModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        defaultCategory="brand-assets"
        onAssetAdded={(asset) => setAssets((prev) => [asset, ...prev])}
      />

      <QuickViewModal
        asset={quickViewAsset}
        onClose={() => setQuickViewAsset(null)}
      />

      <AdminPasswordModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Asset"
        message="Enter the admin password to delete this asset. This action cannot be undone."
      />
    </div>
  );
}
