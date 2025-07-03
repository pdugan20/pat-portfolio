# Pat Dugan's Portfolio

A modern portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features a blog section with MDX support for writing technical articles and project showcases.

## Features

- **Portfolio Section**: Showcase your projects, skills, and experience
- **Blog Section**: Write and publish technical articles using MDX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Theme System**: Light, dark, and system theme support with automatic preference detection
- **TypeScript**: Full type safety throughout the application
- **MDX Support**: Write blog posts with Markdown and React components

## Project Structure

```
pat-portfolio/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Home (portfolio)
│   ├── globals.css         # Global styles
│   └── blog/
│       ├── page.tsx        # Blog index
│       └── [slug]/page.tsx # Individual posts
├── content/
│   └── blog/               # MDX blog posts
├── components/             # Reusable UI components
├── lib/                    # Utility functions
├── styles/                 # Additional CSS styles
├── public/                 # Static assets
└── next.config.ts          # Next.js configuration
```

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Writing Blog Posts

Blog posts are written in MDX format and stored in the `content/blog/` directory. Each post should include frontmatter with the following fields:

```mdx
---
title: 'Your Post Title'
date: '2024-01-15'
description: 'A brief description of your post'
tags: ['tag1', 'tag2', 'tag3']
---

# Your Post Content

Write your blog post content here using Markdown syntax.
```

## Customization

### Portfolio Content

Edit `app/page.tsx` to customize your portfolio content, including:

- Personal information
- Skills and experience
- Project showcases
- Contact information

### Styling

- Global styles: `app/globals.css`
- Blog-specific styles: `styles/blog.css`
- Component styles: Use Tailwind CSS classes

### Components

- Layout: `components/Layout.tsx`
- Blog cards: `components/BlogCard.tsx`
- Add new components in the `components/` directory

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **MDX**: Markdown with JSX support
- **next-mdx-remote**: MDX rendering
- **gray-matter**: Frontmatter parsing
- **next-themes**: Theme management with system preference detection

## Deployment

This project can be deployed to Vercel, Netlify, or any other platform that supports Next.js.

```bash
npm run build
npm start
```

## License

MIT License - feel free to use this template for your own portfolio!
