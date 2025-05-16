/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color)',
          light: '#6366f1',
          dark: '#4338ca',
        },
        secondary: {
          DEFAULT: 'var(--secondary-color)',
          light: '#34d399',
          dark: '#059669',
        },
        accent: {
          DEFAULT: 'var(--accent-color)',
          light: '#fb923c',
          dark: '#ea580c',
        },
        success: {
          DEFAULT: 'var(--success-color)',
          light: '#4ade80',
          dark: '#16a34a',
        },
        warning: {
          DEFAULT: 'var(--warning-color)',
          light: '#fbbf24',
          dark: '#d97706',
        },
        error: {
          DEFAULT: 'var(--error-color)',
          light: '#f87171',
          dark: '#dc2626',
        },
        background: 'var(--background-color)',
        text: {
          DEFAULT: 'var(--text-color)',
          light: 'var(--text-light)',
        },
      },
      fontFamily: {
        'noto-naskh': ['"Noto Naskh Arabic"', 'serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
};