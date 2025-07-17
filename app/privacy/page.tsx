import Layout from '@/components/Layout';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Privacy Policy - ${SITE_CONFIG.author}`,
  description: 'Privacy Policy for the website and services provided.',
};

export default function PrivacyPage() {
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
            Privacy Policy
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
                1. Information We Collect
              </h2>
              <p className='text-text-secondary dark:text-text-dark-secondary mb-4 leading-relaxed'>
                We collect information you provide directly to us, such as when
                you:
              </p>
              <ul className='text-text-secondary dark:text-text-dark-secondary list-disc space-y-2 pl-6 leading-relaxed'>
                <li>Contact us via email</li>
                <li>Subscribe to our newsletter (if applicable)</li>
                <li>Leave comments on our blog posts</li>
                <li>Interact with our website</li>
              </ul>
            </section>

            <section>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-4 text-2xl font-semibold'>
                2. Automatically Collected Information
              </h2>
              <p className='text-text-secondary dark:text-text-dark-secondary mb-4 leading-relaxed'>
                When you visit our website, we automatically collect certain
                information about your device, including:
              </p>
              <ul className='text-text-secondary dark:text-text-dark-secondary list-disc space-y-2 pl-6 leading-relaxed'>
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages you visit and time spent on them</li>
                <li>Referring website</li>
              </ul>
            </section>

            <section>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-4 text-2xl font-semibold'>
                3. How We Use Your Information
              </h2>
              <p className='text-text-secondary dark:text-text-dark-secondary mb-4 leading-relaxed'>
                We use the information we collect to:
              </p>
              <ul className='text-text-secondary dark:text-text-dark-secondary list-disc space-y-2 pl-6 leading-relaxed'>
                <li>Provide, maintain, and improve our website</li>
                <li>Respond to your comments and questions</li>
                <li>Send you technical notices and support messages</li>
                <li>Monitor and analyze trends and usage</li>
                <li>Protect against fraudulent or illegal activity</li>
              </ul>
            </section>

            <section>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-4 text-2xl font-semibold'>
                4. Cookies and Tracking Technologies
              </h2>
              <p className='text-text-secondary dark:text-text-dark-secondary leading-relaxed'>
                We use cookies and similar tracking technologies to track
                activity on our website and hold certain information. You can
                instruct your browser to refuse all cookies or to indicate when
                a cookie is being sent. However, if you do not accept cookies,
                you may not be able to use some portions of our website.
              </p>
            </section>

            <section>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-4 text-2xl font-semibold'>
                5. Third-Party Services
              </h2>
              <p className='text-text-secondary dark:text-text-dark-secondary leading-relaxed'>
                Our website may contain links to third-party websites and
                services. We are not responsible for the privacy practices of
                these third parties. We encourage you to read their privacy
                policies before providing any personal information.
              </p>
            </section>

            <section>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-4 text-2xl font-semibold'>
                6. Data Security
              </h2>
              <p className='text-text-secondary dark:text-text-dark-secondary leading-relaxed'>
                We implement appropriate security measures to protect your
                personal information against unauthorized access, alteration,
                disclosure, or destruction. However, no method of transmission
                over the internet or electronic storage is 100% secure, and we
                cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-4 text-2xl font-semibold'>
                7. Your Rights
              </h2>
              <p className='text-text-secondary dark:text-text-dark-secondary mb-4 leading-relaxed'>
                Depending on your location, you may have certain rights
                regarding your personal information, including:
              </p>
              <ul className='text-text-secondary dark:text-text-dark-secondary list-disc space-y-2 pl-6 leading-relaxed'>
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to delete your personal information</li>
                <li>The right to restrict processing of your information</li>
                <li>The right to data portability</li>
              </ul>
            </section>

            <section>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-4 text-2xl font-semibold'>
                8. Children&apos;s Privacy
              </h2>
              <p className='text-text-secondary dark:text-text-dark-secondary leading-relaxed'>
                Our website is not intended for children under the age of 13. We
                do not knowingly collect personal information from children
                under 13. If you are a parent or guardian and believe your child
                has provided us with personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-4 text-2xl font-semibold'>
                9. Changes to This Privacy Policy
              </h2>
              <p className='text-text-secondary dark:text-text-dark-secondary leading-relaxed'>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last updated&quot; date at the
                top of this policy.
              </p>
            </section>

            <section>
              <h2 className='text-text-primary dark:text-text-dark-primary mb-4 text-2xl font-semibold'>
                10. Contact Us
              </h2>
              <p className='text-text-secondary dark:text-text-dark-secondary leading-relaxed'>
                If you have any questions about this Privacy Policy, please
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
