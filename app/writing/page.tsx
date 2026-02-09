import Layout from '@/components/Layout';
import BlogCard from '@/components/BlogCard';
import { posts } from '#content';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Writing - ${SITE_CONFIG.author}`,
  description: SITE_CONFIG.feedDescription,
};

export default function BlogPage() {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Layout>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-12 text-center'>
          <h1 className='text-text-primary dark:text-text-dark-primary mb-4 text-4xl font-bold'>
            Writing
          </h1>
          <p className='text-text-secondary dark:text-text-dark-secondary text-xl'>
            Thoughts, tutorials, and insights about web development and
            technology
          </p>
          <div className='mt-4 flex justify-center space-x-4'>
            <a
              href='/api/feeds/rss'
              className='text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary flex items-center space-x-2 text-sm'
              title='RSS Feed'
            >
              <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z' />
                <path d='M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1z' />
                <path d='M3 15a2 2 0 114 0 2 2 0 01-4 0z' />
              </svg>
              <span>RSS</span>
            </a>
            <a
              href='/api/feeds/atom'
              className='text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary flex items-center space-x-2 text-sm'
              title='Atom Feed'
            >
              <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z' />
                <path d='M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1z' />
                <path d='M3 15a2 2 0 114 0 2 2 0 01-4 0z' />
              </svg>
              <span>Atom</span>
            </a>
            <a
              href='/api/feeds/json'
              className='text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary flex items-center space-x-2 text-sm'
              title='JSON Feed'
            >
              <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z' />
                <path d='M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1z' />
                <path d='M3 15a2 2 0 114 0 2 2 0 01-4 0z' />
              </svg>
              <span>JSON</span>
            </a>
          </div>
        </div>

        {sortedPosts.length === 0 ? (
          <div className='py-12 text-center'>
            <p className='text-text-secondary dark:text-text-dark-secondary'>
              No writing yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className='grid gap-8 md:grid-cols-2'>
            {sortedPosts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
