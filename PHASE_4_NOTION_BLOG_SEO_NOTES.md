# Phase 4 — Notion Blog SEO + Crawl Polish

This phase keeps the blog fully Notion-powered while improving crawlability, metadata safety, schema quality, and blog-to-product conversion.

## What changed

- Added `lib/site.ts` for shared site URL, WhatsApp number, social links, absolute URL helpers, and meta description truncation.
- Added `lib/json-ld.ts` to safely serialize JSON-LD and escape `<` characters.
- Improved `lib/notion.ts`:
  - Keeps fetching all blog posts from Notion.
  - Keeps `/blog/[slug]` fetching article content from Notion.
  - Supports safer property parsing for `Title`, `Name`, `Post Title`, `Slug`, `Excerpt`, `Summary`, `Description`, `Date`, `Published Date`, `Category`, and `Type`.
  - Adds raw `dateISO` and `modifiedISO` fields so schema and sitemap dates are valid machine-readable dates.
  - Keeps the existing `Published` checkbox filter.
  - Logs a clearer 401 hint when the Notion token is invalid or the integration has not been shared with the database.
- Improved `/blog`:
  - Added ItemList JSON-LD for visible Notion posts.
  - Added Breadcrumb JSON-LD.
  - Added RSS alternate metadata.
- Improved `/blog/[slug]`:
  - Fixed duplicate title issue by letting the root title template add `| Kurkees`.
  - Uses raw Notion ISO dates for BlogPosting schema.
  - Adds `dateModified` to BlogPosting schema.
  - Adds related Notion posts.
  - Adds a product/WhatsApp conversion block after article content.
- Added `/feed.xml` RSS feed generated from published Notion blog posts.
- Updated sitemap blog entries to use Notion `last_edited_time` or publish date instead of always using the current date.
- Centralized sitemap/robots site URL through `siteConfig`.
- Switched JSON-LD script rendering on SEO pages to the safer shared helper.

## Still required after deployment

- Make sure your environment has the real Notion values:

```bash
NOTION_TOKEN=your_real_notion_integration_secret
NOTION_DATABASE_ID=your_real_notion_database_id
NEXT_PUBLIC_SITE_URL=https://kurkees.com
```

- Confirm the Notion integration is shared with the exact database.
- Confirm the database has a `Published` checkbox and `Slug` rich text property. The code still depends on those for publishing and individual article lookup.
- Check `/blog`, one real `/blog/[slug]`, `/sitemap.xml`, and `/feed.xml` after deployment.
