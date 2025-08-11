import { useEffect, useState } from "react";

export function useCursorPagination(endpoint: string, limit = 20) {
  const [items, setItems] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadMore() {
    if (!hasNext || loading) return;
    setLoading(true);
    setError(null);
    try {
      const url = new URL(endpoint, window.location.origin);
      url.searchParams.set("limit", String(limit));
      if (cursor) url.searchParams.set("cursor", cursor);
      const res = await fetch(url.toString());
      const json = await res.json();
      setItems(prev => [...prev, ...json.data]);
      setCursor(json.nextCursor ?? null);
      setHasNext(!!json.nextCursor);
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadMore(); }, []);
  return { items, loadMore, loading, hasNext, error };
}
