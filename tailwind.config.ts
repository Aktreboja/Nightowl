import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      primary: '#587B7F',
      secondary: '#1E2019',
      white: '#FFFFFF',
      black: '#000000',
      'button-primary': '#394032',
      'button-secondary': '#CFEE9E',
      gray: '#808080',
    },
    keyframes: {
      expand: {
        '0%': { height: '100%' },
        '100%': { height: '0' },
      },
      toggle: {
        '0': { opacity: '100' },
        '25%': { opacity: '0' },
      },
      pulse: {
        '0%': { opacity: '100%' },
        '50%': { opacity: '50%' },
        '100%': { opacity: '100%' },
      },
    },
    animation: {
      expand: 'expand 1s ease forwards',
      toggle: 'toggle 1s infinite forwards',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['corporate'],
  },
};
export default config;
