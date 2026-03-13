'use client';

import { ActivityCalendar } from 'react-activity-calendar';
import { useTheme } from 'next-themes';
import type { CalendarDay } from '@/lib/rewind/types';

interface CalendarHeatmapProps {
  data: CalendarDay[];
  year: number;
  /** Maximum count value for scaling levels. If omitted, derived from data. */
  maxCount?: number;
  /** Color theme — two colors [lowest, highest] per scheme */
  colors?: { light: [string, string]; dark: [string, string] };
  /** Tooltip text formatter */
  formatTooltip?: (date: string, count: number) => string;
  loading?: boolean;
}

const DEFAULT_COLORS = {
  light: ['hsl(0, 0%, 92%)', 'hsl(131, 50%, 40%)'] as [string, string],
  dark: ['hsl(0, 0%, 22%)', 'hsl(131, 50%, 50%)'] as [string, string],
};

function assignLevels(
  days: CalendarDay[],
  year: number,
  maxCount?: number
): { date: string; count: number; level: number }[] {
  // Build a map of date → count
  const countMap = new Map(days.map(d => [d.date, d.count]));

  // Determine the max for scaling
  const derivedMax = maxCount ?? Math.max(...days.map(d => d.count), 1);

  // Generate all days in the year
  const result: { date: string; count: number; level: number }[] = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10);
    const count = countMap.get(dateStr) ?? 0;

    let level: number;
    if (count === 0) {
      level = 0;
    } else {
      // Scale to 1-4
      level = Math.min(4, Math.ceil((count / derivedMax) * 4));
    }

    result.push({ date: dateStr, count, level });
  }

  return result;
}

export default function CalendarHeatmap({
  data,
  year,
  maxCount,
  colors = DEFAULT_COLORS,
  formatTooltip,
  loading = false,
}: CalendarHeatmapProps) {
  const { resolvedTheme } = useTheme();

  const activities = assignLevels(data, year, maxCount);

  const defaultFormatTooltip = (date: string, count: number) => {
    const formatted = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    return `${count} on ${formatted}`;
  };

  return (
    <ActivityCalendar
      data={activities}
      loading={loading}
      colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      theme={{
        light: colors.light,
        dark: colors.dark,
      }}
      blockSize={11}
      blockMargin={3}
      blockRadius={2}
      fontSize={11}
      showTotalCount={false}
      showWeekdayLabels={['mon', 'wed', 'fri']}
      tooltips={{
        activity: {
          text: activity =>
            (formatTooltip ?? defaultFormatTooltip)(
              activity.date,
              activity.count
            ),
        },
      }}
    />
  );
}
