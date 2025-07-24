'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PreviousIcon, NextIcon } from './icons';

interface ImageItem {
  src: string;
  alt: string;
  caption?: string;
}

interface PostImageProps {
  images: ImageItem[];
  className?: string;
  width?: number;
}

export default function PostImage({
  images,
  className = '',
  width,
}: PostImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isCarousel = images.length > 1;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextImage = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      ref={containerRef}
      className={`relative my-12 transition-all duration-600 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
      style={width ? {} : { width: '100%' }}
    >
      {/* Image Container */}
      <div
        className={`relative w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900 ${
          width ? 'post-image-wide-xl' : ''
        }`}
        style={width ? {} : {}}
      >
        {images.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={1200}
            height={800}
            className={`h-auto w-full object-contain transition-opacity duration-1200 ease-in-out ${
              index === currentIndex
                ? 'relative z-10 opacity-100'
                : 'absolute inset-0 z-0 opacity-0'
            }`}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
            priority={index === 0}
          />
        ))}
      </div>

      {/* Carousel Navigation */}
      {isCarousel && (
        <>
          {/* Previous Button */}
          <button
            onClick={prevImage}
            className='absolute top-1/2 -left-16 hidden -translate-y-1/2 rounded-full bg-gray-100/80 p-3 text-gray-500 backdrop-blur-sm transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-200/50 focus:ring-2 focus:ring-gray-500 focus:outline-none lg:block dark:bg-gray-800/80 dark:text-gray-400 dark:hover:bg-gray-700/80 dark:focus:ring-gray-400'
            aria-label='Previous image'
          >
            <PreviousIcon />
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className='absolute top-1/2 -right-16 hidden -translate-y-1/2 rounded-full bg-gray-100/80 p-3 text-gray-500 backdrop-blur-sm transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-200/50 focus:ring-2 focus:ring-gray-500 focus:outline-none lg:block dark:bg-gray-800/80 dark:text-gray-400 dark:hover:bg-gray-700/80 dark:focus:ring-gray-400'
            aria-label='Next image'
          >
            <NextIcon />
          </button>
        </>
      )}

      {/* Caption */}
      <div className='relative mt-4 flex items-start justify-between'>
        {images.map((image, index) => (
          <div
            key={`${image.src}-caption`}
            className={`flex w-full items-start justify-between transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'absolute opacity-0'
            }`}
          >
            <p className='text-text-muted dark:text-text-dark-muted post-image-caption !text-xs !leading-[1.333373] !font-semibold !tracking-[-0.01em]'>
              {image.caption}
            </p>
          </div>
        ))}
      </div>

      {/* Carousel Indicators */}
      {isCarousel && (
        <div className='mt-3 flex justify-center space-x-2'>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ease-in-out ${
                index === currentIndex
                  ? 'scale-110 bg-gray-600 dark:bg-gray-400'
                  : 'bg-gray-300 hover:scale-105 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
