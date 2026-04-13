import { supabase } from "../lib/supabaseClient";

const BUCKET = "brand-assets";

export async function fetchAssets({ category, subcategory, search } = {}) {
  let query = supabase
    .from("brand_assets")
    .select("*")
    .order("created_at", { ascending: false });

  if (category) query = query.eq("category", category);
  if (subcategory) query = query.eq("subcategory", subcategory);
  if (search) query = query.ilike("name", `%${search}%`);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function fetchAssetCounts() {
  const { data, error } = await supabase
    .from("brand_assets")
    .select("category");
  if (error) throw error;
  const counts = {};
  (data ?? []).forEach((row) => {
    counts[row.category] = (counts[row.category] || 0) + 1;
  });
  return counts;
}

export async function uploadBrandAsset(file, category) {
  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const safeName = file.name
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, "-");
  const path = `${category}/${Date.now()}-${safeName}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type,
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl || null;
}

export async function addAsset(payload) {
  const { data, error } = await supabase
    .from("brand_assets")
    .insert([payload])
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function deleteAsset(id) {
  const { error } = await supabase.from("brand_assets").delete().eq("id", id);
  if (error) throw error;
}
