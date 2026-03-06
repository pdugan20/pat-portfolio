import Link from 'next/link';

interface MDXLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function MDXLink({ href, children, className }: MDXLinkProps) {
  const isExternal = href.startsWith('http://') || href.startsWith('https://');
  const linkClasses = `text-text-primary dark:text-text-dark-primary underline decoration-gray-300 dark:decoration-gray-600 underline-offset-2 transition-opacity hover:opacity-50 ${className || ''}`;

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
