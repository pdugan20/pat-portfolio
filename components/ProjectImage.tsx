import Image from 'next/image';

interface ProjectImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function ProjectImage({ src, alt, caption }: ProjectImageProps) {
  return (
    <figure className='my-8'>
      <div className='overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700'>
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          className='h-auto w-full'
        />
      </div>
      {caption && (
        <figcaption className='mt-2 text-center text-sm text-gray-600 dark:text-gray-400'>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
