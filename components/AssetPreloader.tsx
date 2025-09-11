'use client';

import { useAssetPreloader } from '@/hooks/useAssetPreloader';
import { useEffect } from 'react';

export function AssetPreloader({ children }: { children: React.ReactNode }) {
  const { preloadProgress, allAssetsLoaded } = useAssetPreloader();

  useEffect(() => {
    if (allAssetsLoaded) {
      console.log('All theme variant assets preloaded');
    }
  }, [allAssetsLoaded]);

  // Optionally show a subtle loading indicator
  // You can remove this if you don't want any visual feedback
  if (!allAssetsLoaded && preloadProgress.total > 0) {
    console.log(
      `Preloading assets: ${preloadProgress.loaded}/${preloadProgress.total}`
    );
  }

  return <>{children}</>;
}
