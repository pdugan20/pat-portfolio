interface PauseIconProps {
  className?: string;
}

export default function PauseIcon({ className = 'h-6 w-6' }: PauseIconProps) {
  return (
    <svg className={className} fill='currentColor' viewBox='0 0 24 24'>
      <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
    </svg>
  );
}
