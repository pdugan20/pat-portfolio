import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import Layout from '@/components/Layout';
import DomainNav from '@/components/DomainNav';
import WatchingContent from './WatchingContent';

export const metadata: Metadata = {
  title: `Watching - ${SITE_CONFIG.author}`,
  description:
    "Movies and films I've watched, tracked via Plex and Letterboxd.",
};

export default function WatchingPage() {
  return (
    <Layout>
      <div>
        <DomainNav />

        <h1 className='text-text-primary dark:text-text-dark-primary mb-1 text-2xl font-semibold tracking-tight'>
          Watching
        </h1>

        <Suspense>
          <WatchingContent />
        </Suspense>
      </div>
    </Layout>
  );
}
