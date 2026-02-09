'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PreviousIcon, NextIcon } from './icons';
import { darkVariants } from '@/lib/dark-variants';

interface ImageItem {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface PostImageProps {
  images: ImageItem[];
  className?: string;
  width?: number;
  height?: number;
}

export default function PostImage({
  images,
  className = '',
  width,
  height,
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
      className={`relative mt-6 mb-4 transition-all duration-600 ease-out md:mt-8 md:mb-6 lg:mt-12 lg:mb-8 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
      style={width ? {} : { width: '100%' }}
    >
      {/* Image Container with Navigation */}
      <div className='relative'>
        {/* Image Container */}
        <div
          className={`relative w-full overflow-hidden rounded-2xl bg-gray-50 dark:bg-neutral-900 ${
            width ? 'post-image-wide-xl' : ''
          }`}
        >
          {images.map((image, index) => {
            const imgWidth = image.width || width || 1200;
            const imgHeight = image.height || height || 800;

            const lightSrc = image.src;
            const darkSrc = darkVariants[image.src];
            const hasDarkVariant = !!darkSrc;

            return (
              <div
                key={image.src}
                className={`${
                  index === currentIndex
                    ? 'relative z-10'
                    : 'absolute inset-0 z-0 opacity-0'
                }`}
              >
                {hasDarkVariant ? (
                  <>
                    {/* Light mode image - hidden in dark mode */}
                    <Image
                      src={lightSrc}
                      alt={image.alt}
                      width={imgWidth}
                      height={imgHeight}
                      className='h-auto w-full object-contain dark:hidden'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
                      priority={index === 0}
                    />
                    {/* Dark mode image - hidden in light mode */}
                    <Image
                      src={darkSrc}
                      alt={image.alt}
                      width={imgWidth}
                      height={imgHeight}
                      className='hidden h-auto w-full object-contain dark:block'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
                      priority={index === 0}
                    />
                  </>
                ) : (
                  <Image
                    src={lightSrc}
                    alt={image.alt}
                    width={imgWidth}
                    height={imgHeight}
                    className='h-auto w-full object-contain'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
                    priority={index === 0}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation - positioned outside image container */}
        {isCarousel && (
          <>
            {/* Previous Button */}
            <button
              onClick={prevImage}
              className='absolute top-1/2 -left-16 hidden -translate-y-1/2 rounded-full bg-gray-100/80 p-3 text-gray-500 backdrop-blur-sm transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-200/50 focus:outline-none lg:block dark:bg-gray-700/40 dark:text-gray-300 dark:hover:bg-gray-700/60'
              aria-label='Previous image'
            >
              <div className='-translate-x-px'>
                <PreviousIcon />
              </div>
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className='absolute top-1/2 -right-16 hidden -translate-y-1/2 rounded-full bg-gray-100/80 p-3 text-gray-500 backdrop-blur-sm transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-200/50 focus:outline-none lg:block dark:bg-gray-700/40 dark:text-gray-300 dark:hover:bg-gray-700/60'
              aria-label='Next image'
            >
              <div className='translate-x-px'>
                <NextIcon />
              </div>
            </button>
          </>
        )}
      </div>

      {/* Caption */}
      <div className='relative mt-4 flex items-start justify-between'>
        {images.map((image, index) => (
          <div
            key={`${image.src}-caption`}
            className={`flex w-full items-start justify-between transition-opacity duration-[800ms] ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'absolute opacity-0'
            }`}
          >
            <p className='text-text-muted dark:text-text-dark-muted post-image-caption !text-xs !leading-[1.333373] !font-semibold !tracking-tight'>
              {image.caption}
            </p>
          </div>
        ))}
      </div>

      {/* Carousel Indicators */}
      {isCarousel && (
        <div className='mt-2 mb-6 flex justify-center space-x-2 md:mb-8 lg:mb-12'>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ease-in-out hover:cursor-pointer ${
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
