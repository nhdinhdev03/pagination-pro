import { useEffect, useState } from "react";

export function usePagePagination(endpoint: string, limit = 20) {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadMore() {
    if (!hasNext || loading) return;
    setLoading(true); setError(null);
    try {
      const url = new URL(endpoint, window.location.origin);
      url.searchParams.set("page", String(page));
      url.searchParams.set("limit", String(limit));
      url.searchParams.set("sort", "createdAt:DESC");
      const res = await fetch(url.toString());
      const json = await res.json();
      setItems(prev => [...prev, ...json.data]);
      const totalPages = Number(json.totalPages ?? 0);
      setHasNext(page < totalPages);
      setPage(p => p + 1);
    } catch (e:any) {
      setError(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadMore(); }, []);
  return { items, loadMore, loading, hasNext, error };
}
