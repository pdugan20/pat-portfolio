'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { getImageUrl, getBlurDataURL } from '@/lib/rewind/images';
import type {
  WatchStats,
  WatchEvent,
  Movie,
  GenreStat,
  DecadeStat,
  ReviewEntry,
} from '@/lib/watching/types';
import type { PaginationMeta } from '@/lib/rewind/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ViewMode = 'profile' | 'films';
type FilmsLayout = 'grid' | 'list';
type SortOption = 'watched_at' | 'title' | 'year' | 'rating';

// --- Stats Header ---

function StatsHeader({ stats }: { stats: WatchStats }) {
  return (
    <div className='mb-8 flex flex-wrap gap-x-6 gap-y-1'>
      <div className='flex items-baseline gap-1.5'>
        <span className='text-text-primary dark:text-text-dark-primary text-lg font-semibold'>
          {stats.total_movies.toLocaleString()}
        </span>
        <span className='text-text-muted dark:text-text-dark-muted text-xs uppercase'>
          Films
        </span>
      </div>
      <div className='flex items-baseline gap-1.5'>
        <span className='text-text-primary dark:text-text-dark-primary text-lg font-semibold'>
          {stats.movies_this_year}
        </span>
        <span className='text-text-muted dark:text-text-dark-muted text-xs uppercase'>
          This Year
        </span>
      </div>
      <div className='flex items-baseline gap-1.5'>
        <span className='text-text-primary dark:text-text-dark-primary text-lg font-semibold'>
          {stats.total_watch_time_hours.toLocaleString()}
        </span>
        <span className='text-text-muted dark:text-text-dark-muted text-xs uppercase'>
          Hours
        </span>
      </div>
    </div>
  );
}

// --- Recent Activity (poster row) ---

