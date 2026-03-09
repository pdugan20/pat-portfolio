import type { ComponentType } from 'react';
import { EXPERIENCE } from '@/lib/constants';
import {
  GoogleLogo,
  MetaLogo,
  QuoraLogo,
  NextdoorLogo,
  CZILogo,
} from '@/components/icons';

const companyLogos: Record<string, ComponentType<{ className?: string }>> = {
  Google: GoogleLogo,
  Meta: MetaLogo,
  Quora: QuoraLogo,
  Nextdoor: NextdoorLogo,
  CZI: CZILogo,
};

export default function ExperienceSection() {
  return (
    <section className='mb-0'>
      <h2 className='text-text-muted dark:text-text-dark-muted mb-6 font-mono text-xs font-normal tracking-wider uppercase'>
        Experience
      </h2>
      <ul className='divide-border-primary divide-y dark:divide-white/[0.08]'>
        {EXPERIENCE.map(job => {
          const Logo = companyLogos[job.company];
          return (
            <li
              key={`${job.company}-${job.role}`}
              className='flex items-center gap-4 py-3 first:pt-0 last:pb-0'
            >
              <div className='flex w-32 shrink-0 items-center gap-2'>
                <span className='flex w-5 shrink-0 items-center justify-center'>
                  {Logo && <Logo className='h-4 w-auto' />}
                </span>
                <a
                  href={job.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-text-primary dark:text-text-dark-primary text-base font-medium transition-colors'
                >
                  {job.company}
                </a>
              </div>
              <span className='text-text-secondary dark:text-text-dark-secondary flex-1 text-base'>
                {job.role}
              </span>
              <span className='text-text-muted dark:text-text-dark-muted shrink-0 text-sm'>
                {job.period}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
