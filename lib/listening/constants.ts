import type { TimePeriod } from './types';

export const TIME_PERIODS: { value: TimePeriod; label: string }[] = [
  { value: '7day', label: '7 days' },
  { value: '1month', label: '1 month' },
  { value: '3month', label: '3 months' },
  { value: '6month', label: '6 months' },
  { value: '12month', label: '12 months' },
  { value: 'overall', label: 'All time' },
];
