import { defineConfig, defineCollection, s } from 'velite';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypePrettyCodeOptions } from './lib/mdx-config';

const posts = defineCollection({
  name: 'Post',
  pattern: 'writing/**/*.mdx',
  schema: s
    .object({
      title: s.string(),
      date: s.isodate(),
      description: s.string(),
      tags: s.array(s.string()).default([]),
      slug: s.path(),
      body: s.mdx(),
      relatedWriting: s
        .array(
          s.object({
            title: s.string(),
            slug: s.string(),
            description: s.string(),
            date: s.string(),
            imageSrc: s.string(),
            imageAlt: s.string(),
          })
        )
        .default([]),
    })
    .transform(data => ({
      ...data,
      slug: data.slug.replace(/^writing\//, ''),
      permalink: `/writing/${data.slug.replace(/^writing\//, '')}`,
    })),
});

const projects = defineCollection({
  name: 'Project',
  pattern: 'projects/**/*.mdx',
  schema: s
    .object({
      title: s.string(),
      date: s.isodate(),
      description: s.string(),
      slug: s.slug('projects'),
      technologies: s.array(s.string()).default([]),
      image: s.string().optional(),
      githubUrl: s.string().optional(),
      liveUrl: s.string().optional(),
      features: s.array(s.string()).default([]),
      challenges: s.array(s.string()).default([]),
      lessons: s.array(s.string()).default([]),
      body: s.mdx(),
    })
    .transform(data => ({
      ...data,
      permalink: `/projects/${data.slug}`,
    })),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:8].[ext]',
    clean: true,
  },
  collections: { posts, projects },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypePrettyCode, rehypePrettyCodeOptions],
    ],
    remarkPlugins: [],
    gfm: true,
  },
});
