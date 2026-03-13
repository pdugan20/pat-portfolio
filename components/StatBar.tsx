interface StatItem {
  label: string;
  value: string;
}

interface StatBarProps {
  stats: StatItem[];
}

export default function StatBar({ stats }: StatBarProps) {
  return (
    <div className='mb-12 flex flex-wrap gap-x-6 gap-y-2'>
      {stats.map(stat => (
        <div key={stat.label} className='flex items-baseline gap-1.5'>
          <span className='text-text-primary dark:text-text-dark-primary text-base font-semibold'>
            {stat.value}
          </span>
          <span className='text-text-muted dark:text-text-dark-muted text-sm'>
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
