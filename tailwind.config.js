// const { default: daisyui } = require('daisyui')

/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  content: ['./src/renderer/index.html', './src/renderer/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['winter']
  }
}
