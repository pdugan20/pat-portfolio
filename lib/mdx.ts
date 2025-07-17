import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface RelatedPost {
  title: string;
  slug: string;
  description: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
  relatedWriting?: RelatedPost[];
}

export function getBlogPosts(): BlogPost[] {
  const blogDirectory = path.join(contentDirectory, 'writing');
  const fileNames = fs.readdirSync(blogDirectory);

  const posts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags || [],
        content,
        relatedWriting: data.relatedWriting || [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, 'writing', `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      tags: data.tags || [],
      content,
      relatedWriting: data.relatedWriting || [],
    };
  } catch {
    return null;
  }
}

export function getAllBlogSlugs(): string[] {
  const blogDirectory = path.join(contentDirectory, 'writing');
  const fileNames = fs.readdirSync(blogDirectory);

  return fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => fileName.replace(/\.mdx$/, ''));
}
