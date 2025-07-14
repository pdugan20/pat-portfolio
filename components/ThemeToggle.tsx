/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// Option 1: Button with dropdown menu (most common pattern)
function ButtonDropdown() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest('.theme-dropdown')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!mounted) {
    return (
      <div className='bg-bg-tertiary dark:bg-bg-dark-tertiary h-8 w-8 animate-pulse rounded-md' />
    );
  }

  const themes = [
    { value: 'system', label: 'System' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];

  return (
    <div className='theme-dropdown relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='border-border-primary bg-bg-primary text-text-secondary dark:border-border-dark-primary dark:bg-bg-dark-secondary dark:text-text-dark-secondary w-24 cursor-pointer rounded-md border px-3 py-1.5 pr-8 text-left text-sm font-medium transition-colors hover:border-gray-300 focus:outline-none dark:hover:border-gray-400'
      >
        {themes.find(t => t.value === theme)?.label}
        <svg
          className='text-text-tertiary pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2'
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
      </button>

      {isOpen && (
        <div className='border-border-primary bg-bg-primary dark:border-border-dark-primary dark:bg-bg-dark-secondary theme-dropdown absolute top-full right-0 z-50 mt-1 overflow-hidden rounded-md border shadow-lg'>
          {themes.map((t, index) => (
            <button
              key={t.value}
              onClick={() => {
                setTheme(t.value);
                setIsOpen(false);
              }}
              className={`text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary block w-full cursor-pointer px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                index === 0 ? 'rounded-t-md' : ''
              } ${index === themes.length - 1 ? 'rounded-b-md' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Option 2: Icon-based toggle with tooltip
function IconToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='bg-bg-tertiary dark:bg-bg-dark-tertiary h-8 w-8 animate-pulse rounded-md' />
    );
  }

  const getNextTheme = () => {
    if (theme === 'system') return 'light';
    if (theme === 'light') return 'dark';
    return 'system';
  };

  const getIcon = () => {
    if (theme === 'dark') return '🌙';
    if (theme === 'light') return '☀️';
    return '💻';
  };

  return (
    <button
      onClick={() => setTheme(getNextTheme())}
      className='border-border-primary bg-bg-primary text-text-secondary dark:border-border-dark-primary dark:bg-bg-dark-secondary dark:text-text-dark-secondary cursor-pointer rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:border-gray-300 focus:outline-none dark:hover:border-gray-400'
      title={`Current: ${theme}. Click to cycle themes.`}
    >
      {getIcon()}
    </button>
  );
}

// Option 3: Segmented control style
function SegmentedControl() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='bg-bg-tertiary dark:bg-bg-dark-tertiary h-8 w-24 animate-pulse rounded-md' />
    );
  }

  const themes = [
    { value: 'system', label: 'S', title: 'System' },
    { value: 'light', label: 'L', title: 'Light' },
    { value: 'dark', label: 'D', title: 'Dark' },
  ];

  return (
    <div className='border-border-primary dark:border-border-dark-primary flex rounded-md border'>
      {themes.map((t, index) => (
        <button
          key={t.value}
          onClick={() => setTheme(t.value)}
          className={`text-text-secondary dark:text-text-dark-secondary hover:text-text-primary dark:hover:text-text-dark-primary cursor-pointer px-2 py-1.5 text-xs font-medium transition-colors ${
            theme === t.value
              ? 'bg-primary dark:bg-primary-light text-white'
              : 'hover:bg-gray-50 dark:hover:bg-gray-800'
          } ${index === 0 ? 'rounded-l-md' : ''} ${
            index === themes.length - 1 ? 'rounded-r-md' : ''
          }`}
          title={t.title}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// Option 4: Minimal text with hover dropdown
function MinimalDropdown() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='bg-bg-tertiary dark:bg-bg-dark-tertiary h-8 w-16 animate-pulse rounded-md' />
    );
  }

  const themes = [
    { value: 'system', label: 'System' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className='text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary cursor-pointer text-sm font-medium transition-colors'
      >
        {themes.find(t => t.value === theme)?.label}
        <svg
          className='ml-1 inline h-3 w-3'
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
      </button>

      {isOpen && (
        <div
          className='border-border-primary bg-bg-primary dark:border-border-dark-primary dark:bg-bg-dark-secondary absolute top-full right-0 z-50 mt-1 rounded-md border shadow-lg'
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {themes.map(t => (
            <button
              key={t.value}
              onClick={() => {
                setTheme(t.value);
                setIsOpen(false);
              }}
              className='text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary block w-full px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800'
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Main component - change this to switch between designs
export function ThemeToggle() {
  // Change this line to switch between different designs:
  return <ButtonDropdown />;

  // Other options:
  // return <IconToggle />;
  // return <SegmentedControl />;
  // return <MinimalDropdown />;
}
