import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import EmailSignaturesPage from "./pages/EmailSignaturesPage";
import LinkedInBannersPage from "./pages/LinkedInBannersPage";
import AnnouncementTemplatesPage from "./pages/AnnouncementTemplatesPage";
import BrandAssetsPage from "./pages/BrandAssetsPage";
import bot from "../public/bot-laptop.png";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const authConfig = useMemo(
    () => ({
      password: import.meta.env.VITE_APP_PASSWORD || "",
      storageKey: "optimite_auth_ts",
      ttlMs: 2 * 60 * 60 * 1000,
    }),
    [],
  );

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const stored = Number(localStorage.getItem(authConfig.storageKey));
    if (!stored || Number.isNaN(stored)) return;
    if (Date.now() - stored > authConfig.ttlMs) {
      localStorage.removeItem(authConfig.storageKey);
      return;
    }
    setIsAuthed(true);
  }, [authConfig.storageKey, authConfig.ttlMs]);

  const handleAuthSubmit = (event) => {
    event.preventDefault();
    if (!authConfig.password) {
      setAuthError("Password is not configured.");
      return;
    }
    if (passwordInput !== authConfig.password) {
      setAuthError("Incorrect password. Try again.");
      return;
    }
    localStorage.setItem(authConfig.storageKey, String(Date.now()));
    setIsAuthed(true);
    setAuthError("");
    setPasswordInput("");
  };

  if (!isAuthed) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 px-6">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
          <div className="mb-6 flex items-center gap-3">
            <img src={bot} alt="Optimite" className="h-12 object-contain" />
            <h2 className="text-xl font-bold">Access Required</h2>
          </div>
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="auth-password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="auth-password"
                type="password"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
              />
            </div>
            {authError ? (
              <p className="text-sm text-red-600">{authError}</p>
            ) : (
              <p className="text-xs text-gray-500">
                Access expires after 2 hours.
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
        <div className="max-w-sm rounded-lg bg-white p-6 shadow">
          <img src={bot} alt="Optimite" className="mb-4 h-24 object-contain" />
          <h2 className="mb-2 text-lg font-bold">Desktop Required!</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            The Optimite Branding Portal works best on desktop. Please switch to
            desktop mode.
          </p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="signatures" element={<EmailSignaturesPage />} />
          <Route path="linkedin-banners" element={<LinkedInBannersPage />} />
          <Route path="announcements" element={<AnnouncementTemplatesPage />} />
          <Route path="brand-assets" element={<BrandAssetsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
