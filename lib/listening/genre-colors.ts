import type { GenrePeriod } from '@/lib/rewind/types';

export type ColorScheme = 'blue' | 'blue-purple';

// A: Single-hue blue ramp — even steps from dark to light
const PALETTE_BLUE: { light: string; dark: string }[] = [
  { light: '#1e3a8a', dark: '#bfdbfe' }, // blue-900 / blue-200
  { light: '#1e40af', dark: '#93c5fd' }, // blue-800 / blue-300
  { light: '#1d4ed8', dark: '#60a5fa' }, // blue-700 / blue-400
  { light: '#2563eb', dark: '#3b82f6' }, // blue-600 / blue-500
  { light: '#3b82f6', dark: '#2563eb' }, // blue-500 / blue-600
  { light: '#60a5fa', dark: '#1d4ed8' }, // blue-400 / blue-700
  { light: '#93c5fd', dark: '#1e40af' }, // blue-300 / blue-800
  { light: '#bfdbfe', dark: '#1e3a8a' }, // blue-200 / blue-900
];

// B: Blue → purple blend
const PALETTE_BLUE_PURPLE: { light: string; dark: string }[] = [
  { light: '#1e40af', dark: '#60a5fa' }, // deep blue
  { light: '#2563eb', dark: '#818cf8' }, // blue
  { light: '#4f46e5', dark: '#a78bfa' }, // indigo
  { light: '#6366f1', dark: '#c4b5fd' }, // indigo-lighter
  { light: '#7c3aed', dark: '#d8b4fe' }, // violet
  { light: '#8b5cf6', dark: '#e9d5ff' }, // violet-lighter
  { light: '#9333ea', dark: '#f0abfc' }, // purple
  { light: '#a855f7', dark: '#f5d0fe' }, // purple-lighter
];

const PALETTES: Record<ColorScheme, { light: string; dark: string }[]> = {
  blue: PALETTE_BLUE,
  'blue-purple': PALETTE_BLUE_PURPLE,
};

const OTHER_COLOR = { light: '#dbeafe', dark: '#1e3a5f' }; // blue-100 / muted dark blue
const MAX_GENRES = 8;

/**
 * Consolidate genre data so only the top N genres (by total plays
 * across all periods) are named. Everything else merges into "Other".
 * Returns new data — does not mutate the input.
 */
export function consolidateGenres(data: GenrePeriod[]): GenrePeriod[] {
  // Sum plays per genre across all periods
  const totals = new Map<string, number>();
  for (const period of data) {
    for (const [genre, count] of Object.entries(period.genres)) {
      if (genre === 'Other') continue;
      totals.set(genre, (totals.get(genre) ?? 0) + count);
    }
  }

  // Pick the top N genres globally
  const ranked = [...totals.entries()].sort((a, b) => b[1] - a[1]);
  const topGenres = new Set(ranked.slice(0, MAX_GENRES).map(([g]) => g));

  // Rebuild each period, merging non-top genres into "Other"
  return data.map(period => {
    const genres: Record<string, number> = {};
    let otherTotal = 0;
    for (const [genre, count] of Object.entries(period.genres)) {
      if (genre === 'Other') {
        otherTotal += count;
      } else if (topGenres.has(genre)) {
        genres[genre] = count;
      } else {
        otherTotal += count;
      }
    }
    if (otherTotal > 0) genres['Other'] = otherTotal;
    return { ...period, genres };
  });
}

/**
 * Build a stable genre → color map from consolidated genre data.
 * Genres are ranked by total plays across all periods.
 * Top N get palette colors, "Other" always gets the muted gray.
 */
export function buildGenreColorMap(
  data: GenrePeriod[],
  isDark: boolean,
  scheme: ColorScheme = 'blue-purple'
): Map<string, string> {
  const palette = PALETTES[scheme];
  const totals = new Map<string, number>();
  for (const period of data) {
    for (const [genre, count] of Object.entries(period.genres)) {
      if (genre === 'Other') continue;
      totals.set(genre, (totals.get(genre) ?? 0) + count);
    }
  }

  const ranked = [...totals.entries()].sort((a, b) => b[1] - a[1]);

  const colorMap = new Map<string, string>();
  for (let i = 0; i < ranked.length && i < palette.length; i++) {
    colorMap.set(ranked[i][0], isDark ? palette[i].dark : palette[i].light);
  }

  colorMap.set('Other', isDark ? OTHER_COLOR.dark : OTHER_COLOR.light);

  return colorMap;
}

/**
 * Get genre keys ordered by the color map. "Other" is always last.
 */
export function getGenreKeys(
  data: GenrePeriod[],
  colorMap: Map<string, string>
): string[] {
  const allGenres = new Set<string>();
  for (const period of data) {
    for (const genre of Object.keys(period.genres)) {
      allGenres.add(genre);
    }
  }

  const colored = [...colorMap.keys()].filter(
    g => g !== 'Other' && allGenres.has(g)
  );
  const result = [...colored];
  if (allGenres.has('Other')) result.push('Other');
  return result;
}
