# Phase 8.1 — Production copy cleanup

This patch removes developer-facing fallback text from customer-visible pages.

## Fixed

- Removed customer-visible API/setup messages from the homepage product shelf fallback.
- Removed customer-visible API/setup messages from collection page product fallbacks.
- Replaced technical image fallback copy with production-safe wording.
- Replaced design/SEO-internal homepage copy with customer-facing copy.

## Preserved

- Product cards remain API-driven.
- Product detail gallery remains API-driven.
- Notion blog remains unchanged.
- Routes remain unchanged.
- `public` folder is not included.
- Dev script remains:
  `"dev": "lsof -ti:3000 | xargs kill -9 &&next dev"`
