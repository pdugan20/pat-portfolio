import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  content: string;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  challenges: string[];
  lessons: string[];
  date: string;
}

const projectsDirectory = path.join(process.cwd(), 'content', 'projects');

export function getAllProjects(): Project[] {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      return {
        slug: data.slug,
        title: data.title,
        description: data.description,
        longDescription: content.trim(),
        content,
        technologies: data.technologies || [],
        image: data.image,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        features: data.features || [],
        challenges: data.challenges || [],
        lessons: data.lessons || [],
        date: data.date,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProject(slug: string): Project | undefined {
  const filePath = path.join(projectsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    slug: data.slug,
    title: data.title,
    description: data.description,
    longDescription: content.trim(),
    content,
    technologies: data.technologies || [],
    image: data.image,
    githubUrl: data.githubUrl,
    liveUrl: data.liveUrl,
    features: data.features || [],
    challenges: data.challenges || [],
    lessons: data.lessons || [],
    date: data.date,
  };
}

export function getAllProjectSlugs(): string[] {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => fileName.replace(/\.mdx$/, ''));
}