function RecentActivity({ watches }: { watches: WatchEvent[] }) {
  if (watches.length === 0) return null;

  // Deduplicate by movie id
  const seen = new Set<number>();
  const deduped = watches.filter(w => {
    if (seen.has(w.movie.id)) return false;
    seen.add(w.movie.id);
    return true;
  });

  return (
    <section className='mb-12'>
      <h2 className='text-text-muted dark:text-text-dark-muted mb-4 font-mono text-xs font-normal tracking-wider uppercase'>
        Recent Activity
      </h2>
      <div className='flex gap-2 overflow-x-auto'>
        {deduped.slice(0, 5).map((watch, i) => (
          <div
            key={`${watch.movie.id}-${i}`}
            className='group relative aspect-[2/3] w-28 shrink-0 overflow-hidden rounded-lg sm:w-32'
          >
            {watch.movie.image ? (
              <Image
                src={getImageUrl(watch.movie.image)}
                alt={watch.movie.title}
                width={200}
                height={300}
                className='h-full w-full object-cover transition-transform duration-200 group-hover:scale-105'
                {...(getBlurDataURL(watch.movie.image)
                  ? {
                      placeholder: 'blur',
                      blurDataURL: getBlurDataURL(watch.movie.image),
                    }
                  : {})}
              />
            ) : (
              <div className='bg-bg-secondary dark:bg-bg-dark-secondary text-text-muted dark:text-text-dark-muted flex h-full w-full items-center justify-center text-xs'>
                No poster
              </div>
            )}
            <div className='absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
              <div className='min-w-0'>
                <p className='truncate text-xs font-medium text-white'>
                  {watch.movie.title}
                </p>
                <p className='truncate text-xs text-white/70'>
                  {watch.movie.year}
                  {watch.user_rating != null && ` · ${watch.user_rating}★`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- Recent Reviews ---

function RecentReviews({ reviews }: { reviews: ReviewEntry[] }) {
  if (reviews.length === 0) return null;

  return (
    <section className='mb-12'>
      <h2 className='text-text-muted dark:text-text-dark-muted mb-4 font-mono text-xs font-normal tracking-wider uppercase'>
        Recent Reviews
      </h2>
      <div className='space-y-6'>
        {reviews.map((entry, i) => (
          <div key={`${entry.movie.id}-${i}`} className='flex gap-3'>
            {entry.movie.image && (
              <Image
                src={getImageUrl(entry.movie.image)}
                alt={entry.movie.title}
                width={48}
                height={72}
                className='h-18 w-12 shrink-0 rounded object-cover'
                {...(getBlurDataURL(entry.movie.image)
                  ? {
                      placeholder: 'blur',
                      blurDataURL: getBlurDataURL(entry.movie.image),
                    }
                  : {})}
              />
            )}
            <div className='min-w-0 flex-1'>
              <div className='flex items-baseline gap-2'>
                <span className='text-text-primary dark:text-text-dark-primary truncate text-sm font-medium'>
                  {entry.movie.title}
                </span>
                <span className='text-text-muted dark:text-text-dark-muted shrink-0 text-xs'>
                  {entry.movie.year}
                </span>
                {entry.user_rating != null && (
                  <span className='text-text-muted dark:text-text-dark-muted shrink-0 text-xs'>
                    {entry.user_rating}★
                  </span>
                )}
              </div>
              <p className='text-text-secondary dark:text-text-dark-secondary mt-1 line-clamp-3 text-sm leading-relaxed'>
                {entry.review}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- Films Grid ---

function FilmsGrid({
  movies,
  pagination,
  onLoadMore,
  loading,
}: {
  movies: Movie[];
  pagination: PaginationMeta | null;
  onLoadMore: () => void;
  loading: boolean;
}) {
  if (movies.length === 0 && !loading) return null;

  return (
    <>
      <div className='grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6'>
        {movies.map(movie => (
          <div
            key={movie.id}
            className='group relative aspect-[2/3] overflow-hidden rounded-lg'
            title={`${movie.title} (${movie.year})`}
          >
            {movie.image ? (
              <Image
                src={getImageUrl(movie.image)}
                alt={movie.title}
                width={200}
                height={300}
                className='h-full w-full object-cover transition-transform duration-200 group-hover:scale-105'
                {...(getBlurDataURL(movie.image)
                  ? {
                      placeholder: 'blur',
                      blurDataURL: getBlurDataURL(movie.image),
                    }
                  : {})}
              />
            ) : (
              <div className='bg-bg-secondary dark:bg-bg-dark-secondary text-text-muted dark:text-text-dark-muted flex h-full w-full items-center justify-center p-1 text-center text-xs'>
                {movie.title}
              </div>
            )}
            <div className='absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
              <div className='min-w-0'>
                <p className='truncate text-xs font-medium text-white'>
                  {movie.title}
                </p>
                <p className='truncate text-xs text-white/70'>
                  {movie.year}
                  {movie.director && ` · ${movie.director}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {pagination && pagination.page < pagination.total_pages && (
        <button
          onClick={onLoadMore}
          disabled={loading}
          className='text-text-muted dark:text-text-dark-muted hover:text-text-primary dark:hover:text-text-dark-primary mt-4 w-full py-2 text-center text-xs font-medium transition-colors disabled:opacity-50'
        >
          {loading ? 'Loading...' : 'Load more'}
        </button>
      )}
    </>
  );
}

// --- Films List ---

function FilmsList({
  movies,
  pagination,
  onLoadMore,
  loading,
}: {
  movies: Movie[];
  pagination: PaginationMeta | null;
  onLoadMore: () => void;
  loading: boolean;
}) {
  if (movies.length === 0 && !loading) return null;

  return (
    <>
      <div className='space-y-0'>
        {movies.map(movie => (
          <div
            key={movie.id}
            className='flex items-center gap-3 border-b border-neutral-100 py-2.5 last:border-0 dark:border-neutral-800'
          >
            {movie.image ? (
              <Image
                src={getImageUrl(movie.image)}
                alt={movie.title}
                width={32}
                height={48}
                className='h-12 w-8 shrink-0 rounded object-cover'
                {...(getBlurDataURL(movie.image)
                  ? {
                      placeholder: 'blur',
                      blurDataURL: getBlurDataURL(movie.image),
                    }
                  : {})}
              />
            ) : (
              <div className='bg-bg-secondary dark:bg-bg-dark-secondary h-12 w-8 shrink-0 rounded' />
            )}
            <div className='min-w-0 flex-1'>
              <span className='text-text-primary dark:text-text-dark-primary truncate text-sm font-medium'>
                {movie.title}
              </span>
              <div className='text-text-muted dark:text-text-dark-muted flex items-center gap-2 text-xs'>
                <span>{movie.year}</span>
                {movie.director && (
                  <>
                    <span>·</span>
                    <span className='truncate'>{movie.director}</span>
                  </>
                )}
                {movie.genres.length > 0 && (
                  <>
                    <span>·</span>
                    <span className='hidden truncate sm:inline'>
                      {movie.genres.slice(0, 2).join(', ')}
                    </span>
                  </>
                )}
              </div>
            </div>
            {movie.rating && (
              <span className='text-text-muted dark:text-text-dark-muted shrink-0 text-xs'>
                {movie.rating}
              </span>
            )}
          </div>
        ))}
      </div>
      {pagination && pagination.page < pagination.total_pages && (
        <button
          onClick={onLoadMore}
          disabled={loading}
          className='text-text-muted dark:text-text-dark-muted hover:text-text-primary dark:hover:text-text-dark-primary mt-4 w-full py-2 text-center text-xs font-medium transition-colors disabled:opacity-50'
        >
          {loading ? 'Loading...' : 'Load more'}
        </button>
      )}
    </>
  );
}

// --- Main Content ---

export default function WatchingContent() {
  const [view, setView] = useState<ViewMode>('profile');
  const [filmsLayout, setFilmsLayout] = useState<FilmsLayout>('grid');

  // Profile data
  const [stats, setStats] = useState<WatchStats | null>(null);
  const [recent, setRecent] = useState<WatchEvent[]>([]);
  const [reviews, setReviews] = useState<ReviewEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Films data
  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesPagination, setMoviesPagination] =
    useState<PaginationMeta | null>(null);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [sort, setSort] = useState<SortOption>('watched_at');
  const [genreFilter, setGenreFilter] = useState<string | null>(null);
  const [decadeFilter, setDecadeFilter] = useState<string | null>(null);

  // Filter options
  const [genreOptions, setGenreOptions] = useState<GenreStat[]>([]);
  const [decadeOptions, setDecadeOptions] = useState<DecadeStat[]>([]);

  // Fetch profile data once
  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const [statsRes, recentRes, reviewsRes, genresRes, decadesRes] =
          await Promise.all([
            fetch('/api/watching/stats'),
            fetch('/api/watching/recent?limit=10'),
            fetch('/api/watching/reviews?limit=5'),
            fetch('/api/watching/stats/genres'),
            fetch('/api/watching/stats/decades'),
          ]);

        if (statsRes.ok) {
          const json = await statsRes.json();
          setStats(json.data ?? json);
        }
        if (recentRes.ok) {
          const json = await recentRes.json();
          setRecent(json.data ?? []);
        }
        if (reviewsRes.ok) {
          const json = await reviewsRes.json();
          setReviews(json.data ?? []);
        }
        if (genresRes.ok) {
          const json = await genresRes.json();
          setGenreOptions(json.data ?? []);
        }
        if (decadesRes.ok) {
          const json = await decadesRes.json();
          setDecadeOptions(json.data ?? []);
        }
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // Fetch films when filters/sort change or when switching to films view
  const fetchMovies = useCallback(
    async (page: number = 1, append: boolean = false) => {
      setMoviesLoading(true);
      const params = new URLSearchParams({
        limit: '30',
        sort,
        page: String(page),
      });
      if (genreFilter) params.set('genre', genreFilter);
      if (decadeFilter) params.set('decade', decadeFilter);

      try {
        const res = await fetch(`/api/watching/movies?${params}`);
        if (res.ok) {
          const json = await res.json();
          if (append) {
            setMovies(prev => [...prev, ...(json.data ?? [])]);
          } else {
            setMovies(json.data ?? []);
          }
          setMoviesPagination(json.pagination ?? null);
        }
      } catch {
        // silent
      } finally {
        setMoviesLoading(false);
      }
    },
    [sort, genreFilter, decadeFilter]
  );

  // Refetch when switching to films view or changing filters
  useEffect(() => {
    if (view === 'films') {
      fetchMovies(1, false);
    }
  }, [view, fetchMovies]);

  const loadMoreMovies = useCallback(() => {
    if (!moviesPagination || moviesLoading) return;
    fetchMovies(moviesPagination.page + 1, true);
  }, [moviesPagination, moviesLoading, fetchMovies]);

  if (loading) {
    return (
      <p className='text-text-muted dark:text-text-dark-muted mt-8 text-sm'>
        Loading...
      </p>
    );
  }

  return (
    <>
      {/* Stats */}
      {stats && <StatsHeader stats={stats} />}

      {/* View toggle */}
      <div className='mb-6 flex items-center gap-4 border-b border-neutral-200 dark:border-neutral-800'>
        <button
          onClick={() => setView('profile')}
          className={`pb-2 font-mono text-xs tracking-wider uppercase transition-colors ${
            view === 'profile'
              ? 'text-text-primary dark:text-text-dark-primary border-b-2 border-current font-medium'
              : 'text-text-muted dark:text-text-dark-muted hover:text-text-secondary dark:hover:text-text-dark-secondary'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setView('films')}
          className={`pb-2 font-mono text-xs tracking-wider uppercase transition-colors ${
            view === 'films'
              ? 'text-text-primary dark:text-text-dark-primary border-b-2 border-current font-medium'
              : 'text-text-muted dark:text-text-dark-muted hover:text-text-secondary dark:hover:text-text-dark-secondary'
          }`}
        >
          Films
        </button>
      </div>

      {view === 'profile' ? (
        <>
          <RecentActivity watches={recent} />
          <RecentReviews reviews={reviews} />
        </>
      ) : (
        <>
          {/* Filters bar */}
          <div className='mb-6 flex flex-wrap items-center gap-3'>
            <Select
              value={genreFilter ?? 'all'}
              onValueChange={v => setGenreFilter(v === 'all' ? null : v)}
            >
              <SelectTrigger size='sm'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Genres</SelectItem>
                {genreOptions.map(g => (
                  <SelectItem key={g.name} value={g.name}>
                    {g.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={decadeFilter ?? 'all'}
              onValueChange={v => setDecadeFilter(v === 'all' ? null : v)}
            >
              <SelectTrigger size='sm'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Decades</SelectItem>
                {decadeOptions.map(d => (
                  <SelectItem key={d.decade} value={String(d.decade)}>
                    {d.decade}s
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={v => setSort(v as SortOption)}>
              <SelectTrigger size='sm'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='watched_at'>Date Watched</SelectItem>
                <SelectItem value='title'>Title</SelectItem>
                <SelectItem value='year'>Release Year</SelectItem>
                <SelectItem value='rating'>Rating</SelectItem>
              </SelectContent>
            </Select>

            {/* Grid/List toggle */}
            <div className='ml-auto flex gap-1'>
              <button
                onClick={() => setFilmsLayout('grid')}
                className={`rounded p-1.5 transition-colors ${
                  filmsLayout === 'grid'
                    ? 'bg-bg-secondary dark:bg-bg-dark-secondary text-text-primary dark:text-text-dark-primary'
                    : 'text-text-muted dark:text-text-dark-muted hover:text-text-secondary dark:hover:text-text-dark-secondary'
                }`}
                title='Grid view'
              >
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                >
                  <rect x='1' y='1' width='5' height='5' rx='0.5' />
                  <rect x='8' y='1' width='5' height='5' rx='0.5' />
                  <rect x='1' y='8' width='5' height='5' rx='0.5' />
                  <rect x='8' y='8' width='5' height='5' rx='0.5' />
                </svg>
              </button>
              <button
                onClick={() => setFilmsLayout('list')}
                className={`rounded p-1.5 transition-colors ${
                  filmsLayout === 'list'
                    ? 'bg-bg-secondary dark:bg-bg-dark-secondary text-text-primary dark:text-text-dark-primary'
                    : 'text-text-muted dark:text-text-dark-muted hover:text-text-secondary dark:hover:text-text-dark-secondary'
                }`}
                title='List view'
              >
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                >
                  <line x1='1' y1='3' x2='13' y2='3' />
                  <line x1='1' y1='7' x2='13' y2='7' />
                  <line x1='1' y1='11' x2='13' y2='11' />
                </svg>
              </button>
            </div>
          </div>

          {/* Films display */}
          {filmsLayout === 'grid' ? (
            <FilmsGrid
              movies={movies}
              pagination={moviesPagination}
              onLoadMore={loadMoreMovies}
              loading={moviesLoading}
            />
          ) : (
            <FilmsList
              movies={movies}
              pagination={moviesPagination}
              onLoadMore={loadMoreMovies}
              loading={moviesLoading}
            />
          )}
        </>
      )}
    </>
  );
}
