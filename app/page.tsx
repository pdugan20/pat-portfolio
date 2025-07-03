import Layout from '@/components/Layout';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pat Dugan - Software Developer',
  description:
    'Software developer passionate about creating beautiful, functional, and user-friendly applications',
};

export default function Home() {
  return (
    <Layout>
      <div className='mx-auto max-w-4xl'>
        {/* Hero Section */}
        <section className='py-16 text-center'>
          <h1 className='mb-6 text-4xl font-bold text-gray-900 md:text-6xl dark:text-white'>
            Hi, I&apos;m{' '}
            <span className='text-blue-600 dark:text-blue-400'>Pat Dugan</span>
          </h1>
          <p className='mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-300'>
            I&apos;m a software developer passionate about creating beautiful,
            functional, and user-friendly applications. I specialize in modern
            web technologies and love sharing my knowledge through writing.
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Link
              href='/blog'
              className='rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700'
            >
              Read My Blog
            </Link>
            <Link
              href='/projects'
              className='rounded-lg border border-gray-300 px-8 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
            >
              View Projects
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className='py-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900 dark:text-white'>
            About Me
          </h2>
          <div className='grid gap-8 md:grid-cols-2'>
            <div>
              <p className='mb-4 text-gray-600 dark:text-gray-300'>
                I&apos;m a dedicated software developer with a passion for
                creating innovative solutions. My journey in technology has led
                me through various roles where I&apos;ve honed my skills in both
                frontend and backend development.
              </p>
              <p className='mb-4 text-gray-600 dark:text-gray-300'>
                When I&apos;m not coding, you can find me writing about
                technology, contributing to open-source projects, or exploring
                new frameworks and tools to stay current with industry trends.
              </p>
            </div>
            <div>
              <h3 className='mb-4 text-xl font-semibold text-gray-900 dark:text-white'>
                Skills
              </h3>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='mb-2 font-medium text-gray-900 dark:text-white'>
                    Frontend
                  </h4>
                  <ul className='space-y-1 text-gray-600 dark:text-gray-300'>
                    <li>React & Next.js</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>HTML/CSS</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium text-gray-900 dark:text-white'>
                    Backend
                  </h4>
                  <ul className='space-y-1 text-gray-600 dark:text-gray-300'>
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
          <h2 className='mb-8 text-3xl font-bold text-gray-900 dark:text-white'>
            Featured Projects
          </h2>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {/* Project Card 1 */}
            <div className='overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800'>
              <div className='p-6'>
                <h3 className='mb-2 text-xl font-semibold text-gray-900 dark:text-white'>
                  Portfolio Website
                </h3>
                <p className='mb-4 text-gray-600 dark:text-gray-300'>
                  A modern portfolio built with Next.js, TypeScript, and
                  Tailwind CSS. Features a blog section with MDX support.
                </p>
                <div className='mb-4 flex flex-wrap gap-2'>
                  <span className='rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
                    Next.js
                  </span>
                  <span className='rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
                    TypeScript
                  </span>
                  <span className='rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
                    Tailwind
                  </span>
                </div>
                <Link
                  href='/projects/portfolio-website'
                  className='font-medium text-blue-600 hover:underline dark:text-blue-400'
                >
                  View Project →
                </Link>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className='overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800'>
              <div className='p-6'>
                <h3 className='mb-2 text-xl font-semibold text-gray-900 dark:text-white'>
                  E-commerce Platform
                </h3>
                <p className='mb-4 text-gray-600 dark:text-gray-300'>
                  A full-stack e-commerce solution with user authentication,
                  payment processing, and admin dashboard.
                </p>
                <div className='mb-4 flex flex-wrap gap-2'>
                  <span className='rounded bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900 dark:text-green-200'>
                    React
                  </span>
                  <span className='rounded bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900 dark:text-green-200'>
                    Node.js
                  </span>
                  <span className='rounded bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900 dark:text-green-200'>
                    MongoDB
                  </span>
                </div>
                <a
                  href='#'
                  className='font-medium text-blue-600 hover:underline dark:text-blue-400'
                >
                  View Project →
                </a>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className='overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800'>
              <div className='p-6'>
                <h3 className='mb-2 text-xl font-semibold text-gray-900 dark:text-white'>
                  Task Management App
                </h3>
                <p className='mb-4 text-gray-600 dark:text-gray-300'>
                  A collaborative task management application with real-time
                  updates, team collaboration, and progress tracking.
                </p>
                <div className='mb-4 flex flex-wrap gap-2'>
                  <span className='rounded bg-purple-100 px-2 py-1 text-xs text-purple-800 dark:bg-purple-900 dark:text-purple-200'>
                    Vue.js
                  </span>
                  <span className='rounded bg-purple-100 px-2 py-1 text-xs text-purple-800 dark:bg-purple-900 dark:text-purple-200'>
                    Firebase
                  </span>
                  <span className='rounded bg-purple-100 px-2 py-1 text-xs text-purple-800 dark:bg-purple-900 dark:text-purple-200'>
                    WebSockets
                  </span>
                </div>
                <a
                  href='#'
                  className='font-medium text-blue-600 hover:underline dark:text-blue-400'
                >
                  View Project →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className='py-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900 dark:text-white'>
            Get In Touch
          </h2>
          <div className='text-center'>
            <p className='mx-auto mb-6 max-w-2xl text-gray-600 dark:text-gray-300'>
              I&apos;m always interested in hearing about new opportunities and
              exciting projects. Whether you have a question or just want to say
              hi, feel free to reach out!
            </p>
            <a
              href='mailto:hello@patdugan.com'
              className='inline-block rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700'
            >
              Say Hello
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
