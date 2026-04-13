import { useEffect, useState } from "react";
import { fetchAssets } from "../services/brandAssets";

export function useAssets({ category, subcategory, search } = {}) {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    fetchAssets({ category, subcategory, search })
      .then((data) => {
        if (active) setAssets(data);
      })
      .catch((err) => {
        if (active) setError(err?.message || "Failed to load assets.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [category, subcategory, search]);

  return { assets, setAssets, loading, error };
}
