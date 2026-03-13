'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

interface NowPlayingData {
  isPlaying: boolean;
  track?: {
    name: string;
    artist: string;
    album: string;
    image: string;
    url: string;
  };
}

interface RecentWatch {
  movie: {
    title: string;
    year: number;
    director: string;
    image: { cdn_url: string } | null;
  };
  watched_at: string;
  user_rating: number | null;
}

interface RecentRun {
  name: string;
  date: string;
  distance_mi: number;
  pace: string;
  strava_url: string;
}

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function NowListening() {
  const [data, setData] = useState<NowPlayingData | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/listening/now-playing');
      if (res.ok) setData(await res.json());
    } catch {
      // silent
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30_000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (!data?.track) return null;

  return (
    <Link
      href='/listening'
      className='hover-row-link flex items-baseline justify-between gap-4 py-2'
    >
      <span className='flex min-w-0 items-baseline gap-2'>
        <span className='text-text-primary dark:text-text-dark-primary truncate text-base'>
          {data.track.name}
        </span>
        <span className='text-text-muted dark:text-text-dark-muted hidden shrink-0 text-sm sm:inline'>
          {data.track.artist}
        </span>
      </span>
      <span className='text-text-muted dark:text-text-dark-muted shrink-0 text-sm'>
        {data.isPlaying ? 'Now' : 'Last played'}
      </span>
    </Link>
  );
}

function NowWatching() {
  const [watch, setWatch] = useState<RecentWatch | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/watching/recent?limit=1');
        if (res.ok) {
          const json = await res.json();
          if (json.data?.[0]) setWatch(json.data[0]);
        }
      } catch {
        // silent
      }
    }
    fetchData();
  }, []);

  if (!watch) return null;

  return (
    <Link
      href='/watching'
      className='hover-row-link flex items-baseline justify-between gap-4 py-2'
    >
      <span className='flex min-w-0 items-baseline gap-2'>
        <span className='text-text-primary dark:text-text-dark-primary truncate text-base'>
          {watch.movie.title}
        </span>
        <span className='text-text-muted dark:text-text-dark-muted hidden shrink-0 text-sm sm:inline'>
          {watch.movie.director}
        </span>
      </span>
      <span className='text-text-muted dark:text-text-dark-muted shrink-0 text-sm'>
        {formatRelativeDate(watch.watched_at)}
      </span>
    </Link>
  );
}

function NowRunning() {
  const [run, setRun] = useState<RecentRun | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/running/recent?limit=1');
        if (res.ok) {
          const json = await res.json();
          if (json.data?.[0]) setRun(json.data[0]);
        }
      } catch {
        // silent
      }
    }
    fetchData();
  }, []);

  if (!run) return null;

  return (
    <Link
      href='/running'
      className='hover-row-link flex items-baseline justify-between gap-4 py-2'
    >
      <span className='flex min-w-0 items-baseline gap-2'>
        <span className='text-text-primary dark:text-text-dark-primary truncate text-base'>
          {run.distance_mi.toFixed(1)} mi
        </span>
        <span className='text-text-muted dark:text-text-dark-muted hidden shrink-0 text-sm sm:inline'>
          {run.pace}
        </span>
      </span>
      <span className='text-text-muted dark:text-text-dark-muted shrink-0 text-sm'>
        {formatRelativeDate(run.date)}
      </span>
    </Link>
  );
}

export default function NowSection() {
  return (
    <section className='mb-16'>
      <h2 className='text-text-muted dark:text-text-dark-muted mb-4 font-mono text-xs font-normal tracking-wider uppercase'>
        Now
      </h2>
      <div>
        <NowListening />
        <NowWatching />
        <NowRunning />
      </div>
    </section>
  );
}
