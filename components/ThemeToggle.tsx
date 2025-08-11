'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { ChevronDownIcon } from './icons';

export function ThemeToggle() {
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

  const themes = [
    { value: 'system', label: 'System' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];

  // Get the current theme label, defaulting to 'System' if not mounted yet
  const currentTheme = mounted ? theme : 'system';
  const currentThemeLabel =
    themes.find(t => t.value === currentTheme)?.label || 'System';

  return (
    <div className='theme-dropdown relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='bg-bg-primary text-text-secondary dark:bg-bg-dark-secondary dark:text-text-dark-secondary w-24 cursor-pointer rounded-md border border-gray-200 px-3 py-1.5 pr-8 text-left text-sm font-medium transition-colors hover:border-gray-300 focus:outline-none dark:dark:border-gray-600/60 dark:hover:border-gray-600'
      >
        {currentThemeLabel}
        <ChevronDownIcon />
      </button>

      {isOpen && (
        <div className='bg-bg-primary dark:bg-bg-dark-secondary theme-dropdown absolute top-full right-0 z-50 mt-1 overflow-hidden rounded-md border border-gray-200 shadow-lg dark:dark:border-gray-600/60'>
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
