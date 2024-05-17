/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        eukraine: ['e-Ukraine', 'sans-serif'],
      },
      colors: {
        primary: {
          0: '#FFFFFF',
          50: '#E6E8EC',
          100: '#B2B8C4',
          200: '#8D96A7',
          400: '#394966',
          500: '#081B40',
          700: '#06132D',
        },
        body: {
          50: '#F2F2F2',
          100: '#E5E5E5',
          400: '#999999',
          700: '#4D4D4D',
          900: '#1A1A1A',
        },
        red: {
          100: '#FBD0D0',
          200: '#F5BCBC',
          400: '#E5AFAF',
          700: '#D24444',
          800: '#BF4040',
          900: '#660000',
        },
        green: {
          100: '#DAFAE0',
          200: '#D6F5DB',
          400: '#91CC9C',
          900: '#365E3D',
        },
        blue: {
          500: '#1288CB',
        }
      },
    },
  },
  plugins: [],
}

