import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { useAdmin } from "../hooks/useAdmin";
import { supabase } from "../lib/supabaseClient";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { isAdmin, login } = useAdmin();
  const adminPassword = useMemo(
    () => import.meta.env.VITE_ADD_EMPLOYEE_PASSWORD || "",
    [],
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!adminPassword) {
      setError("Admin password is not configured.");
      return;
    }
    if (password !== adminPassword) {
      setError("Incorrect password.");
      return;
    }

    setLoading(true);
    try {
      // Verify email exists in employees table
      const { data, error: fetchError } = await supabase
        .from("employees")
        .select("id")
        .eq("email", email.trim().toLowerCase())
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (!data) {
        setError("This email is not registered as an employee.");
        setLoading(false);
        return;
      }

      await login(email.trim().toLowerCase());
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-900/10">
            <Shield size={24} className="text-brand-900" />
          </div>
          <h1 className="text-lg font-bold text-gray-900">Admin Login</h1>
          <p className="mt-1 text-center text-xs text-gray-500">
            Sign in to manage portal assets and employees.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-700 focus:outline-none"
              placeholder="you@optimite.net"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-700 focus:outline-none"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-900 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
