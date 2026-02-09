# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**

```bash
npm run dev
```

Runs Velite in watch mode alongside Next.js with Turbopack.

**Build for production:**

```bash
npm run build
```

Runs dark variant generation, Velite content build, then Next.js build.

**Code quality:**

```bash
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint issues automatically
npm run format        # Format with Prettier
npm run format:check  # Check Prettier formatting
```

**Testing:**

```bash
npm test              # Run tests with Vitest
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## Architecture Overview

This is a personal portfolio and blog site built with Next.js 16, using the App Router pattern.

### Content Management (Velite)

- **Blog posts** are MDX files in `content/writing/`
- **Projects** are MDX files in `content/projects/`
- Content is compiled at build time by **Velite** (`velite.config.ts`)
- Velite outputs typed data to `.velite/`, imported via the `#content` path alias
- Schemas are defined with Zod via Velite's `s` helper
- MDX bodies are compiled to JavaScript and rendered by `components/MDXContent.tsx`

**Importing content:**

```ts
import { posts } from '#content'; // Blog posts
import { projects } from '#content'; // Projects
```

### Routing Structure

- `/` - Portfolio homepage
- `/writing` - Blog post listing
- `/writing/[slug]` - Individual blog posts
- `/projects` - Project listing
- `/projects/[slug]` - Individual projects
- `/api/feeds/rss` - RSS feed
- `/api/feeds/atom` - Atom feed
- `/api/feeds/json` - JSON feed

### Theme System

- Uses `next-themes` for light/dark/system theme support
- Theme provider wraps the entire app in `app/layout.tsx`
- Theme colors defined via CSS custom properties and Tailwind utilities
- Dark mode images use CSS `dark:hidden`/`hidden dark:block` classes (no JS toggling)

### Dark Variant System

- `scripts/generate-dark-variants.mjs` scans `public/assets/` for `-dark` file variants
- Outputs `lib/dark-variants.ts` with a static map of light-to-dark asset paths
- Supports images (jpg, png, webp) and videos (mp4, webm)
- Run via `npm run generate-dark-variants` (also runs automatically during build)

### MDX Configuration

- Syntax highlighting via `rehype-pretty-code` with Shiki (config in `lib/mdx-config.ts`)
- Custom MDX components: PostImage, PostMovie, ColorSwatch, TextSwatch, PullQuote
- Components registered per-page in `app/writing/[slug]/page.tsx` and `app/projects/[slug]/page.tsx`

### Styling Architecture

- Tailwind CSS v4 with `@tailwindcss/postcss`
- Global styles in `app/globals.css`
- MDX-specific styles in `styles/mdx.css`
- Component styles in `styles/components/`
- Content styles in `styles/content/` (code, lists, typography)

## Key Files and Directories

**Core application:**

- `app/layout.tsx` - Root layout with theme provider and metadata
- `lib/constants.ts` - Site configuration and author info
- `velite.config.ts` - Content schema definitions and MDX pipeline
- `components/MDXContent.tsx` - Renders Velite-compiled MDX bodies

**Content:**

- `content/writing/*.mdx` - Blog posts (frontmatter: title, date, description, tags)
- `content/projects/*.mdx` - Project case studies (frontmatter: title, date, description, technologies, etc.)

**Build artifacts (gitignored):**

- `.velite/` - Velite-generated content data and TypeScript types

**Components:**

- `components/` - Reusable UI components
- `components/icons/` - SVG icon components with barrel export
- `components/swatches/` - Design system demonstration components

**Tests:**

- `lib/__tests__/` - Unit tests (Vitest + jsdom)
- `vitest.config.mts` - Test configuration

## Working with Content

When adding new blog posts:

1. Create MDX file in `content/writing/`
2. Include required frontmatter: title, date, description, tags
3. Optional: add relatedWriting array for cross-references
4. Use custom MDX components (PostImage, PostMovie, etc.) for rich content

When adding new projects:

1. Create MDX file in `content/projects/`
2. Include required frontmatter: title, date, description
3. Optional fields: technologies, image, githubUrl, liveUrl, features, challenges, lessons

When working with images/videos:

- Static assets go in `public/assets/`
- Use PostImage component for optimized images with dark mode support
- Use PostMovie component for video content (WebM + MP4 with poster fallback)
- Add `-dark` variants (e.g., `05-dark.png`) for dark mode alternatives
- Run `npm run generate-dark-variants` after adding new dark variants
