# Phase 9.1 — Mobile PDP gallery space

Targeted product detail page mobile media polish.

## Changed

- Removed mobile-only extra padding around the PDP media area.
- Changed mobile PDP media panel to a square aspect ratio so square product photos use the available width properly.
- Removed the inner mobile media border; desktop keeps the neat bordered gallery box.
- Kept thumbnails below the main gallery.
- Kept fullscreen image behavior.
- Kept API-driven image variants:
  - thumbnail for thumbnails/list usage
  - medium for PDP main image
  - full for fullscreen when available

## API note

No backend API change is required if it already returns these optional fields on product and size images:

- `thumbnail_url`
- `medium_url`
- `full_url`
- `image_url`

The frontend already uses `medium_url` for the PDP main image and `full_url` for fullscreen. If these fields are missing, it falls back to `image_url`.

For best mobile performance, the backend/admin should keep returning Cloudinary URLs with transformations for each image variant.
