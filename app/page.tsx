import Layout from '@/components/Layout';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG, WORK_HISTORY, PROJECTS } from '@/lib/constants';
import ExperienceSection from '@/components/ExperienceSection';
import HoverList from '@/components/HoverList';
import NowSection from '@/components/NowSection';
import { posts } from '#content';

export const metadata: Metadata = {
  title: `${SITE_CONFIG.author} - ${SITE_CONFIG.title}`,
  description: SITE_CONFIG.description,
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

export default function Home() {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Layout>
      <div className='home-content'>
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
                  className='text-text-primary dark:text-text-dark-primary underline decoration-gray-300 underline-offset-2 transition-colors dark:decoration-gray-600'
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

        <NowSection />

        {/* Writing */}
        <section className='mb-16'>
          <h2 className='text-text-muted dark:text-text-dark-muted mb-4 font-mono text-xs font-normal tracking-wider uppercase'>
            Writing
          </h2>
          <HoverList>
            {sortedPosts.map(post => (
              <Link
                key={post.slug}
                href={`/writing/${post.slug}`}
                className='hover-row-link flex items-baseline justify-between gap-4 py-2'
              >
                <span className='text-text-primary dark:text-text-dark-primary text-base'>
                  {post.title}
                </span>
                <span className='text-text-muted dark:text-text-dark-muted shrink-0 text-sm'>
                  {formatDate(post.date)}
                </span>
              </Link>
            ))}
          </HoverList>
        </section>

        {/* Projects */}
        <section className='mb-16'>
          <h2 className='text-text-muted dark:text-text-dark-muted mb-4 font-mono text-xs font-normal tracking-wider uppercase'>
            Projects
          </h2>
          <HoverList>
            {PROJECTS.map(project => (
              <a
                key={project.name}
                href={project.url}
                target='_blank'
                rel='noopener noreferrer'
                className='hover-row-link flex items-baseline justify-between gap-4 py-2'
              >
                <span className='text-text-primary dark:text-text-dark-primary text-base'>
                  {project.name}
                </span>
                <span className='text-text-muted dark:text-text-dark-muted shrink-0 text-sm'>
                  {project.description}
                </span>
              </a>
            ))}
          </HoverList>
        </section>

        <ExperienceSection />
      </div>
    </Layout>
  );
}
