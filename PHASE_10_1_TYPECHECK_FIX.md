# Phase 10.1 — TypeScript build fix

Fixed strict TypeScript callback typing errors reported during `next build`.

## Changed

- `lib/api-products.ts`
  - Added explicit callback types for product image sorting.
  - Added explicit callback types for size sorting.
- `components/products-client.tsx`
  - Added explicit callback types for filter/sort helper sorting.

## Preserved

- Product cards remain API-driven.
- Product images remain API-driven.
- Routes unchanged.
- Notion blog untouched.
- ZIP excludes `public`.
- Dev script remains:
  `"dev": "lsof -ti:3000 | xargs kill -9 &&next dev"`
