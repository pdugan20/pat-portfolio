import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Layout from '@/components/Layout';
import { getBlogPost, getAllBlogSlugs } from '@/lib/mdx';
import { getMDXComponents } from '@/lib/mdx-components';
import AboutAuthor from '@/components/AboutAuthor';
import RelatedWriting from '@/components/RelatedWriting';
import CodeBlockEnhancer from '@/components/CodeBlockEnhancer';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { rehypePrettyCodeOptions } from '@/lib/mdx-config';
import rehypePrettyCode from 'rehype-pretty-code';

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

  // Get only the components that are actually used in this post
  const components = await getMDXComponents(resolvedParams.slug);

  return (
    <Layout>
      <div className='-mx-4 sm:-mx-6 lg:-mx-8'>
        <article
          className='text-text-primary mx-auto w-full max-w-[653px] px-4 pt-8 pb-5 font-sans leading-relaxed sm:px-6 lg:px-0'
          data-slug={resolvedParams.slug}
        >
          <header className='mb-8'>
            <div className='mb-5 flex items-center'>
              <time
                dateTime={post.date}
                className='text-text-muted dark:text-text-dark-muted text-sm leading-[1.2857742857] font-semibold tracking-[-0.016em]'
              >
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <h1 className='text-text-primary dark:text-text-dark-primary mb-5 text-3xl leading-[1.08] font-bold tracking-[-0.003em] sm:text-4xl lg:text-5xl'>
              {post.title}
            </h1>
            <p className='text-text-primary dark:text-text-dark-primary mb-6 text-xl leading-[1.1666666667] font-medium tracking-[0.009em] sm:text-xl lg:text-2xl'>
              {post.description}
            </p>
          </header>

          <div className='mdx-content'>
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
                },
              }}
              components={components}
            />
            <CodeBlockEnhancer />
          </div>

          <AboutAuthor />

          {post.relatedWriting && post.relatedWriting.length > 0 && (
            <RelatedWriting posts={post.relatedWriting} />
          )}
        </article>
      </div>
    </Layout>
  );
}
