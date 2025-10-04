# Repository Guidelines

## Project Structure & Module Organization
This SvelteKit + mdsvex blog keeps pages and endpoints in `src/routes`, with reusable UI in `src/lib/components` and shared helpers in `src/lib/data` and `src/lib/util.js`. Markdown posts live in `posts/`; single-file articles such as `posts/workflow/index.md` store assets alongside the markdown. Public images or fonts belong in `static/`, while Tailwind and PostCSS tuning stay in `tailwind.config.cjs` and `postcss.config.cjs`.

## Build, Test, and Development Commands
- `npm install` – install node modules after cloning or pulling.
- `npm run dev` – launch the Vite dev server with hot-module reload.
- `npm run build` – create the production bundle used for deployment.
- `npm run preview` – serve the production bundle locally to smoke-test.
- `npm run check` – run `svelte-check` with `jsconfig.json` for type and accessibility issues.
- `npm run lint` – execute Prettier (check mode) and ESLint using `.gitignore` for excludes.
- `npm run format` – apply Prettier fixes across the repo before committing.

## Coding Style & Naming Conventions
Use two-space indentation in `.svelte` and `.js` files. Components stay PascalCase (`PostsList.svelte`), helpers camelCase, and route directories kebab-case (`about`, `posts`). Favor Tailwind utility classes over bespoke CSS except for global tweaks in `src/app.css`. Run `npm run format` ahead of commits and resolve any ESLint findings with `npm run lint`.

## Testing Guidelines
We rely on `npm run check` plus manual exploration via `npm run preview`. When you add logic-heavy features, include vitest or Playwright specs (name them `<Component>.test.ts`) and run them locally. For markdown updates, confirm frontmatter keys (`title`, `date`, `tags`) and ensure RSS/sitemap stay valid by rerunning `npm run build`.

## Commit & Pull Request Guidelines
Keep commits focused, present-tense, and aligned with the existing history (e.g. `git commit -m "dodanie zdjęcia do posta date-in-fns"`). Reference issues or posts in the body, and avoid mixing content and code refactors in one change. Pull requests should include a short summary, screenshots for UI adjustments, and the commands you executed (`dev`, `check`, `lint`, `build`).

## Content Contributions
Add articles under `posts/`; either create `slug.md` or `slug/index.md` with sibling assets referenced relatively (`./hero.png`). Begin each file with frontmatter:

```
---
title: Example Title
date: 2024-03-11
tags: ['Svelte', 'Design']
---
```

After publishing, review featured selections in `src/lib/data` so new content appears where expected.
