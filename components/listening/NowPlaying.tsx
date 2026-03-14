'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import type { NowPlayingData } from '@/lib/listening/types';

export default function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);

  const fetchNowPlaying = useCallback(async () => {
    try {
      const res = await fetch('/api/listening/now-playing');
      if (res.ok) {
        setData(await res.json());
      }
    } catch {
      // Silently fail — component hides itself on error
    }
  }, []);

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30_000);
    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

  if (!data?.track) return null;

  return (
    <div className='flex items-center gap-2'>
      {data.track.image && (
        <a
          href={data.track.url}
          target='_blank'
          rel='noopener noreferrer'
          className='shrink-0'
        >
          <Image
            src={data.track.image}
            alt={`${data.track.album} album art`}
            width={28}
            height={28}
            className='rounded'
            {...(data.track.blurDataURL
              ? { placeholder: 'blur', blurDataURL: data.track.blurDataURL }
              : {})}
          />
        </a>
      )}
      <div className='flex min-w-0 items-center gap-1.5'>
        {data.isPlaying && (
          <span className='now-playing-indicator flex items-center gap-0.5'>
            <span className='now-playing-bar' />
            <span className='now-playing-bar' />
            <span className='now-playing-bar' />
          </span>
        )}
        <a
          href={data.track.url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-text-primary dark:text-text-dark-primary truncate text-xs font-medium hover:underline'
        >
          {data.track.name}
        </a>
        <span className='text-text-muted dark:text-text-dark-muted hidden shrink-0 text-xs sm:inline'>
          {data.track.artist}
        </span>
      </div>
    </div>
  );
}
