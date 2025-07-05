import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Layout from '@/components/Layout';
import { getProject, getAllProjectSlugs } from '@/lib/projects';
import CodeBlock from '@/components/CodeBlock';
import ProjectImage from '@/components/ProjectImage';
import Link from 'next/link';
import type { Metadata } from 'next';

// MDX components that can be used in project files
const mdxComponents = {
  CodeBlock,
  ProjectImage,
  // You can add more custom components here
};

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProject(resolvedParams.slug);

  if (!project) {
    return {
      title: 'Project Not Found - Pat Dugan',
    };
  }

  return {
    title: `${project.title} - Pat Dugan`,
    description: project.longDescription,
  };
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map(slug => ({
    slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = getProject(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <Layout>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-8'>
          <Link
            href='/projects'
            className='text-primary dark:text-primary-light mb-4 inline-block hover:underline'
          >
            ← Back to Projects
          </Link>
        </div>

        <article className='bg-bg-primary dark:bg-bg-dark-secondary overflow-hidden rounded-lg shadow-md'>
          {/* Project Header */}
          <div className='border-border-primary dark:border-border-dark-primary border-b p-8'>
            <div className='text-text-tertiary dark:text-text-dark-tertiary mb-4 flex items-center text-sm'>
              <time dateTime={project.date}>
                {new Date(project.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            <h1 className='text-text-primary dark:text-text-dark-primary mb-4 text-4xl font-bold'>
              {project.title}
            </h1>

            <p className='text-text-secondary dark:text-text-dark-secondary mb-6 text-xl'>
              {project.longDescription}
            </p>

            <div className='mb-6 flex flex-wrap gap-2'>
              {project.technologies.map(tech => (
                <span
                  key={tech}
                  className='bg-primary bg-opacity-10 text-primary dark:bg-primary dark:bg-opacity-20 dark:text-primary-light inline-block rounded-full px-3 py-1 text-sm'
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className='flex flex-wrap gap-4'>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-bg-dark-primary hover:bg-bg-dark-secondary dark:bg-bg-dark-tertiary dark:hover:bg-bg-dark-secondary rounded-lg px-6 py-2 text-white transition-colors'
                >
                  View on GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-primary hover:bg-primary-hover rounded-lg px-6 py-2 text-white transition-colors'
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Project Content */}
          <div className='p-8'>
            {/* Features Section */}
            <section className='mb-12'>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-6 text-2xl font-bold'>
                Key Features
              </h2>
              <ul className='grid gap-3 md:grid-cols-2'>
                {project.features.map((feature, index) => (
                  <li key={index} className='flex items-start'>
                    <span className='text-success mt-1 mr-3'>✓</span>
                    <span className='text-text-secondary dark:text-text-dark-secondary'>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Challenges Section */}
            <section className='mb-12'>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-6 text-2xl font-bold'>
                Challenges & Solutions
              </h2>
              <div className='space-y-4'>
                {project.challenges.map((challenge, index) => (
                  <div
                    key={index}
                    className='bg-bg-secondary dark:bg-bg-dark-tertiary rounded-lg p-4'
                  >
                    <p className='text-text-secondary dark:text-text-dark-secondary'>
                      {challenge}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Lessons Learned Section */}
            <section className='mb-12'>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-6 text-2xl font-bold'>
                Lessons Learned
              </h2>
              <div className='space-y-4'>
                {project.lessons.map((lesson, index) => (
                  <div key={index} className='flex items-start'>
                    <span className='text-primary mt-1 mr-3'>💡</span>
                    <p className='text-text-secondary dark:text-text-dark-secondary'>
                      {lesson}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* MDX Content Section */}
            {project.content && (
              <section className='mb-8'>
                <div className='prose prose-lg dark:prose-invert max-w-none'>
                  <MDXRemote
                    source={project.content}
                    components={mdxComponents}
                  />
                </div>
              </section>
            )}

            {/* Project Image Placeholder */}
            {project.image && (
              <section className='mb-8'>
                <h2 className='text-text-primary dark:text-text-dark-primary mb-6 text-2xl font-bold'>
                  Project Preview
                </h2>
                <div className='bg-bg-tertiary dark:bg-bg-dark-tertiary flex aspect-video items-center justify-center rounded-lg'>
                  <div className='text-center'>
                    <div className='text-text-tertiary dark:text-text-dark-tertiary mb-2'>
                      📸
                    </div>
                    <p className='text-text-tertiary dark:text-text-dark-tertiary'>
                      Project screenshot would be displayed here
                    </p>
                  </div>
                </div>
              </section>
            )}
          </div>
        </article>
      </div>
    </Layout>
  );
}
