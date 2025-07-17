import Layout from '@/components/Layout';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Terms of Service - ${SITE_CONFIG.author}`,
  description: 'Terms of Service for the website and services provided.',
};

export default function TermsPage() {
  return (
    <Layout>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-8'>
          <Link
            href='/'
            className='text-primary dark:text-primary-light mb-4 inline-block hover:underline'
          >
            ← Back to Home
          </Link>
        </div>

        <article className='prose prose-lg dark:prose-invert max-w-none'>
          <h1 className='text-text-primary dark:text-text-dark-primary mb-8 text-4xl font-bold'>
            Terms of Service
          </h1>

          <div className='text-text-secondary dark:text-text-dark-secondary mb-8 text-sm'>
            <p>
              Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <div className='text-text-primary dark:text-text-dark-primary space-y-6'>
            <section>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-4 text-2xl font-semibold'>
                1. Acceptance of Terms
              </h2>
              <p className='text-text-secondary dark:text-text-dark-secondary leading-relaxed'>
                By accessing and using this website, you accept and agree to be
                bound by the terms and provision of this agreement. If you do
                not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-4 text-2xl font-semibold'>
                2. Use License
              </h2>
              <p className='text-text-secondary dark:text-text-dark-secondary mb-4 leading-relaxed'>
                Permission is granted to temporarily download one copy of the
                materials (information or software) on {SITE_CONFIG.author}
                &apos;s website for personal, non-commercial transitory viewing
                only. This is the grant of a license, not a transfer of title,
                and under this license you may not:
              </p>
              <ul className='text-text-secondary dark:text-text-dark-secondary list-disc space-y-2 pl-6 leading-relaxed'>
                <li>modify or copy the materials;</li>
                <li>
                  use the materials for any commercial purpose or for any public
                  display (commercial or non-commercial);
                </li>
                <li>
                  attempt to decompile or reverse engineer any software
                  contained on the website;
                </li>
                <li>
                  remove any copyright or other proprietary notations from the
                  materials;
                </li>
                <li>
                  transfer the materials to another person or &quot;mirror&quot;
                  the materials on any other server.
                </li>
              </ul>
            </section>

            <section>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-4 text-2xl font-semibold'>
                3. Disclaimer
              </h2>
              <p className='text-text-secondary dark:text-text-dark-secondary leading-relaxed'>
                The materials on {SITE_CONFIG.author}&apos;s website are
                provided on an &apos;as is&apos; basis. {SITE_CONFIG.author}{' '}
                makes no warranties, expressed or implied, and hereby disclaims
                and negates all other warranties including without limitation,
                implied warranties or conditions of merchantability, fitness for
                a particular purpose, or non-infringement of intellectual
                property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-4 text-2xl font-semibold'>
                4. Limitations
              </h2>
              <p className='text-text-secondary dark:text-text-dark-secondary leading-relaxed'>
                In no event shall {SITE_CONFIG.author} or its suppliers be
                liable for any damages (including, without limitation, damages
                for loss of data or profit, or due to business interruption)
                arising out of the use or inability to use the materials on the
                website, even if {SITE_CONFIG.author} or a {SITE_CONFIG.author}{' '}
                authorized representative has been notified orally or in writing
                of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-4 text-2xl font-semibold'>
                5. Accuracy of Materials
              </h2>
              <p className='text-text-secondary dark:text-text-dark-secondary leading-relaxed'>
                The materials appearing on {SITE_CONFIG.author}&apos;s website
                could include technical, typographical, or photographic errors.
                {SITE_CONFIG.author} does not warrant that any of the materials
                on the website are accurate, complete, or current.
                {SITE_CONFIG.author} may make changes to the materials contained
                on the website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-4 text-2xl font-semibold'>
                6. Links
              </h2>
              <p className='text-text-secondary dark:text-text-dark-secondary leading-relaxed'>
                {SITE_CONFIG.author} has not reviewed all of the sites linked to
                the website and is not responsible for the contents of any such
                linked site. The inclusion of any link does not imply
                endorsement by {SITE_CONFIG.author} of the site. Use of any such
                linked website is at the user&apos;s own risk.
              </p>
            </section>

            <section>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-4 text-2xl font-semibold'>
                7. Modifications
              </h2>
              <p className='text-text-secondary dark:text-text-dark-secondary leading-relaxed'>
                {SITE_CONFIG.author} may revise these terms of service for the
                website at any time without notice. By using this website you
                are agreeing to be bound by the then current version of these
                Terms of Service.
              </p>
            </section>

            <section>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-4 text-2xl font-semibold'>
                8. Governing Law
              </h2>
              <p className='text-text-secondary dark:text-text-dark-secondary leading-relaxed'>
                These terms and conditions are governed by and construed in
                accordance with the laws and you irrevocably submit to the
                exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-4 text-2xl font-semibold'>
                Contact Information
              </h2>
              <p className='text-text-secondary dark:text-text-dark-secondary leading-relaxed'>
                If you have any questions about these Terms of Service, please
                contact us at{' '}
                <a
                  href='mailto:hello@patdugan.com'
                  className='text-primary dark:text-primary-light hover:underline'
                >
                  hello@patdugan.com
                </a>
              </p>
            </section>
          </div>
        </article>
      </div>
    </Layout>
  );
}
