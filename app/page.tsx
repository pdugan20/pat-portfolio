import Layout from '@/components/Layout';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  SITE_CONFIG,
  WORK_HISTORY,
  PROJECTS,
  EXPERIENCE,
} from '@/lib/constants';
import { posts } from '#content';

export const metadata: Metadata = {
  title: `${SITE_CONFIG.author} - ${SITE_CONFIG.title}`,
  description: SITE_CONFIG.description,
};

// Toggle this to preview variants: 'minimal' | 'detailed'
const WRITING_VARIANT: 'minimal' | 'detailed' = 'minimal';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

function WritingListMinimal({
  sortedPosts,
}: {
  sortedPosts: (typeof posts)[number][];
}) {
  return (
    <ul className='space-y-3'>
      {sortedPosts.map(post => (
        <li key={post.slug}>
          <Link
            href={`/writing/${post.slug}`}
            className='group flex items-baseline justify-between gap-4'
          >
            <span className='text-text-primary group-hover:text-primary dark:text-text-dark-primary dark:group-hover:text-primary-light text-base transition-colors'>
              {post.title}
            </span>
            <span className='text-text-muted dark:text-text-dark-muted shrink-0 text-sm'>
              {formatDate(post.date)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function WritingListDetailed({
  sortedPosts,
}: {
  sortedPosts: (typeof posts)[number][];
}) {
  return (
    <ul className='space-y-6'>
      {sortedPosts.map(post => (
        <li key={post.slug}>
          <Link href={`/writing/${post.slug}`} className='group block'>
            <div className='flex items-baseline justify-between gap-4'>
              <h3 className='text-text-primary group-hover:text-primary dark:text-text-dark-primary dark:group-hover:text-primary-light text-base font-medium transition-colors'>
                {post.title}
              </h3>
              <span className='text-text-muted dark:text-text-dark-muted shrink-0 text-sm'>
                {formatDate(post.date)}
              </span>
            </div>
            <p className='text-text-secondary dark:text-text-dark-secondary mt-1 text-sm'>
              {post.description}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Layout>
      {/* Intro */}
      <section className='mb-16'>
        <h1 className='text-text-primary dark:text-text-dark-primary mb-1 text-2xl font-semibold tracking-tight'>
          Patrick Dugan
        </h1>
        <p className='text-text-muted dark:text-text-dark-muted mb-4 text-sm'>
          Designer, Engineer
        </p>
        <p className='text-text-secondary dark:text-text-dark-secondary leading-relaxed'>
          I&apos;m Patrick Dugan — a designer and engineer who has spent the
          last decade and a half shipping consumer products, building design
          systems, and growing teams at places like{' '}
          {WORK_HISTORY.map((company, index) => (
            <span key={company.name}>
              <a
                href={company.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-text-primary hover:text-primary dark:text-text-dark-primary dark:hover:text-primary-light underline decoration-gray-300 underline-offset-2 transition-colors dark:decoration-gray-600'
              >
                {company.name}
              </a>
              {index < WORK_HISTORY.length - 2
                ? ', '
                : index === WORK_HISTORY.length - 2
                  ? ', and the '
                  : '. '}
            </span>
          ))}
          These days I&apos;m mostly thinking about how AI changes the way we
          make things.
        </p>
      </section>

      {/* Writing */}
      <section className='mb-16'>
        <h2 className='text-text-primary dark:text-text-dark-primary mb-6 text-lg font-semibold tracking-tight'>
          Writing
        </h2>
        {sortedPosts.length === 0 ? (
          <p className='text-text-secondary dark:text-text-dark-secondary'>
            No writing yet. Check back soon!
          </p>
        ) : WRITING_VARIANT === 'detailed' ? (
          <WritingListDetailed sortedPosts={sortedPosts} />
        ) : (
          <WritingListMinimal sortedPosts={sortedPosts} />
        )}
      </section>

      {/* Projects */}
      <section className='mb-16'>
        <h2 className='text-text-primary dark:text-text-dark-primary mb-6 text-lg font-semibold tracking-tight'>
          Projects
        </h2>
        <ul className='space-y-3'>
          {PROJECTS.map(project => (
            <li key={project.name}>
              <a
                href={project.url}
                target='_blank'
                rel='noopener noreferrer'
                className='group flex items-baseline justify-between gap-4'
              >
                <span className='text-text-primary group-hover:text-primary dark:text-text-dark-primary dark:group-hover:text-primary-light text-base transition-colors'>
                  {project.name}
                </span>
                <span className='text-text-muted dark:text-text-dark-muted shrink-0 text-sm'>
                  {project.description}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section className='mb-16'>
        <h2 className='text-text-primary dark:text-text-dark-primary mb-6 text-lg font-semibold tracking-tight'>
          Experience
        </h2>
        <ul className='space-y-8'>
          {EXPERIENCE.map(job => (
            <li key={job.company}>
              <div className='flex items-baseline justify-between gap-4'>
                <h3 className='text-text-primary dark:text-text-dark-primary text-base font-medium'>
                  {job.role} at {job.company}
                </h3>
                <span className='text-text-muted dark:text-text-dark-muted shrink-0 text-sm'>
                  {job.period}
                </span>
              </div>
              <p className='text-text-secondary dark:text-text-dark-secondary mt-1 text-sm leading-relaxed'>
                {job.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
