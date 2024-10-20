import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    extend: {
      colors: {
        // primary: '#0a092d',
        sub: {
          DEFAULT: '#2e3856',
        },
        border: {
          DEFAULT: '#3d4458',
        },
        bg: {
          DEFAULT: '#12141c',
        },
        primary: {
          DEFAULT: '#0a092d',
        },
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
