'use client';

interface PullQuoteProps {
  children: React.ReactNode;
  author?: string;
  source?: string;
  className?: string;
}

export default function PullQuote({
  children,
  author,
  source,
  className = '',
}: PullQuoteProps) {
  return (
    <div className={`${className}`}>
      <blockquote className='relative my-16'>
        <div className='mb-2 text-3xl leading-tight font-normal tracking-normal text-gray-700 md:text-4xl dark:text-gray-300'>
          {children}
        </div>

        {(author || source) && (
          <footer className='text-sm font-normal tracking-wide text-gray-500 dark:text-gray-500'>
            {author && <cite className='not-italic'>{author}</cite>}
            {author && source && <span className='mx-2'>•</span>}
            {source && <span>{source}</span>}
          </footer>
        )}
      </blockquote>
    </div>
  );
}
