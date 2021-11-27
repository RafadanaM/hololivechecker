function colorWithOpacity(variableName) {
  return ({ opacityValue }) => {
    if (!opacityValue) {
      return `rgb(var(${variableName}))`;
    }
    return `rgba(var(${variableName}), ${opacityValue})`;
  };
}

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        '2xs': ['0.65rem', '0.75rem'],
        '3xs': ['0.50rem', '0.65rem'],
       
      },
      minWidth: {
        '80': '20rem'
      },
      colors: {
        'primary': colorWithOpacity('--primary'),
        'yt-red': colorWithOpacity('--yt-red')
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
