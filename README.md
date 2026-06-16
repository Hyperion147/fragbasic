# FragBasic

FragBasic is a mousepad-focused FPS gear site built with Next.js. It includes:

- A mousepad database for cloth, hybrid, and glass surfaces
- Published comparison pages and a universal compare tool
- A guided mousepad finder
- Curated `/best` pages for common use cases and games

## Local Development

Run the app locally:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production Domain

The production site is:

```txt
https://fragbasic.fun
```

## SEO Routes

FragBasic uses Next App Router metadata routes for SEO infrastructure.

- Sitemap URL: `https://fragbasic.fun/sitemap.xml`
- Robots URL: `https://fragbasic.fun/robots.txt`

These are generated from:

- [src/app/sitemap.ts](x:\Work\test\fragbasic\src\app\sitemap.ts)
- [src/app/robots.ts](x:\Work\test\fragbasic\src\app\robots.ts)

The canonical site URL is centralized in:

- [src/lib/seo.ts](x:\Work\test\fragbasic\src\lib\seo.ts)

## Google Search Console

For Google indexing, submit this sitemap:

```txt
https://fragbasic.fun/sitemap.xml
```

That is the only sitemap URL Google needs for this project right now.

## Build Check

Useful commands:

```bash
npx tsc --noEmit
npm run lint
npm run build
```
