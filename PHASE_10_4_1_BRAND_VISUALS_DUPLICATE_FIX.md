# Phase 10.4.1 — Brand visuals duplicate export fix

## Fixed

- Removed the duplicate older `ProductJarStack` export from `components/brand-visuals.tsx`.
- Kept the newer API-image/mobile-optimized `ProductJarStack`.

## Preserved

- API-driven product visuals from Phase 10.4.
- Mobile-optimized responsive jar stack.
- Product cards remain API-driven.
- Product detail page remains API-driven.
- Notion blog untouched.
- Routes untouched.
- ZIP excludes `public`.
- Dev script remains:
  `"dev": "lsof -ti:3000 | xargs kill -9 &&next dev"`
