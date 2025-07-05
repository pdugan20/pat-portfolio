import Link from 'next/link';
import { ReactNode } from 'react';
import { ThemeToggle } from './ThemeToggle';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='bg-bg-primary text-text-primary dark:bg-bg-dark-primary dark:text-text-dark-primary min-h-screen'>
      <nav className='border-border-primary bg-bg-primary dark:border-border-dark-primary dark:bg-bg-dark-secondary border-b shadow-sm'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex h-16 justify-between'>
            <div className='flex items-center'>
              <Link
                href='/'
                className='text-text-primary hover:text-text-secondary dark:text-text-dark-primary dark:hover:text-text-dark-secondary text-xl font-bold transition-colors'
              >
                Pat Dugan
              </Link>
            </div>
            <div className='flex items-center space-x-8'>
              <Link
                href='/'
                className='text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary rounded-md px-3 py-2 text-sm font-medium transition-colors'
              >
                Portfolio
              </Link>
              <Link
                href='/projects'
                className='text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary rounded-md px-3 py-2 text-sm font-medium transition-colors'
              >
                Projects
              </Link>
              <Link
                href='/blog'
                className='text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary rounded-md px-3 py-2 text-sm font-medium transition-colors'
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
      <footer className='border-border-primary bg-bg-primary dark:border-border-dark-primary dark:bg-bg-dark-secondary border-t'>
        <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          <div className='text-text-secondary dark:text-text-dark-secondary text-center'>
            <p>&copy; 2024 Pat Dugan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
