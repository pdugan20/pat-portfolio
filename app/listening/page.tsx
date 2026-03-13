import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import Layout from '@/components/Layout';
import DomainNav from '@/components/DomainNav';
import StatBar from '@/components/StatBar';
import { rewind } from '@/lib/rewind/client';
import type { ListeningStats } from '@/lib/rewind/types';
import NowPlaying from '@/components/listening/NowPlaying';
import ListeningContent from './ListeningContent';

export const metadata: Metadata = {
  title: `Listening - ${SITE_CONFIG.author}`,
  description: "What I've been listening to, tracked since 2012 via Last.fm.",
};

export default async function ListeningPage() {
  const stats = await rewind<ListeningStats>('/listening/stats');

  const yearsSince = stats.years_tracking;

  return (
    <Layout>
      <div>
        <DomainNav />

        <section className='mb-12'>
          <h1 className='text-text-primary dark:text-text-dark-primary mb-1 text-2xl font-semibold tracking-tight'>
            Listening
          </h1>
          <p className='text-text-secondary dark:text-text-dark-secondary text-sm leading-relaxed'>
            What I&apos;ve been listening to, tracked since 2012.
          </p>
        </section>

        <NowPlaying />

        <StatBar
          stats={[
            {
              label: 'Scrobbles',
              value: stats.total_scrobbles.toLocaleString(),
            },
            {
              label: 'Artists',
              value: stats.unique_artists.toLocaleString(),
            },
            {
              label: 'Albums',
              value: stats.unique_albums.toLocaleString(),
            },
            { label: 'Tracking since', value: `${yearsSince} years` },
          ]}
        />

        <ListeningContent />
      </div>
    </Layout>
  );
}
