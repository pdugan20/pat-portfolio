'use client';

import { useRef, useEffect, useState } from 'react';

interface VideoItem {
  src: string;
  alt: string;
  caption?: string;
}

interface PostMovieProps {
  videos: VideoItem[];
  className?: string;
}

export default function PostMovie({ videos, className = '' }: PostMovieProps) {
  const [hasInitiallyAppeared, setHasInitiallyAppeared] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Observer for initial fade-in (triggers earlier)
    const fadeObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasInitiallyAppeared) {
          setHasInitiallyAppeared(true);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of video is visible
    );

    // Observer for autoplay (triggers later)
    const autoplayObserver = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;

        // Auto-play when entering viewport, pause when leaving
        if (videoRef.current) {
          if (isIntersecting && !hasEnded) {
            videoRef.current.play().catch(() => {
              // Handle autoplay restrictions gracefully
              console.log('Autoplay prevented by browser');
            });
            setIsPlaying(true);
            // Only set hasStartedPlaying once, not every time it enters viewport
            if (!hasStartedPlaying) {
              setHasStartedPlaying(true);
            }
          } else if (!isIntersecting) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.5 } // Trigger when 50% of video is visible
    );

    if (containerRef.current) {
      fadeObserver.observe(containerRef.current);
      autoplayObserver.observe(containerRef.current);
    }

    return () => {
      fadeObserver.disconnect();
      autoplayObserver.disconnect();
    };
  }, [hasEnded, hasInitiallyAppeared, hasStartedPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        // Reset ended state when manually playing
        setHasEnded(false);
        videoRef.current.play().catch(() => {
          console.log('Play prevented by browser');
        });
        setIsPlaying(true);
      }
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setHasEnded(true);
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setHasEnded(false);
      videoRef.current.play().catch(() => {
        console.log('Restart prevented by browser');
      });
      setIsPlaying(true);
    }
  };

  const handleVideoPlay = () => {
    setHasStartedPlaying(true);
    // Reset ended state when video starts playing
    setHasEnded(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative my-12 w-full transition-all duration-600 ease-out ${
        hasInitiallyAppeared
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0'
      } ${className}`}
    >
      {/* Video Container */}
      <div className='relative w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900'>
        <style jsx>{`
          video {
            border: none !important;
            outline: none !important;
            background: transparent !important;
            display: block !important;
            vertical-align: top !important;
            -webkit-transform: translateZ(0) !important;
            -webkit-backface-visibility: hidden !important;
            -webkit-perspective: 1000px !important;
            -webkit-mask-image: -webkit-radial-gradient(
              white,
              black
            ) !important;
          }
        `}</style>
        {videos.map(video => (
          <div
            key={video.src}
            className='relative h-full w-full'
            style={{
              backgroundImage: `url(/assets/mov/poster/${video.src.split('/').pop()?.replace('.mp4', '.jpg')})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <video
              ref={videoRef}
              src={video.src}
              className={`h-auto w-full border-0 transition-opacity duration-300 ${
                hasStartedPlaying ? 'opacity-100' : 'opacity-0'
              }`}
              playsInline
              preload='auto'
              muted
              onEnded={handleVideoEnded}
              onPlay={handleVideoPlay}
              onTimeUpdate={() => {
                // Ensure ended state is false when video is playing
                if (videoRef.current && !videoRef.current.ended && hasEnded) {
                  setHasEnded(false);
                }
              }}
              style={{
                outline: 'none',
                border: 'none',
                background: 'transparent',
                display: 'block',
              }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        ))}

        {/* Custom Play/Pause/Restart Button */}
        <div className='absolute bottom-6 left-6'>
          <button
            onClick={hasEnded ? restartVideo : togglePlay}
            className='rounded-full bg-gray-200/80 p-2.5 text-gray-500 transition-all duration-200 hover:cursor-pointer hover:bg-gray-300/80'
          >
            {hasEnded ? (
              <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z' />
              </svg>
            ) : isPlaying ? (
              <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
              </svg>
            ) : (
              <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M8 5v14l11-7z' />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Caption */}
      {videos[0]?.caption && (
        <div className='relative mt-4 flex items-start justify-between'>
          <p className='!text-text-muted !dark:text-text-dark-muted !text-xs !leading-[1.333373] !font-semibold !tracking-[-0.01em] transition-opacity duration-500 ease-in-out'>
            {videos[0].caption}
          </p>
        </div>
      )}
    </div>
  );
}
