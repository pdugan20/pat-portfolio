'use client';

import type { TopItem } from '@/lib/listening/types';
import HoverList from '@/components/HoverList';

interface TopListProps {
  items: TopItem[];
  loading: boolean;
}

function SkeletonRows() {
  return (
    <div className='space-y-3'>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className='flex items-center gap-3 py-2'>
          <div className='bg-bg-secondary dark:bg-bg-dark-secondary h-4 w-4 animate-pulse rounded' />
          <div className='bg-bg-secondary dark:bg-bg-dark-secondary h-4 flex-1 animate-pulse rounded' />
          <div className='bg-bg-secondary dark:bg-bg-dark-secondary h-4 w-12 animate-pulse rounded' />
        </div>
      ))}
    </div>
  );
}

export default function TopList({ items, loading }: TopListProps) {
  if (loading) return <SkeletonRows />;
  if (items.length === 0) return null;

  return (
    <HoverList>
      {items.map(item => (
        <a
          key={`${item.rank}-${item.name}`}
          href={item.url}
          target='_blank'
          rel='noopener noreferrer'
          className='hover-row-link flex items-baseline justify-between gap-4 py-2'
        >
          <span className='flex min-w-0 items-baseline gap-3'>
            <span className='text-text-muted dark:text-text-dark-muted w-5 shrink-0 text-right text-sm'>
              {item.rank}
            </span>
            <span className='text-text-primary dark:text-text-dark-primary truncate text-base'>
              {item.name}
            </span>
            {item.detail && (
              <span className='text-text-muted dark:text-text-dark-muted hidden shrink-0 text-sm sm:inline'>
                {item.detail}
              </span>
            )}
          </span>
          <span className='text-text-muted dark:text-text-dark-muted shrink-0 text-sm'>
            {item.playcount.toLocaleString()} plays
          </span>
        </a>
      ))}
    </HoverList>
  );
}
