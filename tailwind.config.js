/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:'#effef7',100:'#d9fde9',200:'#b6f7d6',300:'#8aefc0',400:'#5de3a8',
          500:'#35d38f',600:'#25b176',700:'#1f8a60',800:'#1b6c4f',900:'#164f3d'
        }
      },
      boxShadow: {
        'soft':'0 10px 30px rgba(0,0,0,.15)'
      }
    },
  },
  plugins: [],
}
