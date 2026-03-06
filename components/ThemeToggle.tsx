'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState, useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

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

  const currentTheme = mounted ? theme : 'system';
  const currentThemeLabel =
    themes.find(t => t.value === currentTheme)?.label || 'System';

  return (
    <div className='theme-dropdown relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='text-text-muted hover:text-text-secondary dark:text-text-dark-muted dark:hover:text-text-dark-secondary cursor-pointer text-sm transition-colors'
      >
        {currentThemeLabel}
      </button>

      {isOpen && (
        <div className='bg-bg-primary dark:bg-bg-dark-secondary theme-dropdown absolute right-0 bottom-full z-50 mb-2 overflow-hidden rounded-md border border-gray-200 shadow-lg dark:border-gray-600/60'>
          {themes.map((t, index) => (
            <button
              key={t.value}
              onClick={() => {
                setTheme(t.value);
                setIsOpen(false);
              }}
              className={`text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary block w-full cursor-pointer px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
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
