'use client';

import Image from 'next/image';
import type { TopItem } from '@/lib/listening/types';

interface AlbumGridProps {
  items: TopItem[];
  loading: boolean;
}

function SkeletonGrid() {
  return (
    <div className='grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5'>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className='bg-bg-secondary dark:bg-bg-dark-secondary aspect-square animate-pulse rounded-lg'
        />
      ))}
    </div>
  );
}

export default function AlbumGrid({ items, loading }: AlbumGridProps) {
  if (loading) return <SkeletonGrid />;
  if (items.length === 0) return null;

  return (
    <div className='grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5'>
      {items.map(item => (
        <a
          key={`${item.rank}-${item.name}`}
          href={item.url}
          target='_blank'
          rel='noopener noreferrer'
          className='group relative aspect-square overflow-hidden rounded-lg'
          title={`${item.name} — ${item.detail}`}
        >
          {item.image ? (
            <Image
              src={item.image}
              alt={`${item.name} by ${item.detail}`}
              width={300}
              height={300}
              className='h-full w-full object-cover transition-transform duration-200 group-hover:scale-105'
              {...(item.blurDataURL
                ? { placeholder: 'blur', blurDataURL: item.blurDataURL }
                : {})}
            />
          ) : (
            <div className='bg-bg-secondary dark:bg-bg-dark-secondary text-text-muted dark:text-text-dark-muted flex h-full w-full items-center justify-center text-xs'>
              No art
            </div>
          )}
          <div className='absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
            <div className='min-w-0'>
              <p className='truncate text-xs font-medium text-white'>
                {item.name}
              </p>
              <p className='truncate text-xs text-white/70'>{item.detail}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
