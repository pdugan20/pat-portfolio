interface PlayIconProps {
  className?: string;
}

export default function PlayIcon({ className = 'h-6 w-6' }: PlayIconProps) {
  return (
    <svg className={className} fill='currentColor' viewBox='0 0 24 24'>
      <path d='M8 5v14l11-7z' />
    </svg>
  );
}
