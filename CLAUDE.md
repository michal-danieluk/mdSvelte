# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit blog template built on mdsvex (markdown for Svelte) and Tailwind CSS. The blog supports Polish content with custom reading time estimation ("min czyt.").

## Essential Commands

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Type checking**: `npm run check` or `npm run check:watch`
- **Linting**: `npm run lint` (runs Prettier check + ESLint)
- **Formatting**: `npm run format`

## Architecture

### Content Management

- Blog posts are markdown files in `/posts/` directory
- Posts can be single files (`post-name.md`) or folders with `index.md`
- Post metadata is automatically extracted and processed in `src/lib/data/posts.js`
- Reading time is calculated and displayed in Polish ("min czyt.")

### Routing Structure

- **Homepage**: Lists all posts with pagination via `/posts/[[page]]`
- **Individual posts**: `/post/[slug]` routes
- **RSS/Sitemap**: Auto-generated at `/rss.xml` and `/sitemap.xml`
- **About page**: Static content at `/about`

### Markdown Processing (mdsvex)

- Configuration in `mdsvex.config.js`
- Custom video support for `.mp4/.webm` files in markdown
- Automatic heading extraction for table of contents
- Relative image support via `mdsvex-relative-images`
- Syntax highlighting with Prism CSS

### Key Components

- `PostsList.svelte`: Main blog post listing with pagination
- `PostPreview.svelte`: Individual post preview cards
- `ToC.svelte`: Table of contents generation from headings
- `Card.svelte`: Reusable card component for post layouts

### Data Flow

- Posts data is server-side only (throws error if imported in browser)
- Post metadata includes slug generation, date formatting, preview extraction
- Posts are sorted by date (newest first) with next/previous references
- Static prerendering enabled for all pages including RSS/sitemap

### Styling

- Tailwind CSS with dark mode support
- Custom gradient colors (teal theme)
- Typography plugin for markdown content styling
- Dark/light mode toggle with localStorage persistence

### Special Features

- Prerendered static site with SvelteKit adapter-auto
- RSS feed generation
- SEO-friendly with proper meta tags and structured data
- Mobile-responsive design
- add to memory. Use git very often to be able to reverse changes
- add to memroy. Check if you fix is really working.