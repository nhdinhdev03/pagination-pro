import express from "express";
import { parsePageParams } from "./lib/page-params.js";
import { parseCursorParams, encodeCursor, decodeCursor } from "./lib/cursor.js";
import { findManyAndCount, findPageByCursor } from "./db/mock.js";

const app = express();

app.get("/health", (_, res) => res.json({ ok: true }));

app.get("/api/items", async (req, res) => {
  const { page, limit, sort } = parsePageParams(req.query);
  const [data, total] = await findManyAndCount({ page, limit, sort });
  res.json({
    data,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit)
  });
});

app.get("/api/items-cursor", async (req, res) => {
  const { cursor, limit, sortKey, direction } = parseCursorParams(req.query);
  const after = cursor ? decodeCursor(cursor) : null;
  const data = await findPageByCursor({ after, limit, sortKey, direction });
  const next = data.length === limit ? encodeCursor({
    createdAt: data[data.length - 1].createdAt,
    id: data[data.length - 1].id
  }) : null;

  res.json({
    data,
    limit,
    nextCursor: next,
    hasNext: !!next
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Node server on :${PORT}`));
