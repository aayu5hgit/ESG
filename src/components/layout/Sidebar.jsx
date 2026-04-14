import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Mail,
  Image,
  Megaphone,
  FolderOpen,
  FileSpreadsheet,
  Shield,
  LogOut,
} from "lucide-react";
import { useAdmin } from "../../hooks/useAdmin";
import LogoutModal from "../ui/LogoutModal";
import logo from "../../../public/OP-Logo-B.png";

const NAV_ITEMS = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/signatures", icon: Mail, label: "Email Signatures" },
  { to: "/linkedin-banners", icon: Image, label: "LinkedIn Banners" },
  { to: "/announcements", icon: Megaphone, label: "Announcements" },
  { to: "/google-templates", icon: FileSpreadsheet, label: "Google Templates" },
  { to: "/brand-assets", icon: FolderOpen, label: "Brand Assets" },
];

export default function Sidebar() {
  const { isAdmin, adminEmail, logout } = useAdmin();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="px-5 pt-6 pb-8">
        <img src={logo} alt="Optimite" className="h-7 object-contain" />
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-900/10 text-brand-900"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-200 px-3 py-3">
        {isAdmin ? (
          <div className="space-y-1">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-900/10 text-brand-900"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              <div className="relative">
                <Shield size={18} />
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-green-500" />
              </div>
              Admin
            </NavLink>
            <button
              onClick={() => setLogoutOpen(true)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <LogOut size={16} />
              <span className="truncate text-xs">{adminEmail}</span>
            </button>
          </div>
        ) : (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-900/10 text-brand-900"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }`
            }
          >
            <Shield size={18} />
            Admin Login
          </NavLink>
        )}
      </div>

      <div className="border-t border-gray-200 px-5 py-3">
        <p className="text-xs text-gray-400">Optimite Branding Portal</p>
      </div>

      <LogoutModal
        isOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
        email={adminEmail}
      />
    </aside>
  );
}
