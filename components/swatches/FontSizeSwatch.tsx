import React from 'react';

interface FontSizeSwatchProps {
  children: React.ReactNode;
  label?: string;
}

const FontSizeSwatch: React.FC<FontSizeSwatchProps> = ({ children, label }) => {
  const content = typeof children === 'string' ? children : '';

  return (
    <span className='font-size-swatch'>
      <span className='font-size-swatch-preview'>#</span>
      {label || content}
    </span>
  );
};

export default FontSizeSwatch;
