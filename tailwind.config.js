const colors = require('tailwindcss/colors')
module.exports = {
  purge: [
    './index.html', 
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#DF554C',
      secondary: '#94B4CF',
      content: '#9FACB8',
    },
    extend: {
      colors: {
        emerald: colors.emerald,
        gray: colors.trueGray,
        white: colors.white,
        indigo: colors.indigo,
        blueGray: colors.blueGray,
        blue: colors.blue,
        red: colors.red,
      },
      fontFamily: {
        eng:['Ubuntu'],
        th:['Prompt'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
