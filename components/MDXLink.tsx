import Link from 'next/link';

interface MDXLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function MDXLink({ href, children, className }: MDXLinkProps) {
  const isExternal = href.startsWith('http://') || href.startsWith('https://');
  const linkClasses = `text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 ${className || ''}`;

  if (isExternal) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={linkClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClasses}>
      {children}
    </Link>
  );
}
