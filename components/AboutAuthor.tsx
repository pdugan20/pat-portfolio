import { SITE_CONFIG } from '@/lib/constants';

export default function AboutAuthor() {
  return (
    <div className='border-border-primary mt-8 border-t pt-6 dark:border-white/[0.08]'>
      <h3 className='text-text-muted dark:text-text-dark-muted mb-3 font-mono text-xs font-normal tracking-wider uppercase'>
        About the author
      </h3>
      <p className='text-text-primary dark:text-text-dark-primary text-sm leading-relaxed'>
        <a
          href='mailto:pat@patdugan.me'
          className='text-text-primary dark:text-text-dark-primary underline decoration-gray-300 underline-offset-2 transition-opacity hover:opacity-50 dark:decoration-gray-600'
        >
          {SITE_CONFIG.author}
        </a>{' '}
        {SITE_CONFIG.aboutAuthor}
      </p>
    </div>
  );
}
