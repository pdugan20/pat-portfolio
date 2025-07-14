'use client';

import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';
import { SITE_CONFIG } from '@/lib/constants';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerOffset, setHeaderOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY); // Ensure scrollY is never negative
      const scrollDelta = currentScrollY - lastScrollY;

      // Check if we're at the bottom of the page
      const isAtBottom =
        window.innerHeight + currentScrollY >=
        document.documentElement.scrollHeight - 1;

      // Update header offset based on scroll direction
      if (scrollDelta > 0) {
        // Scrolling down - move header up
        setHeaderOffset(prev => Math.min(prev + scrollDelta, 64));
      } else if (scrollDelta < 0) {
        // Scrolling up - move header down, but not if we're at the bottom bounce
        if (!isAtBottom) {
          setHeaderOffset(prev => Math.max(prev + scrollDelta, 0));
        }
      }

      // If we're at the very top of the page, ensure header is fully visible
      if (currentScrollY <= 0) {
        setHeaderOffset(0);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className='bg-bg-primary text-text-primary dark:bg-bg-dark-primary dark:text-text-dark-primary min-h-screen'>
      <nav
        className='border-border-primary bg-bg-primary dark:border-border-dark-primary dark:bg-bg-dark-secondary fixed top-0 right-0 left-0 z-50 border-b transition-transform duration-0'
        style={{ transform: `translateY(-${headerOffset}px)` }}
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex h-16 justify-between'>
            <div className='flex items-center'>
              <Link
                href='/'
                className='text-text-primary dark:text-text-dark-primary flex items-center gap-2 text-xl font-semibold transition-colors'
              >
                <Logo
                  className='text-text-primary dark:text-text-dark-primary'
                  width={24}
                  height={24}
                />
                {SITE_CONFIG.author}
              </Link>
            </div>
            <div className='flex items-center space-x-8'>
              <Link
                href='/projects'
                className='text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary rounded-md px-3 py-2 text-sm font-medium transition-colors'
              >
                Projects
              </Link>
              <Link
                href='/writing'
                className='text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary rounded-md px-3 py-2 text-sm font-medium transition-colors'
              >
                Writing
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
      {/* Add top padding to account for fixed header */}
      <div className='h-16'></div>
      <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        {children}
      </main>
      <footer className='border-border-primary bg-bg-primary dark:border-border-dark-primary dark:bg-bg-dark-secondary border-t'>
        <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          <div className='text-text-secondary dark:text-text-dark-secondary text-center'>
            <p>&copy; 2024 {SITE_CONFIG.author}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
