import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import Layout from '@/components/Layout';
import { getStats } from '@/lib/listening/lastfm';
import ListeningStats from '@/components/listening/ListeningStats';
import NowPlaying from '@/components/listening/NowPlaying';
import ListeningContent from './ListeningContent';

export const metadata: Metadata = {
  title: `Listening - ${SITE_CONFIG.author}`,
  description: "What I've been listening to, tracked since 2012 via Last.fm.",
};

export default async function ListeningPage() {
  const stats = await getStats();

  return (
    <Layout>
      <div>
        <section className='mb-12'>
          <h1 className='text-text-primary dark:text-text-dark-primary mb-1 text-2xl font-semibold tracking-tight'>
            Listening
          </h1>
          <p className='text-text-secondary dark:text-text-dark-secondary text-sm leading-relaxed'>
            What I&apos;ve been listening to, tracked since 2012.
          </p>
        </section>

        <NowPlaying />

        <ListeningStats stats={stats} />

        <ListeningContent />
      </div>
    </Layout>
  );
}
