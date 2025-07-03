import Link from 'next/link';
import { BlogPost } from '@/lib/mdx';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className='overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg dark:bg-gray-800'>
      <div className='p-6'>
        <div className='mb-2 flex items-center text-sm text-gray-500 dark:text-gray-400'>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
        <Link href={`/blog/${post.slug}`} className='block'>
          <h2 className='mb-2 text-xl font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400'>
            {post.title}
          </h2>
        </Link>
        <p className='mb-4 line-clamp-3 text-gray-600 dark:text-gray-300'>
          {post.description}
        </p>
        <div className='flex flex-wrap gap-2'>
          {post.tags.map(tag => (
            <span
              key={tag}
              className='inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
