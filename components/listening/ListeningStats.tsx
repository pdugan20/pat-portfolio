import type { UserStats } from '@/lib/listening/types';

interface ListeningStatsProps {
  stats: UserStats;
}

export default function ListeningStats({ stats }: ListeningStatsProps) {
  const yearsSince =
    new Date().getFullYear() - stats.registeredDate.getFullYear();

  const statItems = [
    { label: 'Scrobbles', value: stats.totalScrobbles.toLocaleString() },
    { label: 'Artists', value: stats.uniqueArtists.toLocaleString() },
    { label: 'Albums', value: stats.uniqueAlbums.toLocaleString() },
    { label: 'Tracking since', value: `${yearsSince} years` },
  ];

  return (
    <div className='mb-12 flex flex-wrap gap-x-6 gap-y-2'>
      {statItems.map(stat => (
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
