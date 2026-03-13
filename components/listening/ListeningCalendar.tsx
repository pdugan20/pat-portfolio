'use client';

import { useEffect, useState, useCallback } from 'react';
import CalendarHeatmap from '@/components/CalendarHeatmap';
import type { CalendarResponse } from '@/lib/rewind/types';

interface ListeningCalendarProps {
  year: number;
}

export default function ListeningCalendar({ year }: ListeningCalendarProps) {
  const [data, setData] = useState<CalendarResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/listening/calendar?year=${year}`);
      if (res.ok) {
        setData(await res.json());
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [year]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <CalendarHeatmap
        data={data?.days ?? []}
        year={year}
        maxCount={data?.max_day?.count}
        loading={loading}
        formatTooltip={(date, count) => {
          const formatted = new Date(date + 'T00:00:00').toLocaleDateString(
            'en-US',
            { month: 'short', day: 'numeric' }
          );
          return `${count} scrobble${count !== 1 ? 's' : ''} on ${formatted}`;
        }}
      />
      {data && !loading && (
        <p className='text-text-muted dark:text-text-dark-muted mt-2 text-xs'>
          {data.total.toLocaleString()} scrobbles in {year}
        </p>
      )}
    </div>
  );
}
