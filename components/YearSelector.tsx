'use client';

interface YearSelectorProps {
  value: number;
  onChange: (year: number) => void;
  /** Earliest year available in the data */
  startYear: number;
  /** Latest year available (defaults to current year) */
  endYear?: number;
}

export default function YearSelector({
  value,
  onChange,
  startYear,
  endYear = new Date().getFullYear(),
}: YearSelectorProps) {
  const years: number[] = [];
  for (let y = endYear; y >= startYear; y--) {
    years.push(y);
  }

  return (
    <div className='mb-4 flex flex-wrap items-center gap-2'>
      {years.map(year => (
        <button
          key={year}
          onClick={() => onChange(year)}
          className={`text-xs transition-colors ${
            value === year
              ? 'text-text-primary dark:text-text-dark-primary font-medium'
              : 'text-text-muted dark:text-text-dark-muted hover:text-text-secondary dark:hover:text-text-dark-secondary'
          }`}
        >
          {year}
        </button>
      ))}
    </div>
  );
}
