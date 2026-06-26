# Phase 8.2 — Collection guide product matching fix

The collection guide pages were matching recommended products only by the old static local product slugs. After products were recreated through the backend API, the new API slugs no longer matched those old values, so the Recommended Kurkees jars section could become empty even when `/products` had valid products.

## What changed

- Added `lib/collection-matching.ts`.
- Collection pages now match API products using:
  - existing configured slugs, including slug-prefix compatibility
  - product name
  - product slug
  - flavour profile
  - tags
  - ingredients
  - description and usage
- Product detail pages now use the same matching helper for related guide links.

## Examples now supported

- `sugar-salted-smooth-peanut-butter` still matches the smooth and natural/price collections.
- `salted-smooth-peanut-butter` matches smooth, sugar-free/no-added-sugar, natural and protein collections when tags/ingredients indicate no added sugar.
- `salted-crunchy-peanut-butter` matches crunchy, sugar-free/no-added-sugar, natural and protein collections.
- `chocofeda-chocolate-peanut-spread` matches the chocolate collection.

## Preserved

- Product cards remain API-driven.
- Product images remain API-driven.
- Routes were not changed.
- Notion blog was not touched.
- `public` folder is not included.
- Dev script remains: `lsof -ti:3000 | xargs kill -9 &&next dev`.
