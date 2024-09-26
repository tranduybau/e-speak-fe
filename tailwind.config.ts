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
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          design: '4rem',
        },
        screens: {
          design: '1440px',
        },
      },

      screens: {
        _design: '1439.98px',
        design: '1440px',
        design_: '1440.02px',
      },

      // colors: {
      //   border: 'hsl(var(--border))',
      //   input: 'hsl(var(--input))',
      //   ring: 'hsl(var(--ring))',
      //   background: 'hsl(var(--background))',
      //   foreground: 'hsl(var(--foreground))',
      //   primary: {
      //     DEFAULT: 'hsl(var(--primary))',
      //     foreground: 'hsl(var(--primary-foreground))',
      //   },
      //   secondary: {
      //     DEFAULT: 'hsl(var(--secondary))',
      //     foreground: 'hsl(var(--secondary-foreground))',
      //   },
      //   destructive: {
      //     DEFAULT: 'hsl(var(--destructive))',
      //     foreground: 'hsl(var(--destructive-foreground))',
      //   },
      //   muted: {
      //     DEFAULT: 'hsl(var(--muted))',
      //     foreground: 'hsl(var(--muted-foreground))',
      //   },
      //   accent: {
      //     DEFAULT: 'hsl(var(--accent))',
      //     foreground: 'hsl(var(--accent-foreground))',
      //   },
      //   popover: {
      //     DEFAULT: 'hsl(var(--popover))',
      //     foreground: 'hsl(var(--popover-foreground))',
      //   },
      //   card: {
      //     DEFAULT: 'hsl(var(--card))',
      //     foreground: 'hsl(var(--card-foreground))',
      //   },
      // },
      colors: {
        primary: {
          1: 'hsl(220,5.45%,10.78%)',
          2: 'hsl(220,8.57%,6.86%)',
          3: 'hsl(220,7.32%,8.04%)',
        },
        secondary: {
          primary: 'hsl(234.62,91.19%,68.82%)',
          2: 'hsl(234.41,58.42%,39.61%)',
        },
        base: {
          white: 'hsla(0, 0%, 99%, 1)',
        },
        neutral: {
          1: 'hsla(0, 0%, 74%, 1)',
          2: 'hsla(210, 6%, 14%, 1)',
          3: 'hsla(220, 10%, 6%, 1)',
          '1-placeholder': 'hsla(0, 0%, 29%, 1)',
          '1-text-icon': 'hsla(218, 0%, 60%, 1)',
        },
        another: {
          1: 'hsla(234, 79%, 63%, 1)',
          2: 'hsla(222, 6%, 47%, 1)',
        },
        error: 'hsla(0, 97%, 63%, 1)',
        success: 'hsla(165, 74%, 48%, 1)',
      },

      fontSize: {
        // heading
        'heading-2': ['3.5rem', { lineHeight: '4.375rem', fontWeight: 700 }],
        'heading-4': ['2.5rem', { lineHeight: '3.125rem', fontWeight: 700 }],
        // body-1
        'body-1-bold': ['1.25rem', { lineHeight: '1.5625rem', fontWeight: 700 }],
        'body-1-light': ['1.25rem', { lineHeight: '1.5625rem', fontWeight: 300 }],
        // body-2
        'body-2-light': ['1.125rem', { lineHeight: '1.4375rem', fontWeight: 300 }],
        'body-2-semibold': ['1.125rem', { lineHeight: '1.6875rem', fontWeight: 600 }],
        // body-3
        'body-3-light': ['1rem', { lineHeight: '1.25rem', fontWeight: 300 }],
        'body-3-semibold': ['1rem', { lineHeight: '1.25rem', fontWeight: 600 }],
        'title-1': ['1.5rem', { lineHeight: '2.25rem', fontWeight: 700 }],
        // body-small-light
        'body-small-light': ['0.875rem', { lineHeight: '1.375rem', fontWeight: 300 }],
      },

      backgroundImage: {
        gradient: 'radial-gradient(64.43% 131.45% at 50% 100%, #B5B7FB 0%, #4251E5 55%)',
        gradientHover: `radial-gradient(theme('colors.secondary.2') 0%, theme('colors.secondary.2') 100%)`,
        gradientDisabled: `radial-gradient(theme('colors.primary.3') 0%, theme('colors.primary.3') 100%)`,
        'secondary-gradient':
          'radial-gradient(64.43% 131.45% at 50% 100%, #B5B7FB 0%, #4251E5 55%)',
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
