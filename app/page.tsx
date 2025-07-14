import Layout from '@/components/Layout';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${SITE_CONFIG.author} - ${SITE_CONFIG.title}`,
  description: SITE_CONFIG.description,
};

export default function Home() {
  return (
    <Layout>
      <div className='mx-auto max-w-4xl'>
        {/* Hero Section */}
        <section className='py-16 text-center'>
          <h1 className='text-text-primary dark:text-text-dark-primary mb-6 text-4xl font-bold md:text-6xl'>
            Hi, I&apos;m{' '}
            <span className='text-primary dark:text-primary-light'>
              {SITE_CONFIG.author}
            </span>
          </h1>
          <p className='text-text-secondary dark:text-text-dark-secondary mx-auto mb-8 max-w-2xl text-xl'>
            I&apos;m a software developer passionate about creating beautiful,
            functional, and user-friendly applications. I specialize in modern
            web technologies and love sharing my knowledge through writing.
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Link
              href='/writing'
              className='bg-primary hover:bg-primary-hover rounded-lg px-8 py-3 font-medium text-white transition-colors'
            >
              Read My Writing
            </Link>
            <Link
              href='/projects'
              className='border-border-primary text-text-secondary hover:bg-bg-secondary dark:border-border-dark-primary dark:text-text-dark-secondary dark:hover:bg-bg-dark-secondary rounded-lg border px-8 py-3 font-medium transition-colors'
            >
              View Projects
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className='py-16'>
          <h2 className='text-text-primary dark:text-text-dark-primary mb-8 text-3xl font-bold'>
            About Me
          </h2>
          <div className='grid gap-8 md:grid-cols-2'>
            <div>
              <p className='text-text-secondary dark:text-text-dark-secondary mb-4'>
                I&apos;m a dedicated software developer with a passion for
                creating innovative solutions. My journey in technology has led
                me through various roles where I&apos;ve honed my skills in both
                frontend and backend development.
              </p>
              <p className='text-text-secondary dark:text-text-dark-secondary mb-4'>
                When I&apos;m not coding, you can find me writing about
                technology, contributing to open-source projects, or exploring
                new frameworks and tools to stay current with industry trends.
              </p>
            </div>
            <div>
              <h3 className='text-text-primary dark:text-text-dark-primary mb-4 text-xl font-semibold'>
                Skills
              </h3>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='text-text-primary dark:text-text-dark-primary mb-2 font-medium'>
                    Frontend
                  </h4>
                  <ul className='text-text-secondary dark:text-text-dark-secondary space-y-1'>
                    <li>React & Next.js</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>HTML/CSS</li>
                  </ul>
                </div>
                <div>
                  <h4 className='text-text-primary dark:text-text-dark-primary mb-2 font-medium'>
                    Backend
                  </h4>
                  <ul className='text-text-secondary dark:text-text-dark-secondary space-y-1'>
                    <li>Node.js</li>
                    <li>Python</li>
                    <li>Databases</li>
                    <li>APIs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id='projects' className='py-16'>
          <h2 className='text-text-primary dark:text-text-dark-primary mb-8 text-3xl font-bold'>
            Featured Projects
          </h2>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {/* Project Card 1 */}
            <div className='bg-bg-primary dark:bg-bg-dark-secondary overflow-hidden rounded-lg shadow-md'>
              <div className='p-6'>
                <h3 className='text-text-primary dark:text-text-dark-primary mb-2 text-xl font-semibold'>
                  Portfolio Website
                </h3>
                <p className='text-text-secondary dark:text-text-dark-secondary mb-4'>
                  A modern portfolio built with Next.js, TypeScript, and
                  Tailwind CSS. Features a blog section with MDX support.
                </p>
                <div className='mb-4 flex flex-wrap gap-2'>
                  <span className='bg-primary bg-opacity-10 text-primary dark:bg-primary dark:bg-opacity-20 dark:text-primary-light rounded px-2 py-1 text-xs'>
                    Next.js
                  </span>
                  <span className='bg-primary bg-opacity-10 text-primary dark:bg-primary dark:bg-opacity-20 dark:text-primary-light rounded px-2 py-1 text-xs'>
                    TypeScript
                  </span>
                  <span className='bg-primary bg-opacity-10 text-primary dark:bg-primary dark:bg-opacity-20 dark:text-primary-light rounded px-2 py-1 text-xs'>
                    Tailwind
                  </span>
                </div>
                <Link
                  href='/projects/portfolio-website'
                  className='text-primary dark:text-primary-light font-medium hover:underline'
                >
                  View Project →
                </Link>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className='bg-bg-primary dark:bg-bg-dark-secondary overflow-hidden rounded-lg shadow-md'>
              <div className='p-6'>
                <h3 className='text-text-primary dark:text-text-dark-primary mb-2 text-xl font-semibold'>
                  E-commerce Platform
                </h3>
                <p className='text-text-secondary dark:text-text-dark-secondary mb-4'>
                  A full-stack e-commerce solution with user authentication,
                  payment processing, and admin dashboard.
                </p>
                <div className='mb-4 flex flex-wrap gap-2'>
                  <span className='bg-success bg-opacity-10 text-success dark:bg-success dark:bg-opacity-20 dark:text-success-light rounded px-2 py-1 text-xs'>
                    React
                  </span>
                  <span className='bg-success bg-opacity-10 text-success dark:bg-success dark:bg-opacity-20 dark:text-success-light rounded px-2 py-1 text-xs'>
                    Node.js
                  </span>
                  <span className='bg-success bg-opacity-10 text-success dark:bg-success dark:bg-opacity-20 dark:text-success-light rounded px-2 py-1 text-xs'>
                    MongoDB
                  </span>
                </div>
                <a
                  href='#'
                  className='text-primary dark:text-primary-light font-medium hover:underline'
                >
                  View Project →
                </a>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className='bg-bg-primary dark:bg-bg-dark-secondary overflow-hidden rounded-lg shadow-md'>
              <div className='p-6'>
                <h3 className='text-text-primary dark:text-text-dark-primary mb-2 text-xl font-semibold'>
                  Task Management App
                </h3>
                <p className='text-text-secondary dark:text-text-dark-secondary mb-4'>
                  A collaborative task management application with real-time
                  updates, team collaboration, and progress tracking.
                </p>
                <div className='mb-4 flex flex-wrap gap-2'>
                  <span className='bg-opacity-10 dark:bg-opacity-20 rounded bg-purple-500 px-2 py-1 text-xs text-purple-500 dark:bg-purple-500 dark:text-purple-400'>
                    Vue.js
                  </span>
                  <span className='bg-opacity-10 dark:bg-opacity-20 rounded bg-purple-500 px-2 py-1 text-xs text-purple-500 dark:bg-purple-500 dark:text-purple-400'>
                    Firebase
                  </span>
                  <span className='bg-opacity-10 dark:bg-opacity-20 rounded bg-purple-500 px-2 py-1 text-xs text-purple-500 dark:bg-purple-500 dark:text-purple-400'>
                    WebSockets
                  </span>
                </div>
                <a
                  href='#'
                  className='text-primary dark:text-primary-light font-medium hover:underline'
                >
                  View Project →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className='py-16'>
          <h2 className='text-text-primary dark:text-text-dark-primary mb-8 text-3xl font-bold'>
            Get In Touch
          </h2>
          <div className='text-center'>
            <p className='text-text-secondary dark:text-text-dark-secondary mx-auto mb-6 max-w-2xl'>
              I&apos;m always interested in hearing about new opportunities and
              exciting projects. Whether you have a question or just want to say
              hi, feel free to reach out!
            </p>
            <a
              href='mailto:hello@patdugan.com'
              className='bg-primary hover:bg-primary-hover inline-block rounded-lg px-8 py-3 font-medium text-white transition-colors'
            >
              Say Hello
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
