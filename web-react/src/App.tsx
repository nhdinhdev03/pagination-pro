import React from "react";
import { createRoot } from "react-dom/client";
import { useCursorPagination } from "./useCursorPagination";

function App() {
  const { items, loadMore, loading, hasNext, error } = useCursorPagination("/api/items-cursor", 15);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
      <h1>Pagination Pro — Cursor Demo</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {items.map((it: any) => (
          <li key={`${it.createdAt}-${it.id}`}>{it.name} — {new Date(it.createdAt).toLocaleString()}</li>
        ))}
      </ul>
      <button onClick={loadMore} disabled={!hasNext || loading}>
        {loading ? "Loading..." : hasNext ? "Load more" : "No more"}
      </button>
      <p style={{opacity:.7, marginTop:12}}>Note: add a dev proxy to forward <code>/api</code> to your backend.</p>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
