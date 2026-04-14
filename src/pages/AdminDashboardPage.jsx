import { Navigate, useNavigate } from "react-router-dom";
import {
  Mail,
  Image,
  Megaphone,
  FolderOpen,
  FileSpreadsheet,
  LogOut,
  UserPlus,
} from "lucide-react";
import { useAdmin } from "../hooks/useAdmin";

const ACTIONS = [
  {
    to: "/signatures",
    icon: UserPlus,
    label: "Add Employee",
    description: "Add a new team member to the signature generator",
    color: "text-violet-600 bg-violet-100",
  },
  {
    to: "/linkedin-banners",
    icon: Image,
    label: "Manage LinkedIn Banners",
    description: "Upload or remove LinkedIn banners",
    color: "text-sky-600 bg-sky-100",
  },
  {
    to: "/announcements",
    icon: Megaphone,
    label: "Manage Announcements",
    description: "Create or remove announcement posts",
    color: "text-amber-600 bg-amber-100",
  },
  {
    to: "/google-templates",
    icon: FileSpreadsheet,
    label: "Manage Google Templates",
    description: "Add or remove Doc and Sheet templates",
    color: "text-green-600 bg-green-100",
  },
  {
    to: "/brand-assets",
    icon: FolderOpen,
    label: "Manage Brand Assets",
    description: "Upload or remove logos, fonts, and brand materials",
    color: "text-brand-700 bg-brand-700/10",
  },
];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { isAdmin, adminEmail, logout } = useAdmin();

  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to logout from admin?")) return;
    await logout();
    window.location.href = "/";
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="mt-1 text-sm text-gray-500">
            Signed in as <span className="font-medium text-gray-700">{adminEmail}</span>
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ACTIONS.map((action) => (
          <button
            key={action.to}
            onClick={() => navigate(action.to)}
            className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 text-left transition-shadow hover:shadow-md"
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${action.color}`}>
              <action.icon size={20} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{action.label}</h3>
              <p className="mt-0.5 text-xs text-gray-500">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
