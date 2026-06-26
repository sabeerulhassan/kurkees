# Phase 8.3 — PDP size selector polish

This is a targeted UI-only fix.

## Changed

- Product detail page size selector is now compact.
- Size buttons show only the jar size, not the price.
- The selected size is clearly highlighted.
- Price remains in the dedicated "Price per jar" section below the selector.
- API product data, gallery, fullscreen image view, cart, checkout, routes, Notion blog, and product cards were not changed.

## Preserved

- ZIP excludes `public`.
- Product cards remain API-driven.
- Dev script remains:
  `"dev": "lsof -ti:3000 | xargs kill -9 &&next dev"`
