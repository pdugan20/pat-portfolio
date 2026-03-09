import type { TimePeriod } from './types';

export const LASTFM_CONFIG = {
  username: 'pdugan20',
  apiBase: 'https://ws.audioscrobbler.com/2.0/',
  displayLimit: 10,
  fetchLimit: 30, // Over-fetch to account for filtered items
} as const;

export const DISCOGS_CONFIG = {
  username: 'patdugan',
  apiBase: 'https://api.discogs.com',
} as const;

export const TIME_PERIODS: { value: TimePeriod; label: string }[] = [
  { value: '7day', label: '7 days' },
  { value: '1month', label: '1 month' },
  { value: '3month', label: '3 months' },
  { value: '6month', label: '6 months' },
  { value: '12month', label: '12 months' },
  { value: 'overall', label: 'All time' },
];
