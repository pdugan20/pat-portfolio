import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Layout from '@/components/Layout';
import { getBlogPost, getAllBlogSlugs } from '@/lib/mdx';
import Link from 'next/link';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getBlogPost(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Post Not Found - Pat Dugan',
    };
  }

  return {
    title: `${post.title} - Pat Dugan`,
    description: post.description,
  };
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map(slug => ({
    slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <Layout>
      <div className='mb-10'>
        <Link
          href='/blog'
          className='mb-4 inline-block text-blue-600 hover:underline dark:text-blue-400'
        >
          ← Back to Blog
        </Link>
      </div>

      <article className='mx-auto w-[653px] font-sans leading-relaxed text-gray-900'>
        <header className='mb-8'>
          <div className='mb-5 flex items-center'>
            <time
              dateTime={post.date}
              className='text-[14px] leading-[1.2857742857] font-[600] tracking-[-0.016em] text-[#6e6e73]'
            >
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <h1 className='mb-5 text-[48px] leading-[1.08] font-[700] tracking-[-0.003em] text-black dark:text-white'>
            {post.title}
          </h1>
          <p className='mb-6 text-[24px] leading-[1.1666666667] font-[500] tracking-[0.009em] text-black dark:text-white'>
            {post.description}
          </p>
        </header>

        <div className='prose prose-lg dark:prose-invert max-w-none'>
          <div className='[&>a]:font-[400] [&>figure]:m-0 [&>figure]:p-0 [&>figure>img]:rounded-lg [&>h1]:mb-4 [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-black [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-2xl [&>img]:my-8 [&>img]:h-auto [&>img]:max-w-full [&>p]:mb-4 [&>p]:text-[19px] [&>p]:leading-[1.421103] [&>p]:font-[400] [&>p]:tracking-[0.012em] [&>p]:text-black [&>p]:dark:text-white'>
            <MDXRemote source={post.content} />
          </div>
        </div>
      </article>
    </Layout>
  );
}
