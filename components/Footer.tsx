'use client';

import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';
import { ThemeToggle } from './ThemeToggle';

const socialItems = [
  { label: 'X', href: SOCIAL_LINKS.x },
  { label: 'GitHub', href: SOCIAL_LINKS.github },
  { label: 'Figma', href: SOCIAL_LINKS.figma },
  { label: 'Email', href: `mailto:${SOCIAL_LINKS.email}` },
];

// Toggle this to preview variants: 'minimal' | 'structured'
const FOOTER_VARIANT: 'minimal' | 'structured' = 'minimal';

function FooterMinimal() {
  return (
    <footer className='mx-auto w-full max-w-[653px] px-6'>
      <div className='border-border-primary dark:border-border-dark-primary flex items-center justify-between border-t py-8'>
        <nav className='flex items-center gap-4'>
          {socialItems.map((item, index) => (
            <span key={item.label} className='flex items-center gap-4'>
              <a
                href={item.href}
                className='text-text-muted hover:text-text-primary dark:text-text-dark-muted dark:hover:text-text-dark-primary text-sm transition-colors'
                {...(item.label !== 'Email'
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {item.label}
              </a>
              {index < socialItems.length - 1 && (
                <span className='text-text-muted dark:text-text-dark-muted text-xs'>
                  ·
                </span>
              )}
            </span>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </footer>
  );
}

function FooterStructured() {
  return (
    <footer className='mx-auto w-full max-w-[653px] px-6'>
      <div className='border-border-primary dark:border-border-dark-primary border-t py-8'>
        <nav className='mb-4 flex items-center justify-center gap-6'>
          {socialItems.map(item => (
            <a
              key={item.label}
              href={item.href}
              className='text-text-muted hover:text-text-primary dark:text-text-dark-muted dark:hover:text-text-dark-primary text-sm transition-colors'
              {...(item.label !== 'Email'
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className='flex items-center justify-between'>
          <p className='text-text-muted dark:text-text-dark-muted text-xs'>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.author}
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}

export default function Footer() {
  if (FOOTER_VARIANT === 'structured') {
    return <FooterStructured />;
  }
  return <FooterMinimal />;
}
