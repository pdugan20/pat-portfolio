# pat-portfolio

[![CI](https://github.com/pdugan20/pat-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/pdugan20/pat-portfolio/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?logo=opensourceinitiative&logoColor=white)](LICENSE)

Personal portfolio and blog built with Next.js 16, TypeScript, and Tailwind CSS v4. MDX content compiled at build time with Velite, dark mode with automatic asset variants, and optimized video delivery.

## Features

- MDX-powered blog posts and project case studies with syntax highlighting
- Light, dark, and system theme support with automatic image/video variants
- RSS, Atom, and JSON feed endpoints
- WebM video with MP4 fallback and compressed poster images
- Type-safe content via Velite with Zod schema validation

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Content**: Velite + MDX, rehype-pretty-code + Shiki
- **Styling**: Tailwind CSS v4, next-themes
- **Testing**: Vitest with jsdom
- **Quality**: ESLint, Prettier, Husky, Knip

## Getting Started

Requires Node.js 22 (see `.nvmrc`).

```bash
git clone https://github.com/pdugan20/pat-portfolio.git
cd pat-portfolio
npm install
npm run dev
```

## Development

```bash
npm run dev             # Velite watch + Next.js Turbopack
npm run build           # Production build
npm run lint            # ESLint
npm run format:check    # Prettier check
npm test                # Vitest
npm run test:coverage   # Tests with coverage
```

## Architecture

```text
app/              Next.js App Router (pages, layouts, API routes)
content/          MDX blog posts and project case studies
components/       React components (icons, swatches, UI)
lib/              Utilities, dark variant map, tests
styles/           CSS modules (components, content typography)
scripts/          Build scripts (dark variant generation)
public/assets/    Static media assets
```
