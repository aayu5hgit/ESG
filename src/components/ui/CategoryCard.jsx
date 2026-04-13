import { useNavigate } from "react-router-dom";

export default function CategoryCard({ to, icon: Icon, label, count, description }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="flex flex-col items-start rounded-xl border border-gray-200 bg-white p-6 text-left transition-shadow hover:shadow-md"
    >
      <Icon className="mb-3 h-8 w-8 text-brand-700" />
      <h3 className="text-sm font-semibold text-gray-900">{label}</h3>
      <p className="mt-1 text-2xl font-bold text-brand-900">{count ?? "—"}</p>
      {description && (
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      )}
    </button>
  );
}
