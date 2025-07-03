import Link from 'next/link';
import { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className='overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg dark:bg-gray-800'>
      {project.image && (
        <div className='aspect-video bg-gray-200 dark:bg-gray-700'>
          <div className='flex h-full w-full items-center justify-center text-gray-500 dark:text-gray-400'>
            <span className='text-sm'>Project Preview</span>
          </div>
        </div>
      )}
      <div className='p-6'>
        <div className='mb-2 flex items-center text-sm text-gray-500 dark:text-gray-400'>
          <time dateTime={project.date}>
            {new Date(project.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
        <Link href={`/projects/${project.slug}`} className='block'>
          <h2 className='mb-2 text-xl font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400'>
            {project.title}
          </h2>
        </Link>
        <p className='mb-4 line-clamp-3 text-gray-600 dark:text-gray-300'>
          {project.description}
        </p>
        <div className='mb-4 flex flex-wrap gap-2'>
          {project.technologies.slice(0, 3).map(tech => (
            <span
              key={tech}
              className='inline-block rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className='inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300'>
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
        <div className='flex gap-2'>
          <Link
            href={`/projects/${project.slug}`}
            className='text-sm font-medium text-blue-600 hover:underline dark:text-blue-400'
          >
            View Details →
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
