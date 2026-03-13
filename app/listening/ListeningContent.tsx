'use client';

import { useEffect, useState, useCallback } from 'react';
import type { TimePeriod, TopItem } from '@/lib/listening/types';
import TimePeriodSelector from '@/components/listening/TimePeriodSelector';
import TopList from '@/components/listening/TopList';
import AlbumGrid from '@/components/listening/AlbumGrid';
import YearSelector from '@/components/YearSelector';
import ListeningCalendar from '@/components/listening/ListeningCalendar';
import ListeningTrends from '@/components/listening/ListeningTrends';

const FIRST_YEAR = 2012;

function useTopData(endpoint: string, period: TimePeriod) {
  const [items, setItems] = useState<TopItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/listening/${endpoint}?period=${period}`, {
        cache: 'no-store',
      });
      if (!res.ok) {
        setItems([]);
        return;
      }
      const data = await res.json();
      setItems(data.items ?? []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [endpoint, period]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { items, loading };
}

export default function ListeningContent() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [artistsPeriod, setArtistsPeriod] = useState<TimePeriod>('overall');
  const [albumsPeriod, setAlbumsPeriod] = useState<TimePeriod>('overall');
  const [tracksPeriod, setTracksPeriod] = useState<TimePeriod>('overall');

  const artists = useTopData('top-artists', artistsPeriod);
  const albums = useTopData('top-albums', albumsPeriod);
  const tracks = useTopData('top-tracks', tracksPeriod);

  return (
    <>
      {/* Year Selector */}
      <YearSelector value={year} onChange={setYear} startYear={FIRST_YEAR} />

      {/* Calendar Heatmap */}
      <section className='mb-16'>
        <h2 className='text-text-muted dark:text-text-dark-muted mb-4 font-mono text-xs font-normal tracking-wider uppercase'>
          Activity
        </h2>
        <ListeningCalendar year={year} />
      </section>

      {/* Monthly Trends */}
      <section className='mb-16'>
        <h2 className='text-text-muted dark:text-text-dark-muted mb-4 font-mono text-xs font-normal tracking-wider uppercase'>
          Monthly Scrobbles
        </h2>
        <ListeningTrends year={year} />
      </section>

      {/* Top Artists */}
      <section className='mb-16'>
        <h2 className='text-text-muted dark:text-text-dark-muted mb-4 font-mono text-xs font-normal tracking-wider uppercase'>
          Top Artists
        </h2>
        <TimePeriodSelector value={artistsPeriod} onChange={setArtistsPeriod} />
        <TopList items={artists.items} loading={artists.loading} />
      </section>

      {/* Top Albums */}
      <section className='mb-16'>
        <h2 className='text-text-muted dark:text-text-dark-muted mb-4 font-mono text-xs font-normal tracking-wider uppercase'>
          Top Albums
        </h2>
        <TimePeriodSelector value={albumsPeriod} onChange={setAlbumsPeriod} />
        <AlbumGrid items={albums.items} loading={albums.loading} />
      </section>

      {/* Top Tracks */}
      <section className='mb-16'>
        <h2 className='text-text-muted dark:text-text-dark-muted mb-4 font-mono text-xs font-normal tracking-wider uppercase'>
          Top Tracks
        </h2>
        <TimePeriodSelector value={tracksPeriod} onChange={setTracksPeriod} />
        <TopList items={tracks.items} loading={tracks.loading} />
      </section>
    </>
  );
}
