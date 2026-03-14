import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import Layout from '@/components/Layout';
import DomainNav from '@/components/DomainNav';
import ListeningContent from './ListeningContent';

export const metadata: Metadata = {
  title: `Listening - ${SITE_CONFIG.author}`,
  description: "What I've been listening to, tracked since 2012 via Last.fm.",
};

export default function ListeningPage() {
  return (
    <Layout>
      <div>
        <DomainNav />

        <h1 className='text-text-primary dark:text-text-dark-primary mb-1 text-2xl font-semibold tracking-tight'>
          Listening
        </h1>

        <Suspense>
          <ListeningContent />
        </Suspense>
      </div>
    </Layout>
  );
}
