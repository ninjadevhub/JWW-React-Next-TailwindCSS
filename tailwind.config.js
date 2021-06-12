const colors = require('tailwindcss/colors');

module.exports = {
  future: {
    //removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/components/**/*.js', './pages/**/*.js'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      blue: colors.blue,
      red: colors.red,
      'brand-blue': '#4579a1',
      'brand-blue-2': '#325976',
      'brand-navy': '#1b3c53',
      'brand-orange': '#ee8f25',
      'brand-orange-2': '#714109',
      'brand-green': '#03a399',
      'brand-green-light': '#35b5ad',
      'brand-green-dark': '#045d59',
      'brand-gray': '#e5e5e5',
      'brand-gray-pale': '#f3f3f3',
      'brand-gray-typo': '#474747',
      'brand-purple': '#914a81',
      'brand-purple-2': '#793e69',
      'brand-purple-icon': '#914a81',
      'brand-purple-dark': '#1f0812',
      'brand-teal': '#05a29b',
      'brand-teal-2': '#045d59',
      'brand-table': '#e5e5e5',
      'brand-form-bg1': '#fafafa',
      'brand-form-bg2': '#ebebeb',
      'brand-form-bg-footer': '#f5f5f5',
      'brand-gray-typo':"#474747",
      'brand-purple-icon':'#914a81',
      'brand-table':'#e5e5e5',
      'brand-form-bg1':'#fafafa',
      'brand-form-bg2':'#ebebeb',
      'brand-form-bg-footer':'#f5f5f5',
      'brand-borderB-color':"#b2c6d6"

      

    },

    extend: {
      backgroundColor: ['active'],

      fontFamily: {
        nova: ['Nova'],
        museo: ['Museo'],
        novam: ['NovaM'],
      },
      screens: {
        xm: '320px',
      },
      height: {
        'almost-screen': 'calc(-16rem + 100vh)',
        '225px': '14.063rem',
        '338px': '21.125rem',
      },
      width: {
        '400px': '25rem',
        '600px': '37.5rem',
      },
      minHeight: {
        'almost-screen': 'calc(-16rem + 100vh)',
      },
    },
  },

  variants: {},
  plugins: [require('tailwindcss'), require('precss'), require('autoprefixer')],
};
