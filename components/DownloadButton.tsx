interface DownloadButtonProps {
  href: string;
  label: string;
  ariaLabel: string;
}

type ButtonStyle = 'minimal' | 'outlined' | 'filled' | 'icon' | 'pill';

export default function DownloadButton({
  href,
  label,
  ariaLabel,
}: DownloadButtonProps) {
  const buttonStyle: ButtonStyle = 'outlined';

  const getButtonClasses = (style: ButtonStyle) => {
    const baseClasses = 'transition-colors text-xs font-medium';

    switch (style) {
      case 'minimal':
        return `${baseClasses} text-text-muted hover:text-text-primary dark:text-text-dark-muted dark:hover:text-text-dark-primary`;

      case 'outlined':
        return `${baseClasses} border-border-primary dark:border-border-dark-primary text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary rounded border px-2 py-1 hover:bg-bg-secondary dark:hover:bg-bg-dark-secondary`;

      case 'filled':
        return `${baseClasses} bg-primary hover:bg-primary-hover text-white rounded px-2 py-1 shadow-sm hover:shadow-md`;

      case 'icon':
        return `${baseClasses} text-text-muted hover:text-text-primary dark:text-text-dark-muted dark:hover:text-text-dark-primary p-1 rounded hover:bg-bg-secondary dark:hover:bg-bg-dark-secondary`;

      case 'pill':
        return `${baseClasses} bg-bg-primary dark:bg-bg-dark-secondary border-border-primary dark:border-border-dark-primary text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary rounded-full border px-3 py-1 hover:bg-bg-secondary dark:hover:bg-bg-dark-tertiary`;

      default:
        return baseClasses;
    }
  };

  const getButtonContent = (style: ButtonStyle) => {
    switch (style) {
      case 'icon':
        return (
          <svg
            className='h-4 w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
            />
          </svg>
        );
      default:
        return label;
    }
  };

  return (
    <a
      href={href}
      download
      className={getButtonClasses(buttonStyle)}
      aria-label={ariaLabel}
    >
      {getButtonContent(buttonStyle)}
    </a>
  );
}
