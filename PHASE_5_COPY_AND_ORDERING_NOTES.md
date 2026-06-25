# Phase 5: Copy, Keyword Stuffing, and Ordering Flow Fix

## Main decision

Website checkout is now the primary ordering path. WhatsApp is positioned as a secondary support channel for customers who want quick clarification, reassurance, delivery/COD questions, or help before checkout.

## Keyword-stuffing assessment

I found several over-optimization risks in the previous phase:

- Visible keyword chips on product and collection pages.
- Headings such as `Products for {primaryKeyword}`.
- The phrase `Search-friendly product summary`, which was written for search engines rather than users.
- Sections labelled `Popular peanut butter searches`.
- Footer links presented as search terms instead of helpful navigation.
- Root metadata included a `keywords` array, which is unnecessary for Google and can encourage over-optimization.
- Several calls-to-action over-emphasized WhatsApp ordering even though website checkout exists.

## What changed

- Removed visible keyword chip lists from collection pages.
- Removed keyword chip lists from product detail pages.
- Replaced `Search-friendly product summary` with a normal `Product details` section.
- Replaced `Products for [keyword]` with `Recommended Kurkees jars`.
- Replaced `Popular peanut butter searches` with `Helpful shopping guides` or natural wording.
- Removed the global `metadata.keywords` array from `app/layout.tsx`.
- Reduced repeated keyword use in homepage, products page, footer, FAQ, delivery, about, blog CTA, product cards and collection copy.
- Rewrote collection content to be more useful and less keyword-list-like.
- Kept primary keywords in page titles/H1s where they are genuinely useful, but removed forced repetition from body copy.

## Ordering flow changes

- Homepage primary CTA: website shopping.
- Products page primary CTA: choose products / checkout online.
- Product detail mobile sticky CTA: `Buy [size] online`, not WhatsApp.
- Product detail desktop CTA: `Buy Now` and `Add to Basket` are primary; WhatsApp is only `Ask a question on WhatsApp`.
- Navbar button changed from `Order` to `Help`.
- Footer changed from WhatsApp ordering CTA to website shopping CTA plus secondary WhatsApp support.
- Delivery and FAQ pages now explain website checkout first.
- Blog article CTA now sends users to product pages first, with WhatsApp as secondary support.

## What stayed intentionally SEO-friendly

- Important pages still have unique metadata.
- Product and collection pages still have truthful structured data.
- Canonicals, sitemap routes, Notion blog flow, route aliases and dynamic route handling were not intentionally removed.
- Keyword-targeted URLs remain, but the visible page copy is now more natural and user-first.

## Manual checks recommended

After applying this phase, run:

```bash
npm run build
npm run lint
```

Then check:

```text
/
/products
/products/sugar-salted-smooth
/collections
/collections/peanut-butter-price-in-sri-lanka
/collections/smooth-peanut-butter
/blog
/blog/[real-notion-slug]
/delivery
/faq
/contact
/checkout
```

## Public folder note

This ZIP intentionally excludes the `public` folder. Keep your existing `public` folder with your real images.
