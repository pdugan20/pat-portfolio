'use client';

import { useEffect, useState, useCallback } from 'react';

interface DarkVariantsManifest {
  [lightPath: string]: string;
}

interface PreloadProgress {
  total: number;
  loaded: number;
  isComplete: boolean;
}

export function useAssetPreloader() {
  const [manifest, setManifest] = useState<DarkVariantsManifest | null>(null);
  const [preloadProgress, setPreloadProgress] = useState<PreloadProgress>({
    total: 0,
    loaded: 0,
    isComplete: false,
  });
  const [preloadedAssets, setPreloadedAssets] = useState<Set<string>>(
    new Set()
  );

  // Load manifest on mount
  useEffect(() => {
    fetch('/dark-variants.json')
      .then(res => res.json())
      .then(data => {
        setManifest(data);
        // Start preloading as soon as manifest loads
        preloadAllAssets(data);
      })
      .catch(err => {
        console.warn('Could not load dark variants manifest:', err);
        setManifest({});
      });
  }, []);

  const preloadAllAssets = useCallback(
    async (manifestData: DarkVariantsManifest) => {
      const assetsToPreload: string[] = [];

      // Collect all assets (both light and dark variants)
      Object.entries(manifestData).forEach(([lightPath, darkPath]) => {
        assetsToPreload.push(lightPath, darkPath);
      });

      setPreloadProgress({
        total: assetsToPreload.length,
        loaded: 0,
        isComplete: false,
      });

      const loadPromises = assetsToPreload.map(async src => {
        try {
          if (src.endsWith('.mp4')) {
            // Preload video
            await preloadVideo(src);
          } else {
            // Preload image
            await preloadImage(src);
          }

          setPreloadedAssets(prev => new Set(prev).add(src));
          setPreloadProgress(prev => ({
            ...prev,
            loaded: prev.loaded + 1,
          }));
        } catch (error) {
          console.warn(`Failed to preload asset: ${src}`, error);
          // Still mark as "loaded" to not block progress
          setPreloadProgress(prev => ({
            ...prev,
            loaded: prev.loaded + 1,
          }));
        }
      });

      await Promise.all(loadPromises);

      setPreloadProgress(prev => ({
        ...prev,
        isComplete: true,
      }));
    },
    []
  );

  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  };

  const preloadVideo = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.muted = true;

      // Also preload the poster image if it exists
      const posterSrc = src
        .replace('.mp4', '.jpg')
        .replace('/mov/', '/mov/poster/');
      preloadImage(posterSrc).catch(() => {
        // Poster might not exist, that's okay
      });

      video.oncanplaythrough = () => {
        resolve();
        // Clean up the video element
        video.remove();
      };

      video.onerror = () => reject(new Error(`Failed to load video: ${src}`));
      video.src = src;
      video.load();
    });
  };

  const isAssetPreloaded = (src: string): boolean => {
    return preloadedAssets.has(src);
  };

  return {
    manifest,
    preloadProgress,
    isAssetPreloaded,
    allAssetsLoaded: preloadProgress.isComplete,
  };
}
