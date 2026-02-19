import { supabase } from "../lib/supabaseClient";

export async function fetchEmployees() {
  const { data, error } = await supabase
    .from("employees")
    .select("id, slug, name, title, email, photo_url")
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}
