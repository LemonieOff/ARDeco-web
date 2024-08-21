/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [ 'arial', 'sans-serif']
      },
      colors: {
        'light-black': '#010D00',
        'port-brown': '#BFB2AA',
        'AR-Grey': '#3E403F',
        'AR-Beige': '#F2EBDF',
      }
    },
  },
  plugins: [],
}
