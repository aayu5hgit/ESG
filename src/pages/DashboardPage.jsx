import { useEffect, useState } from "react";
import { Mail, Image, Megaphone, FolderOpen, FileSpreadsheet } from "lucide-react";
import CategoryCard from "../components/ui/CategoryCard";
import AssetGrid from "../components/ui/AssetGrid";
import QuickViewModal from "../components/ui/QuickViewModal";
import { fetchAssetCounts, fetchAssets } from "../services/brandAssets";

const CATEGORIES = [
  {
    to: "/signatures",
    icon: Mail,
    label: "Email Signatures",
    description: "Generate and copy your email signature",
    countKey: null,
  },
  {
    to: "/linkedin-banners",
    icon: Image,
    label: "LinkedIn Banners",
    description: "Profile and cover banners",
    countKey: "linkedin-banners",
  },
  {
    to: "/announcements",
    icon: Megaphone,
    label: "Announcements",
    description: "Templates for team announcements",
    countKey: "announcement-templates",
  },
  {
    to: "/google-templates",
    icon: FileSpreadsheet,
    label: "Google Templates",
    description: "Doc and Sheet templates",
    countKey: "google-templates",
  },
  {
    to: "/brand-assets",
    icon: FolderOpen,
    label: "Brand Assets",
    description: "Logos, fonts, and brand materials",
    countKey: "brand-assets",
  },
];

export default function DashboardPage() {
  const [counts, setCounts] = useState({});
  const [recentAssets, setRecentAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickViewAsset, setQuickViewAsset] = useState(null);

  useEffect(() => {
    let active = true;

    Promise.all([fetchAssetCounts(), fetchAssets()])
      .then(([countsData, assetsData]) => {
        if (active) {
          setCounts(countsData);
          setRecentAssets(assetsData.slice(0, 6));
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Branding Portal</h1>
      <p className="mt-1 text-sm text-gray-500">
        Access and download branded assets for Optimite.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.to}
            to={cat.to}
            icon={cat.icon}
            label={cat.label}
            count={cat.countKey ? (counts[cat.countKey] ?? 0) : "—"}
            description={cat.description}
          />
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900">Recent Assets</h2>
        <div className="mt-4">
          <AssetGrid
            assets={recentAssets}
            loading={loading}
            error=""
            onQuickView={setQuickViewAsset}
          />
        </div>
      </div>

      <QuickViewModal
        asset={quickViewAsset}
        onClose={() => setQuickViewAsset(null)}
      />
    </div>
  );
}
