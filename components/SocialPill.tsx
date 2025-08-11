interface SocialPillProps {
  href: string;
  label: string;
  ariaLabel: string;
  isExternal?: boolean;
}

export default function SocialPill({
  href,
  label,
  ariaLabel,
  isExternal = true,
}: SocialPillProps) {
  const externalProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a
      href={href}
      className='bg-bg-primary dark:bg-bg-dark-secondary text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium transition-colors hover:border-gray-300 dark:dark:border-gray-600/60 dark:hover:border-gray-600 dark:hover:bg-gray-800'
      aria-label={ariaLabel}
      {...externalProps}
    >
      {label}
    </a>
  );
}
