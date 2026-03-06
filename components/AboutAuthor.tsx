import { SITE_CONFIG } from '@/lib/constants';

export default function AboutAuthor() {
  return (
    <div className='border-border-primary mt-13 border-t pt-13 dark:border-white/[0.08]'>
      <h3 className='text-text-primary dark:text-text-dark-primary mb-3 text-2xl leading-[28px] font-bold'>
        About the author
      </h3>
      <p className='text-text-primary dark:text-text-dark-primary text-base leading-relaxed'>
        <a
          href='mailto:pat@patdugan.me'
          className='text-text-primary dark:text-text-dark-primary underline decoration-gray-300 underline-offset-2 transition-colors hover:decoration-gray-500 dark:decoration-gray-600 dark:hover:decoration-gray-400'
        >
          {SITE_CONFIG.author}
        </a>{' '}
        {SITE_CONFIG.aboutAuthor}
      </p>
    </div>
  );
}
