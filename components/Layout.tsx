import Link from 'next/link';
import { ReactNode } from 'react';
import { ThemeToggle } from './ThemeToggle';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white'>
      <nav className='border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex h-16 justify-between'>
            <div className='flex items-center'>
              <Link
                href='/'
                className='text-xl font-bold text-gray-900 transition-colors hover:text-gray-700 dark:text-white dark:hover:text-gray-300'
              >
                Pat Dugan
              </Link>
            </div>
            <div className='flex items-center space-x-8'>
              <Link
                href='/'
                className='rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              >
                Portfolio
              </Link>
              <Link
                href='/projects'
                className='rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              >
                Projects
              </Link>
              <Link
                href='/blog'
                className='rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              >
                Blog
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
      <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        {children}
      </main>
      <footer className='border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'>
        <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          <div className='text-center text-gray-600 dark:text-gray-400'>
            <p>&copy; 2024 Pat Dugan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
