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
            className='mb-4 inline-block text-blue-600 hover:underline dark:text-blue-400'
          >
            ← Back to Projects
          </Link>
        </div>

        <article className='overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800'>
          {/* Project Header */}
          <div className='border-b border-gray-200 p-8 dark:border-gray-700'>
            <div className='mb-4 flex items-center text-sm text-gray-500 dark:text-gray-400'>
              <time dateTime={project.date}>
                {new Date(project.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            <h1 className='mb-4 text-4xl font-bold text-gray-900 dark:text-white'>
              {project.title}
            </h1>

            <p className='mb-6 text-xl text-gray-600 dark:text-gray-300'>
              {project.longDescription}
            </p>

            <div className='mb-6 flex flex-wrap gap-2'>
              {project.technologies.map(tech => (
                <span
                  key={tech}
                  className='inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200'
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
                  className='rounded-lg bg-gray-900 px-6 py-2 text-white transition-colors hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                >
                  View on GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700'
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
              <h2 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>
                Key Features
              </h2>
              <ul className='grid gap-3 md:grid-cols-2'>
                {project.features.map((feature, index) => (
                  <li key={index} className='flex items-start'>
                    <span className='mt-1 mr-3 text-green-500'>✓</span>
                    <span className='text-gray-700 dark:text-gray-300'>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Challenges Section */}
            <section className='mb-12'>
              <h2 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>
                Challenges & Solutions
              </h2>
              <div className='space-y-4'>
                {project.challenges.map((challenge, index) => (
                  <div
                    key={index}
                    className='rounded-lg bg-gray-50 p-4 dark:bg-gray-700'
                  >
                    <p className='text-gray-700 dark:text-gray-300'>
                      {challenge}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Lessons Learned Section */}
            <section className='mb-12'>
              <h2 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>
                Lessons Learned
              </h2>
              <div className='space-y-4'>
                {project.lessons.map((lesson, index) => (
                  <div key={index} className='flex items-start'>
                    <span className='mt-1 mr-3 text-blue-500'>💡</span>
                    <p className='text-gray-700 dark:text-gray-300'>{lesson}</p>
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
                <h2 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>
                  Project Preview
                </h2>
                <div className='flex aspect-video items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700'>
                  <div className='text-center'>
                    <div className='mb-2 text-gray-500 dark:text-gray-400'>
                      📸
                    </div>
                    <p className='text-gray-500 dark:text-gray-400'>
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
