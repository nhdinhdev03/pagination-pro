import { Buffer } from "node:buffer";
export function encodeCursor(obj) {
    const json = JSON.stringify(obj);
    return Buffer.from(json, "utf8").toString("base64");
}
export function decodeCursor(cursor) {
    try {
        const json = Buffer.from(cursor, "base64").toString("utf8");
        const obj = JSON.parse(json);
        if (typeof obj.createdAt === "string" && typeof obj.id === "number") {
            return obj;
        }
    }
    catch { }
    return null;
}
export function parseCursorParams(q) {
    const limitRaw = Number(q.limit ?? 20);
    const limit = isFinite(limitRaw) ? Math.max(1, Math.min(100, limitRaw)) : 20;
    const sortKey = String(q.sortKey ?? "createdAt");
    const direction = String(q.direction ?? "desc").toLowerCase();
    const cursor = typeof q.cursor === "string" ? q.cursor : null;
    return { cursor, limit, sortKey, direction };
}
