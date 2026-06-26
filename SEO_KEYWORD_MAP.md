# Kurkees SEO Keyword Map — Non-blog Pages

This map is based on the filtered Google Keyword Planner CSV and should guide homepage, product, shop, FAQ, delivery, and conversion copy.

## Highest-priority non-blog keywords

| Page | Primary keyword | Secondary keywords |
|---|---|---|
| Homepage `/` | peanut butter Sri Lanka | peanut butter, natural peanut butter, peanut butter price in Sri Lanka |
| Products `/products` | peanut butter price in Sri Lanka | peanut butter price, peanut butter cost, order peanut butter, peanut butter online order, peanut butter buy online |
| Smooth product | smooth peanut butter | creamy peanut butter, creamy peanut butter price, peanut butter spread |
| Crunchy product | crunchy peanut butter | peanut butter crunch, crunchy peanut butter price, extra crunchy peanut butter |
| Sugar-free products | no sugar peanut butter | sugar free peanut butter, peanut butter without sugar, low sugar peanut butter |
| Unsalted sugar-free product | unsalted peanut butter | unsweetened peanut butter, no sugar no salt peanut butter, peanut butter without salt |
| Chocolate product | chocolate peanut butter | chocolate peanut spread, peanut butter and chocolate, chocolate peanut butter price |
| Delivery page `/delivery` | peanut butter delivery Sri Lanka | order peanut butter online, peanut butter online order, peanut butter near me |
| FAQ page `/faq` | peanut butter FAQ | peanut butter price Sri Lanka, sugar-free peanut butter, oil separation peanut butter |
| About page `/about` | Sri Lankan peanut butter brand | natural peanut butter, local peanut butter Sri Lanka, Sri Lankan peanuts |

## Keywords to avoid on main pages

- Competitor/foreign brands such as Skippy, Reese's, Pintola, Kraft, Alpino, MuscleBlaze.
- Organic peanut butter unless Kurkees has real organic certification.
- Medical intent phrases such as peanut butter for diabetes unless handled carefully in a medically cautious blog post.
- Weight loss claims.
- Fake review/rating/certification wording.

## Implementation notes

- Keep commercial terms on product and shop pages.
- Keep informational long-tail terms for later blog posts.
- Do not visibly use common misspellings like `peanot butter`; Google can usually understand misspellings without harming brand quality.
- Use `peanut butter price in Sri Lanka` naturally on `/products`, not everywhere.

## Phase 2 collection landing pages

Phase 2 adds focused non-blog collection pages under `/collections`. These are not generic blog posts. They are product-led shopping guides that connect high-intent keywords to real Kurkees jars, product cards, buying notes, FAQs, and WhatsApp CTAs.

| Collection page | Primary keyword | Secondary keywords | Purpose |
|---|---|---|---|
| `/collections/peanut-butter-price-in-sri-lanka` | peanut butter price in Sri Lanka | peanut butter price, peanut butter cost, peanut butter online order, peanut butter price list | Main price-intent landing page for shoppers comparing jars before ordering. |
| `/collections/natural-peanut-butter` | natural peanut butter | pure peanut butter, real peanut butter, healthy peanut butter, peanut butter spread | General ingredient/trust landing page for natural/local positioning. |
| `/collections/smooth-peanut-butter` | smooth peanut butter | creamy peanut butter, creamy peanut butter price, peanut butter spread | Texture-specific landing page for smooth/creamy jars. |
| `/collections/crunchy-peanut-butter` | crunchy peanut butter | peanut butter crunch, crunchy peanut butter price, extra crunchy peanut butter | Texture-specific landing page for crunchy jars. |
| `/collections/sugar-free-peanut-butter` | sugar free peanut butter | no sugar peanut butter, no sugar no salt peanut butter, unsweetened peanut butter, peanut butter without sugar | Ingredient-preference landing page for sugar-free/no-sugar variants. |
| `/collections/chocolate-peanut-butter` | chocolate peanut butter | chocolate peanut spread, peanut butter and chocolate, chocolate peanut butter price | Product-led landing page for Chocofeda. |
| `/collections/protein-peanut-butter` | protein peanut butter | peanut butter protein, peanut butter for gym, fitness peanut butter, peanut butter for weight gain | Fitness-intent landing page written carefully without exaggerated claims. |

### Phase 2 internal linking changes

- Homepage now links to all key collection pages from a product finder section.
- `/products` now links to collection pages from a popular searches section.
- Product detail pages now link back to the collection pages that include that product.
- Footer now includes popular peanut butter search links.
- `/collections` index page lists all collection guides.
- Sitemap now includes `/collections` and each collection detail URL.

### Content safety notes

- Collection pages should remain product-led and useful, not thin doorway pages.
- Do not create pages for every tiny 50-search keyword unless the page has real product value.
- Keep sensitive claims cautious, especially diabetes, child health, weight loss, or guaranteed weight gain.

## Phase 2.1 route stability fix

Added compatibility routes and redirects to prevent 404s from common keyword-style URLs and old/user-entered URLs.

Canonical pages remain:
- `/products`
- `/products/[product-slug]`
- `/collections`
- `/collections/[collection-slug]`

Supported aliases now redirect to canonical URLs, including examples such as:
- `/shop` renders the product price list instead of relying on a redirect-only route.
- `/peanut-butter-price-in-sri-lanka` → `/collections/peanut-butter-price-in-sri-lanka`
- `/smooth-peanut-butter` → `/collections/smooth-peanut-butter`
- `/crunchy-peanut-butter` → `/collections/crunchy-peanut-butter`
- `/sugar-free-peanut-butter` → `/collections/sugar-free-peanut-butter`
- `/chocolate-peanut-butter` → `/collections/chocolate-peanut-butter`
- `/protein-peanut-butter` → `/collections/protein-peanut-butter`
- `/products/smooth-peanut-butter` → `/products/sugar-salted-smooth`
- `/products/crunchy-peanut-butter` → `/products/sugar-salted-crunchy`
- `/products/chocolate-peanut-butter` → `/products/chocofeda-chocolate-peanut`

Also added a helpful custom `not-found.tsx` page so unavoidable 404s guide users back to the price list instead of dead-ending.

## Phase 2.2 Notion blog stability

- Blog listing and blog detail pages remain Notion-powered through `lib/notion.ts`.
- No static/local blog source was introduced.
- Added `.env.example` and `NOTION_BLOG_SETUP.md` so the Notion token/database variables are easier to restore after downloading a cleaned ZIP.
- `lib/notion.ts` now checks both `NOTION_DATABASE_ID` and `NOTION_TOKEN` before querying, trims accidental whitespace/quotes, and supports token aliases (`NOTION_API_KEY`, `NOTION_SECRET`, `NOTION_INTEGRATION_TOKEN`) while keeping `NOTION_TOKEN` as the preferred variable.

