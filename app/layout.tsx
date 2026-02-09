import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@/styles/mdx.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SITE_CONFIG } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.author} - ${SITE_CONFIG.title}`,
  description: SITE_CONFIG.description,
  icons: {
    icon: '/favicon.svg',
  },
  alternates: {
    types: {
      'application/rss+xml': '/api/feeds/rss',
      'application/atom+xml': '/api/feeds/atom',
      'application/feed+json': '/api/feeds/json',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
        {/* Light mode */}
        <meta
          name='theme-color'
          content='#FFFFFF'
          media='(prefers-color-scheme: light)'
        />
        {/* Dark mode */}
        <meta
          name='theme-color'
          content='#000000'
          media='(prefers-color-scheme: dark)'
        />
      </head>
      <body className='font-sans antialiased'>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
