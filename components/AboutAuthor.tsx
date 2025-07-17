import { SITE_CONFIG } from '@/lib/constants';

export default function AboutAuthor() {
  return (
    <div className='mt-[52px] border-t border-gray-200 pt-[52px] dark:border-gray-800'>
      <h3 className='text-text-primary dark:text-text-dark-primary mb-3 text-[24px] leading-[28px] font-[700]'>
        About the author
      </h3>
      <p className='text-text-primary dark:text-text-dark-primary text-base leading-relaxed'>
        <a
          href='mailto:pat@patdugan.me'
          className='text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
        >
          {SITE_CONFIG.author}
        </a>{' '}
        {SITE_CONFIG.aboutAuthor}
      </p>
    </div>
  );
}
