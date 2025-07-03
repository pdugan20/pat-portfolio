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
      <div className='h-8 w-8 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700' />
    );
  }

  return (
    <div className='relative'>
      <select
        value={theme}
        onChange={e => setTheme(e.target.value)}
        className='appearance-none rounded-md border border-gray-300 bg-white px-3 py-1.5 pr-8 text-sm text-gray-700 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300'
      >
        <option value='system'>System</option>
        <option value='light'>Light</option>
        <option value='dark'>Dark</option>
      </select>
      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
        <svg
          className='h-4 w-4 text-gray-400'
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
