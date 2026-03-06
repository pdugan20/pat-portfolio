import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='bg-bg-primary text-text-primary dark:bg-bg-dark-primary dark:text-text-dark-primary flex min-h-screen flex-col'>
      <main className='mx-auto w-full max-w-[653px] flex-1 px-6 py-12 md:py-20'>
        {children}
      </main>
      <Footer />
    </div>
  );
}
