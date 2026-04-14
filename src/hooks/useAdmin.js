import { useCallback, useEffect, useState } from "react";
import { logAdminAccess } from "../services/adminLogs";

const STORAGE_KEY = "optimite_admin";
const TTL_MS = 4 * 60 * 60 * 1000; // 4 hours

function readSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (!session?.email || !session?.ts) return null;
    if (Date.now() - session.ts > TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function useAdmin() {
  const [session, setSession] = useState(() => readSession());

  useEffect(() => {
    // Re-check on focus (e.g. user opened another tab and logged out)
    const handleFocus = () => setSession(readSession());
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const isAdmin = !!session;
  const adminEmail = session?.email || "";

  const login = useCallback(async (email) => {
    const newSession = { email, ts: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
    setSession(newSession);
    await logAdminAccess({ email, action: "login" });
  }, []);

  const logout = useCallback(async () => {
    const email = session?.email || "unknown";
    localStorage.removeItem(STORAGE_KEY);
    setSession(null);
    await logAdminAccess({ email, action: "logout" });
  }, [session]);

  return { isAdmin, adminEmail, login, logout };
}
