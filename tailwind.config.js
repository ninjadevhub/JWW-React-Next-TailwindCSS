const colors = require('tailwindcss/colors');

module.exports = {
  future: {
    //removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
	  './src/components/**/*.js',
	  './pages/**/*.js',
  ],
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
      'brand-navy': '#1b3c53',
      'brand-orange': '#ee8f25',
      'brand-green': '#03a399',
      'brand-gray': '#e5e5e5',
      'brand-gray-pale': '#f3f3f3',
      'brand-gray-typo':"#474747",
      'brand-purple-icon':'#914a81',
      'brand-table':'#e5e5e5',
      'brand-form-bg1':'#fafafa',
      'brand-form-bg2':'#ebebeb',
      'brand-form-bg-footer':'#f5f5f5',

      

    },
   
    extend: {
      backgroundColor: ['active'],

      
      fontFamily: {
        'nova': ['Nova'],
        'museo':['Museo'],
        'novam':['NovaM'],
           
         },
        screens: {
          xm: '320px'
        },
        height: {
            'almost-screen': 'calc(-16rem + 100vh)',
            '225px': '14.063rem',
            '338px': '21.125rem'
        },
        width: {
            '400px': '25rem',
            '600px': '37.5rem'
        },
        minHeight:{
            'almost-screen': 'calc(-16rem + 100vh)'
        },
    },
  },



  variants: {},
  plugins: [
	  require( 'tailwindcss' ),
	  require( 'precss' ),
	  require( 'autoprefixer' )
  ],
}
