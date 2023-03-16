/** @type {import('tailwindcss').Config} **/
module.exports = {
  content: [ 
    './public/index.html',
  './src/**/*.{html,js}'
],
  theme: {
    extend: {},
    colors: {
      main: '#ea2562',
      lightMain: '#f13b75',
      mildWhite: '#f8f8f8',
    }
  },
  plugins: [],
}
