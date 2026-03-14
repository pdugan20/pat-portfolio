'use client';

import { useState, useEffect, cloneElement } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { useTheme } from 'next-themes';
import type { CalendarDay } from '@/lib/rewind/types';

interface CalendarHeatmapProps {
  data: CalendarDay[];
  year: number;
  maxCount?: number;
  colors?: { light: [string, string]; dark: [string, string] };
  formatTooltip?: (date: string, count: number) => string;
  loading?: boolean;
  onDayClick?: (date: string) => void;
  selectedDay?: string | null;
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
  const countMap = new Map(days.map(d => [d.date, d.count]));
  const derivedMax = maxCount ?? Math.max(...days.map(d => d.count), 1);

  const result: { date: string; count: number; level: number }[] = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10);
    const count = countMap.get(dateStr) ?? 0;
    const level =
      count === 0 ? 0 : Math.min(4, Math.ceil((count / derivedMax) * 4));
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
  onDayClick,
  selectedDay,
}: CalendarHeatmapProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activities = assignLevels(data, year, maxCount);

  const defaultFormatTooltip = (date: string, count: number) => {
    const formatted = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    return `${count} on ${formatted}`;
  };

  if (!mounted) return null;

  return (
    <ActivityCalendar
      data={activities}
      loading={loading}
      colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      theme={{
        light: colors.light,
        dark: colors.dark,
      }}
      blockSize={10}
      blockMargin={2}
      blockRadius={2}
      fontSize={10}
      showTotalCount={false}
      showColorLegend={false}
      showWeekdayLabels={['mon', 'wed', 'fri']}
      renderBlock={(block, activity) =>
        cloneElement(block, {
          onClick: () => {
            if (onDayClick && activity.count > 0) {
              onDayClick(activity.date);
            }
          },
          style: {
            ...block.props.style,
            cursor: onDayClick && activity.count > 0 ? 'pointer' : undefined,
            ...(selectedDay === activity.date
              ? {
                  stroke: resolvedTheme === 'dark' ? '#fff' : '#000',
                  strokeWidth: 2,
                }
              : {}),
          },
        })
      }
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
