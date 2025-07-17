import Image from 'next/image';

interface RelatedPost {
  title: string;
  slug: string;
  description: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
}

interface RelatedWritingProps {
  posts: RelatedPost[];
}

export default function RelatedWriting({ posts }: RelatedWritingProps) {
  return (
    <div className='mt-[52px] border-t border-gray-200 pt-[52px] dark:border-gray-800'>
      <h3 className='text-text-primary dark:text-text-dark-primary mb-6 text-[24px] leading-[28px] font-[700]'>
        Related writing
      </h3>
      <ul className='space-y-0'>
        {posts.map((post, index) => (
          <li
            key={post.slug}
            className={`flex gap-4 ${
              index < posts.length - 1
                ? 'border-b border-gray-200 pb-6 dark:border-gray-800'
                : 'pt-6'
            }`}
          >
            <a
              href={`/writing/${post.slug}`}
              className='group -m-2 flex w-full cursor-pointer gap-4 rounded-lg p-2 transition-colors'
            >
              <div className='h-28 w-48 flex-shrink-0 overflow-hidden rounded-lg'>
                <Image
                  src={post.imageSrc}
                  alt={post.imageAlt}
                  width={192}
                  height={112}
                  className='h-full w-full rounded-lg object-cover object-top transition-transform duration-500 group-hover:scale-105'
                  style={{ transformOrigin: 'center' }}
                />
              </div>
              <div className='min-w-0 flex-1'>
                <h4 className='text-text-primary dark:text-text-dark-primary mb-2 text-[19px] leading-[1.2] font-[700]'>
                  {post.title}
                </h4>
                <p className='text-text-secondary dark:text-text-dark-secondary mb-2 line-clamp-2 text-sm leading-relaxed'>
                  {post.description}
                </p>
                <time
                  dateTime={post.date}
                  className='text-text-muted dark:text-text-dark-muted text-sm leading-[1.2857742857] font-[600] tracking-[-0.016em]'
                >
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
