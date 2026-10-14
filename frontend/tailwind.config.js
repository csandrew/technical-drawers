/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: { '2xl': '1280px' },
    },

    extend: {
      maxWidth: {
        site: '1280px',
      },
      colors: {
        primary: '#3C3B6E',
        'primary-dark': '#2A2960',
        secondary: '#B22234',
        'secondary-hover': '#8A1A28',
        accent: '#D8A73A',
        'accent-hover': '#C4962E',

        background: '#FFFFFF',
        'section-bg': '#F5F5F5',
        'gray-light': '#F8F8F8',

        'body-text': '#333333',
        'text-light': '#666666',
        'text-muted': '#888888',

        whatsapp: '#25D366',
        'whatsapp-hover': '#1DA851',
        facebook: '#1877F2',
        instagram: '#E4405F',
        twitter: '#000000',
        youtube: '#FF0000',
        tiktok: '#000000',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        custom: '0 4px 24px rgba(60, 59, 110, 0.12)',
        'custom-hover': '0 8px 40px rgba(60, 59, 110, 0.2)',
      },
      borderRadius: {
        custom: '12px',
        'custom-lg': '20px',
      },
    },
  },
  plugins: [],
}