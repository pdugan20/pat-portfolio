interface NextdoorLogoProps {
  className?: string;
}

export default function NextdoorLogo({
  className = 'h-4 w-4',
}: NextdoorLogoProps) {
  return (
    <svg className={className} viewBox='-80 -60 1704 1346' aria-hidden='true'>
      <path
        className='fill-[#1B8751] dark:fill-current'
        d='m497.2 172.6v-172.5h-228.7v316.2l-267.9 168.4 121.3 193.1 146.6-92v639.8h1007.6v-639.8l146.6 92 121.3-193.1-771.4-484.6z'
      />
    </svg>
  );
}
