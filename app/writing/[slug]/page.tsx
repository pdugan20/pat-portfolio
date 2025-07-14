import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Layout from '@/components/Layout';
import { getBlogPost, getAllBlogSlugs } from '@/lib/mdx';
import MDXLink from '@/components/MDXLink';
import ColorSwatch from '@/components/swatches/ColorSwatch';
import FontSizeSwatch from '@/components/swatches/FontSizeSwatch';
import TextStyleSwatch from '@/components/swatches/TextStyleSwatch';
import PostImage from '@/components/PostImage';
import PostMovie from '@/components/PostMovie';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getBlogPost(resolvedParams.slug);

  if (!post) {
    return {
      title: `Post Not Found - ${SITE_CONFIG.author}`,
    };
  }

  return {
    title: `${post.title} - ${SITE_CONFIG.author}`,
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
      <div className='-mx-4 sm:-mx-6 lg:-mx-8'>
        <article className='text-text-primary mx-auto w-full max-w-[653px] px-4 pt-8 font-sans leading-relaxed sm:px-6 lg:px-0'>
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

          <div className='mdx-content'>
            <MDXRemote
              source={post.content}
              components={{
                a: MDXLink,
                ColorSwatch,
                FontSizeSwatch,
                TextStyleSwatch,
                PostImage,
                PostMovie,
              }}
            />
          </div>
        </article>
      </div>
    </Layout>
  );
}
