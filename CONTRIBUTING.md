# Contributing to FragBasic

Thanks for helping improve FragBasic. Contributions are welcome for the application, catalog data, documentation, accessibility, and bug fixes.

## Before You Start

- For a small fix, open a pull request with a clear description.
- For a larger feature or a change that affects catalog structure, open an issue first to discuss the approach.
- Search existing issues and pull requests so work is not duplicated.
- Keep changes focused. Avoid unrelated formatting or refactoring in the same pull request.

## Development Setup

You need Node.js compatible with the Next.js version in `package.json`, plus npm.

1. Fork the repository and clone your fork.
2. Install dependencies:

   ```bash
   npm ci
   ```

3. Start the local development server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000`.

On Windows PowerShell, copy the environment template when needed:

```powershell
Copy-Item .env.example .env
```

The public catalog is currently backed by TypeScript data modules. You generally do not need database credentials for public-site UI work. CMS and database work requires a `DATABASE_URL`; image uploads and seed scripts also need Supabase Storage configuration. Admin authentication uses the variables documented in `.env.example`. Keep real secrets in your local `.env`, never in commits or pull requests.

## Making Changes

- Follow the existing TypeScript, React, and Tailwind patterns in the area you change.
- Keep product-specific behavior in the relevant domain module instead of duplicating it across pages.
- For catalog data, follow the existing domain types and schemas, use unique slugs, and keep ratings and specifications internally consistent.
- Treat product assessments as sourced editorial data, not laboratory measurements unless they were actually measured. Include useful source or freshness information where the existing model supports it.
- Only contribute text, images, logos, and other assets that you created or have permission to use. Mention attribution and license details in the pull request. Product trademarks and third-party materials remain subject to their owners' rights and are not relicensed by this repository's MIT license.
- Add or update focused tests when changing behavior, schemas, filters, or data helpers.
- For user-facing changes, check the relevant page at desktop and mobile sizes and include screenshots in the pull request when useful.
- Update documentation when a change affects setup, contributor workflows, or user-facing behavior.

## Validation

Run the checks relevant to your change before opening a pull request:

```bash
npx tsc --noEmit
npm run lint
npm test
npm run build
```

The project uses Vitest for tests. If a check cannot run because required local services or credentials are unavailable, say which check was skipped and why in the pull request.

## Pull Requests

- Use a descriptive title and explain the problem and the approach.
- Link the related issue, if there is one.
- Summarize user-visible changes and note any data or schema changes.
- Include screenshots for meaningful UI changes.
- List the validation commands you ran and their results.
- Call out any follow-up work or known limitations.

By submitting a contribution, you agree that your contribution is provided under the repository's MIT License. You confirm that you have the right to submit it and that you identify any third-party material and its terms.

## Reporting Security Issues

Please do not include credentials, private user information, or exploitable details in a public issue. Use GitHub's private vulnerability reporting for this repository if it is enabled; otherwise contact the maintainer privately through their public GitHub contact information.
