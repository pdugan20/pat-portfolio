import React from 'react';

interface TextStyleSwatchProps {
  children: React.ReactNode;
  label?: string;
}

const TextStyleSwatch: React.FC<TextStyleSwatchProps> = ({
  children,
  label,
}) => {
  const content = typeof children === 'string' ? children : '';

  return (
    <span className='text-style-swatch'>
      <span className='text-style-swatch-preview'>T</span>
      {label || content}
    </span>
  );
};

export default TextStyleSwatch;
