import Link from 'next/link';
import type { Project } from '#content';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className='bg-bg-primary dark:bg-bg-dark-secondary overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg'>
      {project.image && (
        <div className='bg-bg-tertiary dark:bg-bg-dark-tertiary aspect-video'>
          <div className='text-text-tertiary dark:text-text-dark-tertiary flex h-full w-full items-center justify-center'>
            <span className='text-sm'>Project Preview</span>
          </div>
        </div>
      )}
      <div className='p-6'>
        <div className='text-text-tertiary dark:text-text-dark-tertiary mb-2 flex items-center text-sm'>
          <time dateTime={project.date}>
            {new Date(project.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
        <Link href={`/projects/${project.slug}`} className='block'>
          <h2 className='text-text-primary hover:text-primary dark:text-text-dark-primary dark:hover:text-primary-light mb-2 text-xl font-semibold'>
            {project.title}
          </h2>
        </Link>
        <p className='text-text-secondary dark:text-text-dark-secondary mb-4 line-clamp-3'>
          {project.description}
        </p>
        <div className='mb-4 flex flex-wrap gap-2'>
          {project.technologies.slice(0, 3).map(tech => (
            <span
              key={tech}
              className='bg-primary bg-opacity-10 text-primary dark:bg-primary dark:bg-opacity-20 dark:text-primary-light inline-block rounded-full px-2 py-1 text-xs'
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className='bg-bg-tertiary text-text-secondary dark:bg-bg-dark-tertiary dark:text-text-dark-secondary inline-block rounded-full px-2 py-1 text-xs'>
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
        <div className='flex gap-2'>
          <Link
            href={`/projects/${project.slug}`}
            className='text-primary dark:text-primary-light text-sm font-medium hover:underline'
          >
            View Details →
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary text-sm font-medium'
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
