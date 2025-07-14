import Link from 'next/link';
import { BlogPost } from '@/lib/mdx';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className='bg-bg-primary dark:bg-bg-dark-secondary overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg'>
      <div className='p-6'>
        <div className='text-text-tertiary dark:text-text-dark-tertiary mb-2 flex items-center text-sm'>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
        <Link href={`/writing/${post.slug}`} className='block'>
          <h2 className='text-text-primary hover:text-primary dark:text-text-dark-primary dark:hover:text-primary-light mb-2 text-xl font-semibold'>
            {post.title}
          </h2>
        </Link>
        <p className='text-text-secondary dark:text-text-dark-secondary mb-4 line-clamp-3'>
          {post.description}
        </p>
        <div className='flex flex-wrap gap-2'>
          {post.tags.map(tag => (
            <span
              key={tag}
              className='bg-bg-tertiary text-text-secondary dark:bg-bg-dark-tertiary dark:text-text-dark-secondary inline-block rounded-full px-2 py-1 text-xs'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
