import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Layout from '@/components/Layout';
import { getBlogPost, getAllBlogSlugs } from '@/lib/mdx';
import Link from 'next/link';
import MDXLink from '@/components/MDXLink';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
          className='text-primary dark:text-primary-light mb-4 inline-block hover:underline'
        >
          ← Back to Blog
        </Link>
      </div>

      <article className='text-text-primary mx-auto w-full max-w-[653px] px-4 font-sans leading-relaxed sm:px-6'>
        <header className='mb-8'>
          <div className='mb-5 flex items-center'>
            <time
              dateTime={post.date}
              className='text-text-muted dark:text-text-dark-muted text-[14px] leading-[1.2857742857] font-[600] tracking-[-0.016em]'
            >
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <h1 className='text-text-primary dark:text-text-dark-primary mb-5 text-[32px] leading-[1.08] font-[700] tracking-[-0.003em] sm:text-[40px] lg:text-[48px]'>
            {post.title}
          </h1>
          <p className='text-text-primary dark:text-text-dark-primary mb-6 text-[20px] leading-[1.1666666667] font-[500] tracking-[0.009em] sm:text-[22px] lg:text-[24px]'>
            {post.description}
          </p>
        </header>

        <div className='[&>h1]:text-text-primary [&>h2]:text-text-primary [&>h3]:text-text-primary [&>h4]:text-text-primary [&>p]:text-text-primary [&>blockquote]:text-text-primary [&>blockquote]:border-border-primary [&>code]:text-text-primary [&>code]:bg-code-bg [&>pre]:text-code-dark-text [&>pre]:bg-code-dark-bg [&>pre>code]:font-inherit [&>pre>code]:leading-inherit dark:[&>h1]:text-text-dark-primary dark:[&>h2]:text-text-dark-primary dark:[&>h3]:text-text-dark-primary dark:[&>h4]:text-text-dark-primary dark:[&>p]:text-text-dark-primary dark:[&>li]:text-text-dark-primary dark:[&>blockquote]:text-text-dark-primary dark:[&>blockquote]:border-border-dark-primary dark:[&>code]:text-text-dark-primary dark:[&>code]:bg-bg-dark-tertiary dark:[&>ol>li]:text-text-dark-primary dark:[&>ul>li]:text-text-dark-primary max-w-none [&>blockquote]:mt-[1.6em] [&>blockquote]:mb-[1.6em] [&>blockquote]:border-l-4 [&>blockquote]:pl-4 [&>blockquote]:font-[500] [&>blockquote]:italic [&>code]:rounded [&>code]:px-1 [&>code]:py-0.5 [&>code]:text-[14px] [&>code]:font-[600] [&>h1]:mt-0 [&>h1]:mb-[0.8888889em] [&>h1]:text-[2.25em] [&>h1]:leading-[1.1111111] [&>h1]:font-[800] [&>h2]:mt-[2em] [&>h2]:mb-[0.5em] [&>h2]:text-[1.5em] [&>h2]:leading-[1.3333333] [&>h2]:font-[700] [&>h3]:mt-[1.6em] [&>h3]:mb-[0.6em] [&>h3]:text-[1.25em] [&>h3]:leading-[1.6] [&>h3]:font-[600] [&>h4]:mt-[1.5em] [&>h4]:mb-[0.5em] [&>h4]:leading-[1.5] [&>h4]:font-[600] [&>li]:mb-[1.5em] [&>li]:text-[19px] [&>li]:leading-[1.421103] [&>li]:font-[400] [&>li]:tracking-[0.012em] [&>ol]:mt-[1.25em] [&>ol]:mb-[1.25em] [&>ol]:pl-[1.625em] [&>ol>li]:mb-[1.5em] [&>ol>li]:list-outside [&>ol>li]:list-decimal [&>ol>li]:text-[19px] [&>ol>li]:leading-[1.421103] [&>ol>li]:font-[400] [&>ol>li]:tracking-[0.012em] [&>p]:mb-[1.25em] [&>p]:text-[19px] [&>p]:leading-[1.421103] [&>p]:font-[400] [&>p]:tracking-[0.012em] [&>pre]:mt-[1.7142857em] [&>pre]:mb-[1.7142857em] [&>pre]:overflow-x-auto [&>pre]:rounded-lg [&>pre]:p-[0.8571429em_1.1428571em] [&>pre]:text-[14px] [&>pre]:leading-[1.7142857] [&>pre]:font-[400] [&>pre>code]:rounded-none [&>pre>code]:border-0 [&>pre>code]:bg-transparent [&>pre>code]:p-0 [&>pre>code]:font-[400] [&>pre>code]:text-inherit [&>ul]:mt-[1.25em] [&>ul]:mb-[1.25em] [&>ul]:pl-[1.625em] [&>ul>li]:mb-[1.5em] [&>ul>li]:list-outside [&>ul>li]:list-disc [&>ul>li]:text-[19px] [&>ul>li]:leading-[1.421103] [&>ul>li]:font-[400] [&>ul>li]:tracking-[0.012em]'>
          <MDXRemote source={post.content} components={{ a: MDXLink }} />
        </div>
      </article>
    </Layout>
  );
}
