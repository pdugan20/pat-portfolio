'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='bg-bg-tertiary dark:bg-bg-dark-tertiary h-8 w-8 animate-pulse rounded-md' />
    );
  }

  return (
    <div className='relative'>
      <select
        value={theme}
        onChange={e => setTheme(e.target.value)}
        className='border-border-primary bg-bg-primary text-text-secondary focus:ring-primary dark:border-border-dark-primary dark:bg-bg-dark-secondary dark:text-text-dark-secondary appearance-none rounded-md border px-3 py-1.5 pr-8 text-sm focus:border-transparent focus:ring-2 focus:outline-none'
      >
        <option value='system'>System</option>
        <option value='light'>Light</option>
        <option value='dark'>Dark</option>
      </select>
      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
        <svg
          className='text-text-tertiary h-4 w-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </div>
    </div>
  );
}
