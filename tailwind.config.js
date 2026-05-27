/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        juniper:  '#4A7C6F',
        sage:     '#7A9E87',
        rust:     '#B5532A',
        bark:     '#3B2F2F',
        linen:    '#F5EFE6',
        sand:     '#D4B896',
        teal:     '#9fd0c2',
        midnight: '#02040a',
        cream:    '#f3eadf',
        stone:    '#6B6560',
      },
      fontFamily: {
        serif:    ['Playfair Display', 'Georgia', 'serif'],
        sans:     ['Inter', 'system-ui', 'sans-serif'],
        mono:     ['DM Mono', 'ui-monospace', 'monospace'],
        'dm-sans':['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
    screens: {
      '2xl': { max: '1535px' },
      xl:   { max: '1279px' },
      lg:   { max: '1023px' },
      md:   { max: '767px' },
      sm:   { max: '639px' },
      xs:   { max: '479px' },
    },
  },
  plugins: [],
}
