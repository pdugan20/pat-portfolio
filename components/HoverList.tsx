'use client';

import { useRef, useState, useCallback } from 'react';

interface HoverListProps {
  children: React.ReactNode;
}

export default function HoverList({ children }: HoverListProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const [highlight, setHighlight] = useState<{
    top: number;
    height: number;
    opacity: number;
  }>({ top: 0, height: 0, opacity: 0 });

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setHighlight({
      top: rect.top - containerRect.top,
      height: rect.height,
      opacity: 1,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHighlight(prev => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <ul ref={containerRef} onMouseLeave={handleMouseLeave} className='relative'>
      <div
        className='pointer-events-none absolute -right-2 -left-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.09]'
        style={{
          top: highlight.top,
          height: highlight.height,
          opacity: highlight.opacity,
          transition: 'top 150ms ease, height 150ms ease, opacity 150ms ease',
        }}
      />
      {Array.isArray(children)
        ? children.map((child, i) => (
            <li key={i} onMouseEnter={handleMouseEnter}>
              {child}
            </li>
          ))
        : children}
    </ul>
  );
}
