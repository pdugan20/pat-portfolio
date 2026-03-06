import Image from 'next/image';

interface RelatedPost {
  title: string;
  slug: string;
  description: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
  readingTime?: number;
}

interface RelatedWritingProps {
  posts: RelatedPost[];
}

export default function RelatedWriting({ posts }: RelatedWritingProps) {
  return (
    <div className='border-border-primary mt-8 border-t pt-6 dark:border-white/[0.08]'>
      <h3 className='text-text-muted dark:text-text-dark-muted mb-4 font-mono text-xs font-normal tracking-wider uppercase'>
        Related writing
      </h3>
      <ul className='space-y-0'>
        {posts.map((post, index) => (
          <li
            key={post.slug}
            className={`flex gap-4 ${
              index < posts.length - 1
                ? 'border-border-primary border-b pb-5 dark:border-white/[0.08]'
                : 'pt-5'
            }`}
          >
            <a
              href={`/writing/${post.slug}`}
              className='group -m-2 flex w-full cursor-pointer items-center gap-4 rounded-lg p-2 transition-opacity hover:opacity-80'
            >
              <div className='h-24 w-40 flex-shrink-0 overflow-hidden rounded-lg'>
                <Image
                  src={post.imageSrc}
                  alt={post.imageAlt}
                  width={160}
                  height={96}
                  className='h-full w-full rounded-lg object-cover object-top transition-transform duration-500 group-hover:scale-105'
                  style={{ transformOrigin: 'center' }}
                />
              </div>
              <div className='min-w-0 flex-1'>
                <h4 className='text-text-primary dark:text-text-dark-primary mb-1 text-base leading-snug font-medium'>
                  {post.title}
                </h4>
                <p className='text-text-secondary dark:text-text-dark-secondary mb-1 line-clamp-2 text-sm leading-relaxed'>
                  {post.description}
                </p>
                <div className='text-text-muted dark:text-text-dark-muted flex items-center gap-2 text-sm font-normal'>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {post.readingTime && (
                    <>
                      <span>&middot;</span>
                      <span>{post.readingTime} min read</span>
                    </>
                  )}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
