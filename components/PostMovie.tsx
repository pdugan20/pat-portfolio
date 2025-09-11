'use client';

import { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { PlayIcon, PauseIcon, RestartIcon } from './icons';
import { useDarkVariants } from '../hooks/useDarkVariants';

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
  const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);
  const [hasEverStarted, setHasEverStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [videoDimensions, setVideoDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { getImageSrc } = useDarkVariants();
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

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
            setIsCurrentlyPlaying(true);
            // Only set hasEverStarted once, not every time it enters viewport
            if (!hasEverStarted) {
              setHasEverStarted(true);
            }
          } else if (!isIntersecting) {
            videoRef.current.pause();
            setIsCurrentlyPlaying(false);
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
  }, [hasEnded, hasInitiallyAppeared, hasEverStarted]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isCurrentlyPlaying) {
        videoRef.current.pause();
        setIsCurrentlyPlaying(false);
      } else {
        // Reset ended state when manually playing
        setHasEnded(false);
        videoRef.current.play().catch(() => {
          console.log('Play prevented by browser');
        });
        setIsCurrentlyPlaying(true);
      }
    }
  };

  const handleVideoEnded = () => {
    setIsCurrentlyPlaying(false);
    setHasEnded(true);
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setHasEnded(false);
      videoRef.current.play().catch(() => {
        console.log('Restart prevented by browser');
      });
      setIsCurrentlyPlaying(true);
    }
  };

  const handleVideoPlay = () => {
    setHasEverStarted(true);
    // Reset ended state when video starts playing
    setHasEnded(false);
  };

  const handleVideoPause = () => {
    setIsCurrentlyPlaying(false);
    // Don't set hasEnded when video is just paused
  };

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDimensions({
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      });
    }
  };

  // Reset player controls when theme changes
  useEffect(() => {
    if (videoRef.current && mounted) {
      // Reset to paused state when theme changes
      setIsCurrentlyPlaying(false);
      setHasEnded(false);
    }
  }, [theme, mounted]);

  return (
    <div
      ref={containerRef}
      className={`relative mt-6 mb-2 w-full transition-all duration-600 ease-out md:mt-8 md:mb-2 lg:mt-12 lg:mb-4 ${
        hasInitiallyAppeared
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0'
      } ${className}`}
    >
      {/* Video Container */}
      <div className='relative w-full overflow-hidden rounded-2xl bg-gray-50 dark:bg-neutral-900'>
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
        {videos.map(video => {
          const videoSrc = getImageSrc(video.src);
          const posterSrc = getImageSrc(
            video.src.replace('.mp4', '.jpg').replace('/mov/', '/mov/poster/')
          );

          return (
            <div
              key={video.src}
              className='relative w-full'
              style={{
                backgroundImage: `url(${posterSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                aspectRatio: '1 / 1', // Square aspect ratio
              }}
            >
              <video
                key={`${video.src}-${videoSrc}`} // Force re-render when src changes
                ref={videoRef}
                src={videoSrc}
                className={`h-auto w-full border-0 transition-opacity duration-300 outline-none ${
                  hasEverStarted ? 'opacity-100' : 'opacity-0'
                }`}
                playsInline
                preload='auto'
                muted
                onEnded={handleVideoEnded}
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onLoadedMetadata={handleVideoLoadedMetadata}
                onTimeUpdate={() => {
                  // Ensure ended state is false when video is playing
                  if (videoRef.current && !videoRef.current.ended && hasEnded) {
                    setHasEnded(false);
                  }
                }}
                onLoadedData={() => {
                  // Reset ended state when video loads
                  setHasEnded(false);
                }}
                style={{
                  outline: 'none',
                  border: 'none',
                  background: 'transparent',
                  display: 'block',
                  boxShadow: 'none',
                  WebkitBoxShadow: 'none',
                  MozBoxShadow: 'none',
                  ...(videoDimensions &&
                    hasEverStarted && {
                      aspectRatio: `${videoDimensions.width} / ${videoDimensions.height}`,
                    }),
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          );
        })}

        {/* Custom Play/Pause/Restart Button */}
        <div className='absolute bottom-6 left-6'>
          <button
            onClick={hasEnded ? restartVideo : togglePlay}
            className='rounded-full bg-gray-200/80 p-2.5 text-gray-500 transition-all duration-200 hover:cursor-pointer hover:bg-gray-300/80 dark:bg-gray-700/40 dark:text-gray-300 dark:hover:bg-gray-700/60'
          >
            {hasEnded && videoRef.current?.ended ? (
              <RestartIcon />
            ) : isCurrentlyPlaying ? (
              <PauseIcon />
            ) : (
              <PlayIcon />
            )}
          </button>
        </div>
      </div>

      {/* Caption */}
      {videos[0]?.caption && (
        <div className='relative mt-4 flex items-start justify-between'>
          <p className='text-text-muted dark:text-text-dark-muted post-movie-caption !text-xs !leading-[1.333373] !font-semibold !tracking-tight transition-opacity duration-500 ease-in-out'>
            {videos[0].caption}
          </p>
        </div>
      )}
    </div>
  );
}
