# Kurkees Production QA Checklist

Use this before deploying a new website build.

## Required commands

```bash
rm -rf .next
npm run validate:routes
npm run validate:production
npm run build
npm run dev
```

The `dev` script must remain:

```json
"dev": "lsof -ti:3000 | xargs kill -9 &&next dev"
```

## Environment checks

- `NEXT_PUBLIC_API_URL` or `PRODUCTS_API_URL` points to the correct product/order backend.
- `NEXT_PUBLIC_SITE_URL` points to the public production domain.
- `NOTION_TOKEN` and `NOTION_DATABASE_ID` are configured for the blog.
- Product image URLs returned by the backend are full Cloudinary/HTTPS URLs.
- Product image objects may include `thumbnail_url`, `medium_url`, and `full_url`.

## Core route checks

Open these pages manually on desktop and mobile:

- `/`
- `/products`
- one real `/products/[slug]`
- `/collections`
- one real `/collections/[slug]`
- `/blog`
- one real `/blog/[slug]`
- `/checkout`
- `/contact`
- `/faq`
- `/delivery`
- `/sitemap.xml`
- `/robots.txt`
- `/feed.xml`

## Product flow checks

- `/products` shows all live backend products.
- Product cards use backend product images, not hardcoded public image paths.
- Product cards do not show broken image icons or alt text.
- Product filters work with current backend tags/flavour values.
- Product card prices show the correct starting price.
- Product detail page loads the selected product by API slug.
- Size selector changes selected size and price.
- Size-specific images display when available.
- Product gallery thumbnails work.
- YouTube product video appears as first slide when `default_youtube_id` or `size_youtube_id` is present.
- Fullscreen image opens and closes with click and Escape key.
- Add to Basket works.
- Buy Now goes to checkout.

## Cart and checkout checks

- Cart drawer opens from Basket button.
- Cart images handle missing/broken URLs gracefully.
- Empty cart state is clear.
- Quantity controls work.
- Checkout blocks empty-cart submission.
- Checkout submits `cart`, `total_amount`, `customer_phone`, `customer_name`, `customer_address`, `customer_city`, `kilo`, `gram`, and `pcs`.
- Backend accepts the checkout payload without price mismatch when prices are current.
- Delivery fee and final total are clear.
- WhatsApp appears as support/clarification, not the primary order path.

## SEO checks

- Product pages render Product JSON-LD.
- Product JSON-LD does not output invalid `Infinity`, `NaN`, or empty price values.
- Product listing and collection pages render ItemList JSON-LD.
- Collection pages render BreadcrumbList and FAQPage JSON-LD.
- Blog pages remain Notion-powered.
- Sitemap includes live API product URLs.
- Sitemap includes collection and blog URLs.
- Canonicals point to the final route, not old aliases.
- Open Graph title/description are present on key pages.

## Visual/mobile checks

- Header does not overflow on mobile.
- Product detail media uses available mobile width well.
- Product card text does not overflow.
- Sticky mobile buy bar does not cover important content.
- Checkout form is readable and tappable on mobile.
- No customer-facing text mentions API setup, developer notes, or environment variables.
