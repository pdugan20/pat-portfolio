import React from 'react';

interface TextSwatchProps {
  children: React.ReactNode;
  label?: string;
}

const TextSwatch: React.FC<TextSwatchProps> = ({ children, label }) => {
  const content = typeof children === 'string' ? children : '';
  const hasAsterisk = content.startsWith('*');

  return (
    <span
      className={`text-swatch ${hasAsterisk ? 'text-swatch-asterisk' : ''}`}
    >
      {label || content}
    </span>
  );
};

export default TextSwatch;
