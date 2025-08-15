'use client';

import { useState, useEffect } from 'react';

export function useBrowserDetection() {
  const [browser, setBrowser] = useState<'safari' | 'chrome' | 'firefox' | 'other'>('other');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (typeof window === 'undefined') return;

    const userAgent = window.navigator.userAgent;
    
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      setBrowser('safari');
    } else if (userAgent.includes('Chrome')) {
      setBrowser('chrome');
    } else if (userAgent.includes('Firefox')) {
      setBrowser('firefox');
    } else {
      setBrowser('other');
    }
  }, []);

  const isSafari = mounted && browser === 'safari';
  const supportsDualVideo = mounted && (browser === 'chrome' || browser === 'firefox');

  return { browser, isSafari, supportsDualVideo, mounted };
}