'use client';

import { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { PlayIcon, PauseIcon, RestartIcon } from './icons';
import { darkVariants } from '@/lib/dark-variants';

interface VideoItem {
  src: string;
  alt: string;
  caption?: string;
}

interface PostMovieProps {
  videos: VideoItem[];
  className?: string;
}

function getVideoSrc(src: string, isDark: boolean): string {
  if (!isDark) return src;
  return darkVariants[src] || src;
}

function getWebmSrc(mp4Src: string): string {
  return mp4Src.replace('.mp4', '.webm');
}

function getPosterSrc(videoSrc: string, isDark: boolean): string {
  const posterPath = videoSrc
    .replace('.mp4', '.jpg')
    .replace('/mov/', '/mov/poster/');
  if (!isDark) return posterPath;
  return darkVariants[posterPath] || posterPath;
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
  const hasEndedRef = useRef(false);
  const { theme } = useTheme();

  const isDark =
    mounted &&
    (theme === 'dark' ||
      (theme === 'system' &&
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches));

  // Keep ref in sync with state for use in observer callback
  useEffect(() => {
    hasEndedRef.current = hasEnded;
  }, [hasEnded]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;

        // Fade in at 10% visibility (one-time)
        if (ratio >= 0.1) {
          setHasInitiallyAppeared(true);
        }

        // Autoplay at 50% visibility
        if (videoRef.current) {
          if (ratio >= 0.5 && !hasEndedRef.current) {
            videoRef.current.play().catch(() => {});
            setIsCurrentlyPlaying(true);
            setHasEverStarted(true);
          } else if (ratio < 0.5) {
            videoRef.current.pause();
            setIsCurrentlyPlaying(false);
          }
        }
      },
      { threshold: [0.1, 0.5] }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isCurrentlyPlaying) {
        videoRef.current.pause();
        setIsCurrentlyPlaying(false);
      } else {
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
    setHasEnded(false);
  };

  const handleVideoPause = () => {
    setIsCurrentlyPlaying(false);
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
          const mp4Src = getVideoSrc(video.src, isDark);
          const webmSrc = getWebmSrc(mp4Src);
          const posterSrc = getPosterSrc(video.src, isDark);

          return (
            <div
              key={video.src}
              className='relative w-full'
              style={{
                backgroundImage: `url(${posterSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                aspectRatio: '1 / 1',
              }}
            >
              <video
                key={`${video.src}-${mp4Src}`}
                ref={videoRef}
                className={`h-auto w-full border-0 transition-opacity duration-300 outline-none ${
                  hasEverStarted ? 'opacity-100' : 'opacity-0'
                }`}
                playsInline
                preload='metadata'
                muted
                onEnded={handleVideoEnded}
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onLoadedMetadata={handleVideoLoadedMetadata}
                onTimeUpdate={() => {
                  if (videoRef.current && !videoRef.current.ended && hasEnded) {
                    setHasEnded(false);
                  }
                }}
                onLoadedData={() => {
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
                <source src={webmSrc} type='video/webm' />
                <source src={mp4Src} type='video/mp4' />
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
            {hasEnded ? (
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
