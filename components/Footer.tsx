'use client';

import { SOCIAL_LINKS } from '@/lib/constants';
import { ThemeToggle } from './ThemeToggle';

const textLinkClass =
  'text-text-muted hover:text-text-primary dark:text-text-dark-muted dark:hover:text-text-dark-primary text-sm underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600 transition-colors';

export default function Footer() {
  return (
    <footer className='mx-auto w-full max-w-[653px] px-6'>
      <div className='border-border-primary border-t pt-6 pb-8 dark:border-white/[0.08]'>
        <div className='flex items-start justify-between gap-6'>
          <p className='text-text-muted dark:text-text-dark-muted text-sm leading-relaxed'>
            I&apos;m on{' '}
            <a
              href={SOCIAL_LINKS.x}
              className={textLinkClass}
              target='_blank'
              rel='noopener noreferrer'
            >
              X
            </a>
            ,{' '}
            <a
              href={SOCIAL_LINKS.github}
              className={textLinkClass}
              target='_blank'
              rel='noopener noreferrer'
            >
              GitHub
            </a>
            , and{' '}
            <a
              href={SOCIAL_LINKS.figma}
              className={textLinkClass}
              target='_blank'
              rel='noopener noreferrer'
            >
              Figma
            </a>
            . Always reachable by{' '}
            <a href={`mailto:${SOCIAL_LINKS.email}`} className={textLinkClass}>
              email
            </a>
            .
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
