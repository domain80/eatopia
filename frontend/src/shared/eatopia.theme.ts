import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

export const EatopiaThemePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{Teal.50}',
      100: '{Teal.100}',
      200: '{Teal.200}',
      300: '{Teal.300}',
      400: '{Teal.400}',
      500: '{Teal.500}',
      600: '{Teal.600}',
      700: '{Teal.700}',
      800: '{Teal.800}',
      900: '{Teal.900}',
      950: '{Teal.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{Teal.800}',
          inverseColor: '#ffffff',
          hoverColor: '{Teal.900}',
          activeColor: '{Teal.800}',
        },
        highlight: {
          background: '{Teal.800}',
          focusBackground: '{Teal.700}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
      dark: {
        primary: {
          color: '{Teal.50}',
          inverseColor: '{Teal.950}',
          hoverColor: '{Teal.100}',
          activeColor: '{Teal.200}',
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
      },
    },
  },

  components: {
    inputtext: {
      colorScheme: {
        light: {
          root: {
            placeholderColor: '{surface.300}',
          },
        },
        dark: {
          root: {
            placeholderColor: '{surface.700}',
          },
        },
      },
    },
  },
})

const Noir = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{Teal.50}',
      100: '{Teal.100}',
      200: '{Teal.200}',
      300: '{Teal.300}',
      400: '{Teal.400}',
      500: '{Teal.500}',
      600: '{Teal.600}',
      700: '{Teal.700}',
      800: '{Teal.800}',
      900: '{Teal.900}',
      950: '{Teal.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{zinc.950}',
          inverseColor: '#ffffff',
          hoverColor: '{zinc.900}',
          activeColor: '{zinc.800}',
        },
        highlight: {
          background: '{zinc.950}',
          focusBackground: '{zinc.700}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
      dark: {
        primary: {
          color: '{zinc.50}',
          inverseColor: '{zinc.950}',
          hoverColor: '{zinc.100}',
          activeColor: '{zinc.200}',
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
      },
    },
  },
})
