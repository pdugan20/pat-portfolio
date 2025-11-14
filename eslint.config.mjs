import eslintConfigNext from 'eslint-config-next/core-web-vitals';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

const eslintConfig = [
  ...eslintConfigNext,
  eslintPluginPrettier,
  {
    rules: {
      'prettier/prettier': 'error',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      quotes: 'off',
      // Temporarily disable stricter React 19/Next.js 16 rules
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/immutability': 'warn',
    },
  },
];

export default eslintConfig;
