/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1D9E75',
          50: '#E8F7F2',
          100: '#C5EBDA',
          200: '#8ED6BB',
          300: '#57C29C',
          400: '#2AAE84',
          500: '#1D9E75',
          600: '#178060',
          700: '#11604A',
          800: '#0B4033',
          900: '#06201A',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
