import Link from 'next/link';

interface PostHeaderProps {
  title: string;
  description: string;
  date: string;
  readingTime: number;
}

export default function PostHeader({
  title,
  description,
  date,
  readingTime,
}: PostHeaderProps) {
  const dateFormatted = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className='mb-8'>
      <Link
        href='/'
        className='text-text-muted dark:text-text-dark-muted mb-1 inline-block text-sm font-normal transition-opacity hover:opacity-50'
      >
        Patrick Dugan
      </Link>
      <div className='text-text-muted dark:text-text-dark-muted mb-5 flex items-center gap-2 text-sm font-normal'>
        <time dateTime={date}>{dateFormatted}</time>
        <span>&middot;</span>
        <span>{readingTime} min read</span>
      </div>
      <h1 className='text-text-primary dark:text-text-dark-primary mb-3 text-3xl font-semibold tracking-tight sm:text-4xl'>
        {title}
      </h1>
      <p className='text-text-secondary dark:text-text-dark-secondary mb-6 text-lg leading-relaxed'>
        {description}
      </p>
    </header>
  );
}
