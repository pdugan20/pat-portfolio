'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DOMAINS = [
  { href: '/listening', label: 'Listening' },
  { href: '/watching', label: 'Watching' },
  { href: '/running', label: 'Running' },
];

export default function DomainNav() {
  const pathname = usePathname();

  return (
    <nav className='mb-8 flex gap-4'>
      {DOMAINS.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`font-mono text-xs tracking-wider uppercase transition-colors ${
              isActive
                ? 'text-text-primary dark:text-text-dark-primary font-medium'
                : 'text-text-muted dark:text-text-dark-muted hover:text-text-secondary dark:hover:text-text-dark-secondary'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
