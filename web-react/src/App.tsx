// import React from "react";
// import { createRoot } from "react-dom/client";
// import { usePagePagination } from "./useCursorPagination";

// function App() {
//   const { items, loadMore, loading, hasNext, error } =
//     usePagePagination("/api/items", 15);

//   return (
//     <div style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
//       <h1>Pagination Pro — Page Demo</h1>
//       {error && <div style={{ color: "red" }}>{error}</div>}
//       <ul>
//         {items.map((it: any) => (
//           <li key={`${it.createdAt}-${it.id}`}>
//             {it.name} — {new Date(it.createdAt).toLocaleString()}
//           </li>
//         ))}
//       </ul>
//       <button onClick={loadMore} disabled={!hasNext || loading}>
//         {loading ? "Loading..." : hasNext ? "Load more" : "No more"}
//       </button>
//     </div>
//   );
// }

// const root = createRoot(document.getElementById("root")!);
// root.render(<App />);


import React from "react";
import { createRoot } from "react-dom/client";
import { usePagePagination } from "./useCursorPagination";

function App() {
  const { items, loadMore, loading, hasNext, error } =
    usePagePagination("/api/items", 15);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
      <h1>Pagination Pro — Page Demo (Spring)</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {items.map((it: any) => (
          <li key={`${it.createdAt}-${it.id}`}>
            {it.name} — {new Date(it.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
      <button onClick={loadMore} disabled={!hasNext || loading}>
        {loading ? "Loading..." : hasNext ? "Load more" : "No more"}
      </button>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
