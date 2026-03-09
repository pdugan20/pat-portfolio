'use client';

import { useEffect, useState, useCallback } from 'react';
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
    <div className='mb-12 flex items-center gap-3'>
      {data.track.image && (
        <a
          href={data.track.url}
          target='_blank'
          rel='noopener noreferrer'
          className='shrink-0'
        >
          <img
            src={data.track.image}
            alt={`${data.track.album} album art`}
            width={48}
            height={48}
            className='rounded-md'
            loading='lazy'
          />
        </a>
      )}
      <div className='min-w-0 flex-1'>
        <div className='flex items-center gap-2'>
          {data.isPlaying && (
            <span className='now-playing-indicator flex items-center gap-1'>
              <span className='now-playing-bar' />
              <span className='now-playing-bar' />
              <span className='now-playing-bar' />
            </span>
          )}
          <span className='text-text-muted dark:text-text-dark-muted text-xs'>
            {data.isPlaying ? 'Now playing' : 'Last played'}
          </span>
        </div>
        <a
          href={data.track.url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-text-primary dark:text-text-dark-primary block truncate text-sm font-medium hover:underline'
        >
          {data.track.name}
        </a>
        <span className='text-text-secondary dark:text-text-dark-secondary block truncate text-sm'>
          {data.track.artist}
        </span>
      </div>
    </div>
  );
}
