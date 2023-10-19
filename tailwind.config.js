const { colors } = require('./src/styles/colors');

module.exports = {
  content: ['./src/**/*.{ts,tsx,ejs}'],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      borderRadius: {},
      keyframes: {
        'square-spin': {
          '25%': { transform: 'perspective(100px) rotateX(180deg) rotateY(0)' },
          '50%': {
            transform: 'perspective(100px) rotateX(180deg) rotateY(180deg)',
          },
          '75%': { transform: 'perspective(100px) rotateX(0) rotateY(180deg)' },
          '100%': { transform: 'perspective(100px) rotateX(0) rotateY(0)' },
        },
        hide: {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
        'slide-in': {
          '0%': {
            transform: 'translateX(calc(100% + 50px))',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        'swipe-out': {
          '0%': {
            transform: 'translateX(var(--radix-toast-swipe-end-x))',
          },
          '100%': {
            transform: 'translateX(calc(100% + 50px))',
          },
        },
      },
      animation: {
        'square-spin':
          'square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite',
        slideIn: 'slide-in 200ms ease-in-out',
        hideAnimation: 'hide 150ms ease-in-out',
        swipeOut: 'swipe-out 150ms ease-in-ou',
      },
      boxShadow: {
        largestShadow: '0 0 120px 20px',
      },
      fontFamily: {
        body: 'Roboto',
      },
      fontSize: {
        xxs: '0.625rem',
      },
    },
  },
};
