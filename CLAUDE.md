# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**

```bash
npm run dev
```

Uses Next.js with Turbopack for fast development builds.

**Build for production:**

```bash
npm run build
```

**Code quality:**

```bash
npm run lint          # Run ESLint
npm run lint:fix       # Fix ESLint issues automatically
npm run format         # Format with Prettier
npm run format:check   # Check Prettier formatting
```

## Architecture Overview

This is a personal portfolio and blog site built with Next.js 15, using the App Router pattern. The architecture follows these key patterns:

### Content Management

- **Blog posts** are stored as MDX files in `content/writing/`
- **Projects** are stored as MDX files in `content/projects/`
- Content is parsed using `gray-matter` for frontmatter and `next-mdx-remote` for rendering
- All content loading logic is centralized in `lib/mdx.ts`

### Routing Structure

- `/` - Portfolio homepage
- `/writing` - Blog post listing
- `/writing/[slug]` - Individual blog posts
- `/projects` - Project listing
- `/projects/[slug]` - Individual projects
- `/api/feeds/` - RSS/Atom/JSON feeds

### Theme System

- Uses `next-themes` for light/dark/system theme support
- Theme provider wraps the entire app in `app/layout.tsx`
- Theme colors are defined via CSS custom properties and Tailwind utilities

### MDX Configuration

- Custom MDX components are registered in `app/writing/[slug]/page.tsx`
- Syntax highlighting via `rehype-pretty-code` with Shiki
- Custom components include: PostImage, PostMovie, ColorSwatch, TextSwatch, PullQuote

### Styling Architecture

- Primary styling with Tailwind CSS v4
- Custom component styles in `styles/components/`
- MDX-specific styles in `styles/mdx.css`
- Global styles in `app/globals.css`

## Key Files and Directories

**Core application:**

- `app/layout.tsx` - Root layout with theme provider and metadata
- `lib/constants.ts` - Site configuration and author info
- `lib/mdx.ts` - Content loading and parsing utilities

**Content structure:**

- `content/writing/*.mdx` - Blog posts with frontmatter
- `content/projects/*.mdx` - Project case studies
- MDX frontmatter should include: title, date, description, tags

**Component patterns:**

- `components/` - Reusable UI components
- `components/icons/` - SVG icon components with barrel exports
- `components/swatches/` - Design system demonstration components

## Working with Content

When adding new blog posts:

1. Create MDX file in `content/writing/`
2. Include required frontmatter: title, date, description, tags
3. Optional: add relatedWriting array for cross-references
4. Use custom MDX components (PostImage, PostMovie, etc.) for rich content

When working with images/videos:

- Static assets go in `public/assets/`
- Use PostImage component for optimized images
- Use PostMovie component for video content with posters
