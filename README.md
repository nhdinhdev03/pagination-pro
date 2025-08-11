# Pagination Pro

A professional, framework-agnostic pagination toolkit supporting **page-based** and **cursor-based** strategies. Includes server utilities (Node.js, Spring Boot) and UI hooks (React).

## Features
- Page-based: `?page=1&limit=20`
- Cursor-based (stable & scalable): `?cursor=<opaque>&limit=20`
- Consistent response schema & error handling
- Sorting & safe filters
- Type-safe helpers (TS) + Java utilities
- Ready-to-run examples (Express, Spring, React)

## API Design

### Query Params
- `page` (number, >=1), `limit` (1–100)
- `cursor` (opaque string, optional for cursor mode)
- `sort` (e.g. `createdAt:desc`)
- `filter[...]` (whitelisted keys)

### Response (page-based)
```json
{
  "data": [/* items */],
  "page": 1,
  "limit": 20,
  "total": 240,
  "totalPages": 12
}
