export function parsePageParams(q) {
    let page = Number(q.page ?? 1);
    let limit = Number(q.limit ?? 20);
    const sort = String(q.sort ?? "createdAt:desc");
    if (!Number.isFinite(page) || page < 1)
        page = 1;
    if (!Number.isFinite(limit) || limit < 1)
        limit = 20;
    if (limit > 100)
        limit = 100;
    return { page, limit, sort };
}
