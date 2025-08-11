import { Buffer } from "node:buffer";

export function encodeCursor(obj: { createdAt: string; id: number }) {
  const json = JSON.stringify(obj);
  return Buffer.from(json, "utf8").toString("base64");
}

export function decodeCursor(cursor: string) {
  try {
    const json = Buffer.from(cursor, "base64").toString("utf8");
    const obj = JSON.parse(json);
    if (typeof obj.createdAt === "string" && typeof obj.id === "number") {
      return obj as { createdAt: string; id: number };
    }
  } catch {}
  return null;
}

export function parseCursorParams(q: any) {
  const limitRaw = Number(q.limit ?? 20);
  const limit = isFinite(limitRaw) ? Math.max(1, Math.min(100, limitRaw)) : 20;
  const sortKey = String(q.sortKey ?? "createdAt") as "createdAt" | "id";
  const direction = String(q.direction ?? "desc").toLowerCase() as "asc" | "desc";
  const cursor = typeof q.cursor === "string" ? q.cursor : null;
  return { cursor, limit, sortKey, direction };
}
