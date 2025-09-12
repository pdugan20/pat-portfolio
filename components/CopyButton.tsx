'use client';

import { useState } from 'react';
import { CopyIcon } from './icons';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showCopiedText, setShowCopiedText] = useState(false);
  const [justCopied, setJustCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setShowCopiedText(true);
    setJustCopied(true);

    // Hide tooltip after 2 seconds
    setTimeout(() => setCopied(false), 2000);

    // Keep "Copied!" text visible until tooltip fully fades out
    setTimeout(() => setShowCopiedText(false), 2200);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setJustCopied(false);
  };

  return (
    <button
      onClick={handleCopy}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-500 transition-all duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 dark:focus-visible:ring-offset-gray-800 ${className} `}
      aria-label={copied ? 'Copied!' : 'Copy code to clipboard'}
    >
      <CopyIcon className='h-4 w-4 transition-transform duration-200 group-hover:scale-110' />

      <div
        className={`absolute top-1/2 right-full z-10 mr-2 -translate-y-1/2 transform rounded bg-gray-900 px-2 py-1 text-xs font-medium whitespace-nowrap text-white transition-all duration-200 dark:bg-gray-700 ${copied || (isHovered && !justCopied) ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'} `}
      >
        {showCopiedText ? 'Copied!' : 'Copy to clipboard'}
      </div>
    </button>
  );
}
