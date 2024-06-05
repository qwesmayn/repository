/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        inter : "inter"
      },
      backgroundColor :{
        "bg-blue-design" : 'rgba(241, 246, 250, 1)'
      },
      boxShadow: {
        'dark-lg': '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}