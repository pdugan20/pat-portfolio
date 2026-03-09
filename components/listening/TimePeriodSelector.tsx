'use client';

import { TIME_PERIODS } from '@/lib/listening/constants';
import type { TimePeriod } from '@/lib/listening/types';

interface TimePeriodSelectorProps {
  value: TimePeriod;
  onChange: (period: TimePeriod) => void;
}

export default function TimePeriodSelector({
  value,
  onChange,
}: TimePeriodSelectorProps) {
  return (
    <div className='mb-4 flex flex-wrap gap-2'>
      {TIME_PERIODS.map(period => (
        <button
          key={period.value}
          onClick={() => onChange(period.value)}
          className={`text-xs transition-colors ${
            value === period.value
              ? 'text-text-primary dark:text-text-dark-primary font-medium'
              : 'text-text-muted dark:text-text-dark-muted hover:text-text-secondary dark:hover:text-text-dark-secondary'
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}
