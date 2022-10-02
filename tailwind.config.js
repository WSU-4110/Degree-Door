/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'DEFAULT': '0 0 25px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}
