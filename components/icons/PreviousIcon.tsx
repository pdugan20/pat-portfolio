interface PreviousIconProps {
  className?: string;
}

export default function PreviousIcon({
  className = 'w-6 h-6',
}: PreviousIconProps) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m15 18-6-6 6-6' />
    </svg>
  );
}
