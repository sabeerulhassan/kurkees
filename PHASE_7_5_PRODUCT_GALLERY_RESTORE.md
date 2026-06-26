# Phase 7.5 — Product gallery/video restore

This phase restores the product detail media behavior from the earlier API-backed product page.

## Restored behavior

- Product detail pages build a media slider from backend API data.
- If `size_youtube_id` or `default_youtube_id` exists, the YouTube video becomes the first slide.
- If the selected size has `size_images`, those images are used for the gallery.
- If the selected size has no `size_images`, the gallery falls back to `product.images`.
- Thumbnails are shown below the main media window.
- The gallery resets to the first slide when the selected jar size changes.
- Cart images use the selected size image first, then the product image fallback.

## Confirmed

`productJsonLd` was not removed. It remains in `app/products/[slug]/page.tsx` and still renders Product structured data using API product data.

## Preserved rules

- Product cards remain API-driven.
- Product detail pages remain API-driven.
- ZIP excludes `public`.
- Dev script preserved:
  `"dev": "lsof -ti:3000 | xargs kill -9 &&next dev"`
