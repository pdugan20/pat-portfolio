import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import SocialPill from './SocialPill';

export default function Footer() {
  return (
    <footer className='bg-bg-secondary dark:bg-bg-dark-secondary border-t border-gray-200 dark:border-gray-800'>
      <div className='mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <div className='text-text-muted dark:text-text-dark-muted mb-4 text-sm'>
            <p>
              &copy; {new Date().getFullYear()} {SITE_CONFIG.author}. Built with
              intention in ☁️ Seattle, WA
              {' · '}
              <Link
                href='/terms'
                className='text-text-secondary hover:text-text-primary dark:text-text-dark-muted dark:hover:text-text-dark-primary underline transition-colors'
              >
                Terms
              </Link>
              {' · '}
              <Link
                href='/privacy'
                className='text-text-secondary hover:text-text-primary dark:text-text-dark-muted dark:hover:text-text-dark-primary underline transition-colors'
              >
                Privacy
              </Link>
            </p>
          </div>

          {/* Compact Social Pills */}
          <div className='flex justify-center space-x-2'>
            <SocialPill
              href='https://github.com/pdugan20'
              label='GitHub'
              ariaLabel='GitHub'
            />
            <SocialPill
              href='https://twitter.com/doog'
              label='Twitter'
              ariaLabel='Twitter'
            />
            <SocialPill
              href='https://figma.com/@patdugan'
              label='Figma'
              ariaLabel='Figma'
            />
            <SocialPill
              href='mailto:dugan.pat@gmail.com'
              label='Email'
              ariaLabel='Email'
              isExternal={false}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
