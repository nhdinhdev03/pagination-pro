// Generate mock items
const now = Date.now();
export const items = Array.from({ length: 250 }).map((_, i) => ({
    id: i + 1,
    name: `Item #${i + 1}`,
    createdAt: new Date(now - i * 60000).toISOString() // 1 min apart
}));
export async function findManyAndCount(opts) {
    const { page, limit, sort } = opts;
    const [key, dir] = (sort || "createdAt:desc").split(":");
    const sorted = [...items].sort((a, b) => {
        const av = a[key];
        const bv = b[key];
        if (av === bv)
            return 0;
        const cmp = av > bv ? 1 : -1;
        return dir?.toLowerCase() === "desc" ? -cmp : cmp;
    });
    const start = (page - 1) * limit;
    const slice = sorted.slice(start, start + limit);
    return [slice, items.length];
}
export async function findPageByCursor(opts) {
    const { after, limit, sortKey, direction } = opts;
    const sorted = [...items].sort((a, b) => {
        const key = sortKey;
        if (a[key] === b[key])
            return direction === "desc" ? b.id - a.id : a.id - b.id;
        const cmp = (a[key] > b[key]) ? 1 : -1;
        return direction === "desc" ? -cmp : cmp;
    });
    let startIdx = 0;
    if (after) {
        startIdx = sorted.findIndex(it => it.createdAt === after.createdAt && it.id === after.id);
        if (startIdx >= 0)
            startIdx += 1;
    }
    return sorted.slice(startIdx, startIdx + limit);
}
