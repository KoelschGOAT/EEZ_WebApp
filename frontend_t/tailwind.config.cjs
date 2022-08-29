/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-gray': '#282c34',
        'button-red': {
          DEFAULT: '#E60146',
          hover: { backgroundColor: '#FF3B6B' },
        },
        width: {
          98: '26rem',
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: ['winter'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: false,
  },
};
