/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SF Pro Display', 'Helevtica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        // Primary colors
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-light': 'var(--color-primary-light)',
        'primary-lighter': 'var(--color-primary-lighter)',

        // Background colors
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
          'dark-primary': 'var(--color-bg-dark-primary)',
          'dark-secondary': 'var(--color-bg-dark-secondary)',
          'dark-tertiary': 'var(--color-bg-dark-tertiary)',
        },

        // Text colors
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          muted: 'var(--color-text-muted)',
          'dark-primary': 'var(--color-text-dark-primary)',
          'dark-secondary': 'var(--color-text-dark-secondary)',
          'dark-tertiary': 'var(--color-text-dark-tertiary)',
          'dark-muted': 'var(--color-text-dark-muted)',
        },

        // Border colors
        border: {
          primary: 'var(--color-border-primary)',
          secondary: 'var(--color-border-secondary)',
          'dark-primary': 'var(--color-border-dark-primary)',
          'dark-secondary': 'var(--color-border-dark-secondary)',
        },

        // Status colors
        success: 'var(--color-success)',
        'success-light': 'var(--color-success-light)',
        'success-bg': 'var(--color-success-bg)',
        'success-text': 'var(--color-success-text)',
        'success-dark-bg': 'var(--color-success-dark-bg)',
        'success-dark-text': 'var(--color-success-dark-text)',

        // Code colors
        'code-bg': 'var(--color-code-bg)',
        'code-text': 'var(--color-code-text)',
        'code-dark-bg': 'var(--color-code-dark-bg)',
        'code-dark-text': 'var(--color-code-dark-text)',
      },
    },
  },
  plugins: [],
};
