'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import ListeningTrends from '@/components/listening/ListeningTrends';
import type {
  ListeningYearResponse,
  ListeningStats,
  StreaksResponse,
} from '@/lib/rewind/types';
import { getImageUrl, getBlurDataURL } from '@/lib/rewind/images';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FIRST_YEAR = 2012;

const MONTH_LABELS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function StatBar({ stats }: { stats: { label: string; value: string }[] }) {
  if (stats.length === 0) return null;

  return (
    <div className='flex flex-wrap gap-x-6 gap-y-1'>
      {stats.map(stat => (
        <div key={stat.label} className='flex items-baseline gap-1.5'>
          <span className='text-text-primary dark:text-text-dark-primary text-sm font-semibold'>
            {stat.value}
          </span>
          <span className='text-text-muted dark:text-text-dark-muted text-xs'>
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function TopArtistsGrid({
  artists,
}: {
  artists: ListeningYearResponse['top_artists'];
}) {
  if (artists.length === 0) return null;

  return (
    <section className='mb-16'>
      <h2 className='text-text-muted dark:text-text-dark-muted mb-4 font-mono text-xs font-normal tracking-wider uppercase'>
        Top Artists
      </h2>
      <div className='space-y-0'>
        {artists.map((artist, i) => (
          <div key={artist.id} className='flex items-center gap-3 py-2'>
            <span className='text-text-muted dark:text-text-dark-muted w-5 shrink-0 text-right text-sm'>
              {i + 1}
            </span>
            {artist.image && (
              <Image
                src={getImageUrl(artist.image)}
                alt={artist.name}
                width={32}
                height={32}
                className='shrink-0 rounded-full object-cover'
                {...(getBlurDataURL(artist.image)
                  ? {
                      placeholder: 'blur',
                      blurDataURL: getBlurDataURL(artist.image),
                    }
                  : {})}
              />
            )}
            <span className='text-text-primary dark:text-text-dark-primary min-w-0 truncate text-sm'>
              {artist.name}
            </span>
            <span className='text-text-muted dark:text-text-dark-muted ml-auto shrink-0 text-xs'>
              {artist.scrobbles.toLocaleString()} plays
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function TopAlbumsGrid({
  albums,
}: {
  albums: ListeningYearResponse['top_albums'];
}) {
  if (albums.length === 0) return null;

  return (
    <section className='mb-16'>
      <h2 className='text-text-muted dark:text-text-dark-muted mb-4 font-mono text-xs font-normal tracking-wider uppercase'>
        Top Albums
      </h2>
      <div className='grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5'>
        {albums.map(album => (
          <div
            key={album.id}
            className='group relative aspect-square overflow-hidden rounded-lg'
            title={`${album.name} — ${album.artist}`}
          >
            {album.image ? (
              <Image
                src={getImageUrl(album.image)}
                alt={`${album.name} by ${album.artist}`}
                width={300}
                height={300}
                className='h-full w-full object-cover transition-transform duration-200 group-hover:scale-105'
                {...(getBlurDataURL(album.image)
                  ? {
                      placeholder: 'blur',
                      blurDataURL: getBlurDataURL(album.image),
                    }
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
                  {album.name}
                </p>
                <p className='truncate text-xs text-white/70'>{album.artist}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TopTracksList({
  tracks,
}: {
  tracks: ListeningYearResponse['top_tracks'];
}) {
  if (tracks.length === 0) return null;

  return (
    <section className='mb-16'>
      <h2 className='text-text-muted dark:text-text-dark-muted mb-4 font-mono text-xs font-normal tracking-wider uppercase'>
        Top Tracks
      </h2>
      <div className='space-y-0'>
        {tracks.map((track, i) => (
          <div
            key={track.id}
            className='flex items-baseline justify-between gap-4 py-2'
          >
            <span className='flex min-w-0 items-baseline gap-3'>
              <span className='text-text-muted dark:text-text-dark-muted w-5 shrink-0 text-right text-sm'>
                {i + 1}
              </span>
              <span className='text-text-primary dark:text-text-dark-primary truncate text-sm'>
                {track.name}
              </span>
              <span className='text-text-muted dark:text-text-dark-muted hidden shrink-0 text-xs sm:inline'>
                {track.artist}
              </span>
            </span>
            <span className='text-text-muted dark:text-text-dark-muted shrink-0 text-xs'>
              {track.scrobbles.toLocaleString()} plays
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ListeningContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialYear = searchParams.get('year')
    ? parseInt(searchParams.get('year')!)
    : null;
  const initialMonth = searchParams.get('month')
    ? parseInt(searchParams.get('month')!)
    : null;

  const [selectedYear, setSelectedYear] = useState<number | null>(
    initialYear && !isNaN(initialYear) ? initialYear : null
  );
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    initialMonth &&
      !isNaN(initialMonth) &&
      initialMonth >= 1 &&
      initialMonth <= 12
      ? initialMonth
      : null
  );
  const [yearData, setYearData] = useState<ListeningYearResponse | null>(null);
  const [monthData, setMonthData] = useState<ListeningYearResponse | null>(
    null
  );
  const [allTimeStats, setAllTimeStats] = useState<ListeningStats | null>(null);
  const [streaks, setStreaks] = useState<StreaksResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [monthLoading, setMonthLoading] = useState(false);

  const currentYear = new Date().getFullYear();

  // Fetch all-time stats + streaks once
  useEffect(() => {
    async function fetchAllTime() {
      try {
        const [statsRes, streaksRes] = await Promise.all([
          fetch('/api/listening/stats'),
          fetch('/api/listening/streaks'),
        ]);
        if (statsRes.ok) setAllTimeStats(await statsRes.json());
        if (streaksRes.ok) setStreaks(await streaksRes.json());
      } catch {
        // silent
      }
    }
    fetchAllTime();
  }, []);

  // Fetch full year data (for chart + default top lists)
  const fetchYearData = useCallback(async (year: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/listening/year/${year}`);
      if (res.ok) {
        setYearData(await res.json());
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchYearData(selectedYear ?? currentYear);
  }, [selectedYear, currentYear, fetchYearData]);

  // Fetch month-scoped data when a month is selected
  useEffect(() => {
    if (!selectedMonth) {
      setMonthData(null);
      return;
    }
    const year = selectedYear ?? currentYear;
    async function fetchMonth() {
      setMonthLoading(true);
      try {
        const res = await fetch(
          `/api/listening/year/${year}?month=${selectedMonth}`
        );
        if (res.ok) {
          setMonthData(await res.json());
        }
      } catch {
        // silent
      } finally {
        setMonthLoading(false);
      }
    }
    fetchMonth();
  }, [selectedMonth, selectedYear, currentYear]);

  function updateUrl(year: number | null, month: number | null) {
    const params = new URLSearchParams();
    if (year) params.set('year', String(year));
    if (month) params.set('month', String(month));
    const qs = params.toString();
    router.replace(qs ? `/listening?${qs}` : '/listening', { scroll: false });
  }

  function handleYearChange(value: string | null) {
    const year = !value || value === 'all' ? null : parseInt(value);
    setSelectedYear(year);
    setSelectedMonth(null);
    setMonthData(null);
    updateUrl(year, null);
  }

  function handleMonthChange(value: string | null) {
    const month = !value || value === 'all' ? null : parseInt(value);
    setSelectedMonth(month);
    updateUrl(selectedYear, month);
  }

  const displayYear = selectedYear ?? currentYear;
  const monthlyData = yearData?.monthly ?? [];
  const trendPoints = monthlyData.map(m => ({
    period: m.month,
    value: m.scrobbles,
  }));

  // Use month-scoped data for top lists when a month is selected, otherwise year data
  const displayData = selectedMonth ? monthData : yearData;
  const isDisplayLoading = selectedMonth ? monthLoading : loading;

  // Build scope label for chart heading
  const scopeLabel = selectedMonth
    ? `${MONTH_LABELS[selectedMonth - 1]} ${displayYear}`
    : selectedYear
      ? String(displayYear)
      : 'All Time';

  // Build year options
  const yearOptions: { value: string; label: string }[] = [
    { value: 'all', label: 'All Time' },
  ];
  for (let y = currentYear; y >= FIRST_YEAR; y--) {
    yearOptions.push({ value: String(y), label: String(y) });
  }

  // Build scoped stats
  const scopedStats =
    displayData && !isDisplayLoading
      ? [
          {
            label: 'scrobbles',
            value: displayData.total_scrobbles.toLocaleString(),
          },
          {
            label: 'artists',
            value: displayData.unique_artists.toLocaleString(),
          },
          {
            label: 'albums',
            value: displayData.unique_albums.toLocaleString(),
          },
          {
            label: 'tracks',
            value: displayData.unique_tracks.toLocaleString(),
          },
        ]
      : [];

  return (
    <>
      {/* Subtitle with all-time stats */}
      <p className='text-text-secondary dark:text-text-dark-secondary mb-8 text-sm leading-relaxed'>
        {allTimeStats
          ? `${allTimeStats.total_scrobbles.toLocaleString()} scrobbles across ${allTimeStats.unique_artists.toLocaleString()} artists since 2012.`
          : 'What I\u2019ve been listening to, tracked since 2012.'}
      </p>

      {/* Controls bar: dropdowns + now playing */}
      <div className='mb-10 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Select
            value={selectedYear ? String(selectedYear) : 'all'}
            onValueChange={handleYearChange}
          >
            <SelectTrigger size='sm'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedYear && (
            <>
              <span className='text-text-muted dark:text-text-dark-muted text-xs'>
                /
              </span>
              <Select
                value={selectedMonth ? String(selectedMonth) : 'all'}
                onValueChange={handleMonthChange}
              >
                <SelectTrigger size='sm'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Months</SelectItem>
                  {MONTH_LABELS.map((label, i) => (
                    <SelectItem key={label} value={String(i + 1)}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        </div>
      </div>

      {/* Chart */}
      <section className='mb-10'>
        {selectedYear ? (
          trendPoints.length > 0 && <ListeningTrends data={trendPoints} />
        ) : (
          <ListeningTrends />
        )}
      </section>

      {/* Scoped stats bar */}
      {scopedStats.length > 0 && (
        <div className='mb-12'>
          <StatBar stats={scopedStats} />
        </div>
      )}

      {/* Top Lists */}
      {displayData && !isDisplayLoading && (
        <>
          <TopArtistsGrid artists={displayData.top_artists} />
          <TopAlbumsGrid albums={displayData.top_albums} />
          <TopTracksList tracks={displayData.top_tracks} />
        </>
      )}
    </>
  );
}
