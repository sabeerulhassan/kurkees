# Phase 7.6 — Clean product cards and PDP media cleanup

## What changed

- Product cards were simplified into clean ecommerce cards with a plain border and a large full-card product image area.
- Removed the decorative product-card backgrounds, floating shapes, heavy shadows, and colorful badge overload.
- Product card images remain API-driven and use API thumbnails first.
- Product detail page now uses a clean medium-size gallery image instead of a highly decorated hero panel.
- Product detail page includes a fullscreen image button for image slides.
- Thumbnails are used for gallery navigation.
- Fullscreen mode uses full-size API image URLs when available.
- Size selection was simplified into a neat grid of compact buttons.
- Product JSON-LD remains in `app/products/[slug]/page.tsx`.

## API media contract recommended

For best results, update the backend so product image records and size image records can expose three image sizes:

```json
{
  "image_url": "https://.../default-or-medium.jpg",
  "thumbnail_url": "https://.../thumbnail-400.jpg",
  "medium_url": "https://.../medium-900.jpg",
  "full_url": "https://.../full-2000.jpg",
  "alt_text": "Sugar Salted Smooth Peanut Butter 340g jar",
  "position": 0
}
```

The frontend is backward-compatible with the current `image_url` field, but these extra fields will make list cards faster and fullscreen PDP images sharper.

## Product API expectations

- `GET /api/products` should return product list data with at least one usable image per product for product cards.
- `GET /api/products/:slug` should return product detail data with `images`, `sizes`, optional `default_youtube_id`, and optional `size_youtube_id`.
- Each size can return `size_images` so selecting 220g / 340g / 450g swaps the gallery to the correct jar.

## Preserved rules

- Product cards use API data and API images.
- Product detail pages use API data and API media.
- ZIP excludes `public`.
- Dev script preserved:
  `"dev": "lsof -ti:3000 | xargs kill -9 &&next dev"`
