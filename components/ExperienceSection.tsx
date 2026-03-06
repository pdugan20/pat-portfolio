import { EXPERIENCE } from '@/lib/constants';

export default function ExperienceSection() {
  return (
    <section className='mb-16'>
      <h2 className='text-text-muted dark:text-text-dark-muted mb-6 font-mono text-xs font-normal tracking-wider uppercase'>
        Experience
      </h2>
      <ul className='divide-border-primary dark:divide-border-dark-primary divide-y'>
        {EXPERIENCE.map(job => (
          <li
            key={`${job.company}-${job.role}`}
            className='flex items-baseline gap-4 py-4 first:pt-0 last:pb-0'
          >
            <a
              href={job.url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-text-primary dark:text-text-dark-primary w-24 shrink-0 text-base font-semibold transition-colors'
            >
              {job.company}
            </a>
            <span className='text-text-secondary dark:text-text-dark-secondary flex-1 text-base'>
              {job.role}
            </span>
            <span className='text-text-muted dark:text-text-dark-muted shrink-0 text-sm'>
              {job.period}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
