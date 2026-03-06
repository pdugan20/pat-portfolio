import { notFound } from 'next/navigation';
import Layout from '@/components/Layout';
import { posts } from '#content';
import { getMDXComponents } from '@/lib/mdx-components';
import { MDXContent } from '@/components/MDXContent';
import AboutAuthor from '@/components/AboutAuthor';
import RelatedWriting from '@/components/RelatedWriting';
import CodeBlockEnhancer from '@/components/CodeBlockEnhancer';
import PostHeader from '@/components/PostHeader';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = posts.find(p => p.slug === resolvedParams.slug);

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
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = posts.find(p => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const components = getMDXComponents(resolvedParams.slug);
  const readingTime = Math.max(1, Math.ceil(post.metadata.readingTime));

  return (
    <Layout>
      <article
        className='text-text-primary font-sans leading-relaxed'
        data-slug={resolvedParams.slug}
      >
        <PostHeader
          title={post.title}
          description={post.description}
          date={post.date}
          readingTime={readingTime}
        />

        <div className='mdx-content'>
          <MDXContent code={post.body} components={components} />
          <CodeBlockEnhancer />
        </div>

        <AboutAuthor />

        {post.relatedWriting && post.relatedWriting.length > 0 && (
          <RelatedWriting
            posts={post.relatedWriting.map(rp => {
              const fullPost = posts.find(p => p.slug === rp.slug);
              return {
                ...rp,
                readingTime: fullPost
                  ? Math.max(1, Math.ceil(fullPost.metadata.readingTime))
                  : undefined,
              };
            })}
          />
        )}
      </article>
    </Layout>
  );
}
