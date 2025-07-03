import Layout from '@/components/Layout';
import BlogCard from '@/components/BlogCard';
import { getBlogPosts } from '@/lib/mdx';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Pat Dugan',
  description:
    'Thoughts, tutorials, and insights about web development and technology',
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <Layout>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-12 text-center'>
          <h1 className='mb-4 text-4xl font-bold text-gray-900 dark:text-white'>
            Blog
          </h1>
          <p className='text-xl text-gray-600 dark:text-gray-300'>
            Thoughts, tutorials, and insights about web development and
            technology
          </p>
        </div>

        {posts.length === 0 ? (
          <div className='py-12 text-center'>
            <p className='text-gray-600 dark:text-gray-300'>
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className='grid gap-8 md:grid-cols-2'>
            {posts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
