/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FAFAF9',
        surface: '#FFFFFF',
        text: '#141414',
        text2: '#5B5B5B',
        border: '#E5E5E3',
        accent: '#4B3FDB',
        'accent-hover': '#3C32B0',
        success: '#1E8E5A',
        warning: '#B8860B',
        demo: '#E11D48',
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'sans-serif'],
      },
      fontSize: {
        h1: ['2.5rem', { lineHeight: '1.15' }],
        h2: ['1.875rem', { lineHeight: '1.2' }],
        h3: ['1.375rem', { lineHeight: '1.3' }],
        body: ['1rem', { lineHeight: '1.6' }],
        small: ['0.875rem', { lineHeight: '1.4' }],
      },
      spacing: {
        1: '8px',
        2: '16px',
        3: '24px',
        4: '32px',
        5: '48px',
        6: '64px',
        7: '96px',
      },
      borderRadius: {
        card: '10px',
        btn: '8px',
      },
      screens: {
        tablet: '600px',
        desktop: '1024px',
        wide: '1440px',
      },
    },
  },
  plugins: [],
};
