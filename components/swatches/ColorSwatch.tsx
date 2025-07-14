import React from 'react';

interface ColorSwatchProps {
  children: React.ReactNode;
  label?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ children, label }) => {
  const content = typeof children === 'string' ? children : '';

  // Regex to match hex colors (# followed by 3 or 6 hex digits)
  const hexColorRegex = /#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})\b/g;

  if (!hexColorRegex.test(content)) {
    return <>{children}</>;
  }

  const parts = content.split(hexColorRegex);
  const matches = content.match(hexColorRegex) || [];

  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 0) {
          return part;
        }

        const hexColor = matches[Math.floor(index / 2)];
        if (!hexColor) return part;

        // Normalize 3-digit hex to 6-digit
        const normalizedHex =
          hexColor.length === 4
            ? `#${hexColor[1]}${hexColor[1]}${hexColor[2]}${hexColor[2]}${hexColor[3]}${hexColor[3]}`
            : hexColor;

        return (
          <span key={index} className='color-swatch'>
            <span
              className='color-swatch-preview'
              style={{ backgroundColor: normalizedHex }}
            />
            {label || hexColor}
          </span>
        );
      })}
    </>
  );
};

export default ColorSwatch;
