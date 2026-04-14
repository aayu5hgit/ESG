import { supabase } from "../lib/supabaseClient";

export async function logAdminAccess({ email, action, details = "" }) {
  try {
    await supabase
      .from("admin_logs")
      .insert([{ email, action, details }]);
  } catch {
    // Silent fail — logging should not block user actions
  }
}
