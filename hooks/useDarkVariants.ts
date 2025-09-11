import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

interface DarkVariantsManifest {
  [lightPath: string]: string;
}

export function useDarkVariants() {
  const [manifest, setManifest] = useState<DarkVariantsManifest | null>(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);

    // Load the dark variants manifest
    fetch('/dark-variants.json')
      .then(res => res.json())
      .then(data => setManifest(data))
      .catch(err => {
        console.warn('Could not load dark variants manifest:', err);
        setManifest({});
      });
  }, []);

  const getImageSrc = (originalSrc: string): string => {
    if (!mounted || !manifest) return originalSrc;

    const isDark =
      theme === 'dark' ||
      (theme === 'system' &&
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (!isDark) return originalSrc;

    // Check if this image has a dark variant in the manifest
    const darkVariant = manifest[originalSrc];
    return darkVariant || originalSrc;
  };

  return { getImageSrc, manifest, manifestLoaded: !!manifest };
}
