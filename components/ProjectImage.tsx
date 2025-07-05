import Image from 'next/image';

interface ProjectImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function ProjectImage({ src, alt, caption }: ProjectImageProps) {
  return (
    <figure className='my-8'>
      <div className='border-border-primary dark:border-border-dark-primary overflow-hidden rounded-lg border'>
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          className='h-auto w-full'
        />
      </div>
      {caption && (
        <figcaption className='text-text-secondary dark:text-text-dark-secondary mt-2 text-center text-sm'>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
