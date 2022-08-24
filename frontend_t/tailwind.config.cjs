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
      },
    },
  },
  plugins: [],
};
