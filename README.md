# Patrick Dugan's Portfolio

[![CI](https://github.com/pdugan20/pat-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/pdugan20/pat-portfolio/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

A portfolio and blog built with Next.js 16, TypeScript, and Tailwind CSS v4. Features MDX content compiled at build time with Velite, dark mode with automatic asset variants, and optimized video delivery.

## Features

- **Writing and Projects** - MDX-powered blog posts and project case studies with syntax highlighting
- **Dark Mode** - Light, dark, and system theme support with automatic image/video variants via CSS class toggling
- **RSS Feeds** - RSS, Atom, and JSON feed endpoints
- **Optimized Media** - WebM video with MP4 fallback, compressed poster images, dark mode variants
- **Type-Safe Content** - Velite compiles MDX at build time with Zod schema validation and generated TypeScript types
- **Code Quality** - ESLint, Prettier, Husky pre-commit hooks, and CI pipeline

## Tech Stack

- **Framework** - [Next.js 16](https://nextjs.org/) with App Router and Turbopack
- **Language** - [TypeScript](https://www.typescriptlang.org/)
- **Content** - [Velite](https://velite.js.org/) with MDX, [rehype-pretty-code](https://github.com/rehype-pretty/rehype-pretty-code) + Shiki
- **Styling** - [Tailwind CSS v4](https://tailwindcss.com/)
- **Themes** - [next-themes](https://github.com/pacocoursey/next-themes)
- **Testing** - [Vitest](https://vitest.dev/) with jsdom
- **Runtime** - Node.js 22

## Project Structure

```text
pat-portfolio/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout with theme provider
│   ├── page.tsx                # Homepage
│   ├── writing/                # Blog section
│   │   ├── page.tsx            # Post listing
│   │   └── [slug]/page.tsx     # Individual posts
│   ├── projects/               # Projects section
│   │   ├── page.tsx            # Project listing
│   │   └── [slug]/page.tsx     # Individual projects
│   └── api/feeds/              # RSS, Atom, JSON feeds
├── content/
│   ├── writing/                # MDX blog posts
│   └── projects/               # MDX project case studies
├── components/                 # React components
│   ├── icons/                  # SVG icon components
│   └── swatches/               # Design system components
├── lib/                        # Utilities and configuration
│   ├── dark-variants.ts        # Generated light-to-dark asset map
│   └── __tests__/              # Unit tests
├── styles/                     # CSS modules
│   ├── components/             # Component-specific styles
│   └── content/                # Content typography styles
├── scripts/                    # Build scripts
├── public/assets/              # Static media assets
├── velite.config.ts            # Content schema and MDX pipeline
└── .github/workflows/ci.yml   # CI pipeline
```

## Getting Started

**Prerequisites:** Node.js 22 (see `.nvmrc`)

```bash
# Install dependencies
npm install

# Start development server (Velite watch + Next.js Turbopack)
npm run dev

# Open http://localhost:3000
```

## Scripts

| Command                          | Description                                           |
| -------------------------------- | ----------------------------------------------------- |
| `npm run dev`                    | Start dev server with Velite watch mode and Turbopack |
| `npm run build`                  | Production build (dark variants + Velite + Next.js)   |
| `npm run lint`                   | Run ESLint                                            |
| `npm run format`                 | Format with Prettier                                  |
| `npm test`                       | Run tests with Vitest                                 |
| `npm run test:watch`             | Run tests in watch mode                               |
| `npm run generate-dark-variants` | Regenerate dark variant asset map                     |

## Writing Content

Blog posts and projects are MDX files in the `content/` directory, compiled at build time by Velite.

**Blog post frontmatter:**

```yaml
title: 'Post Title'
date: '2025-01-15'
description: 'A brief description'
tags: ['design', 'engineering']
```

**Custom MDX components:** PostImage, PostMovie, ColorSwatch, TextSwatch, PullQuote

## License

MIT - see [LICENSE](LICENSE) for details.
