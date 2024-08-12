import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#CA5311',
        'primary-pure': '#F06111',
        'primary-light': '#FBA16F',
        'secondary-dark': '#3E34A8',
        'secondary-pure': '#5145DC',
        'secondary-light': '#8A81F3',
        'shapes-background-default': '#FFFFFF',
        'shapes-background-aux': '#F7F7F7',
        'support-error':'#FF5454',
        'support-success':'#46B633',
        'support-info':'#60A5FA',
        'display':'#222120',
        'title':'#2E2C2B',
        'paragraph':'#403E3D',
        'span':'#5E5B5A',
        'disabled':'#C9C6C4',
        'grey0':'#FFFFFF',
        'grey1':'#EDEDED',
        'grey2':'#A5A2A0',
        'Grey3':'#292827'
      },
      boxShadow: {
        'button': '0px 4px 4px 0px rgba(57, 60, 57, 0.15)',
        'card': '0px 2px 4px 2px rgba(57, 60, 57, 0.15)',
        'side-bar': 'box-shadow: 4px 0px 8px 0px rgba(57, 60, 57, 0.15)'
      },
      keyframes: {
        "aside-show": {
          "0%": { transform: 'translateX(-100%)' },
          "100%": { transform: 'translateX(0)' },
        },
        "aside-hidden": {
          "0%": { transform: 'translateX(0)' },
          "100%": { transform: 'translateX(-100%)' },
        },
        "expanded-show": {
          "0%": { "margin-left": "0" },
          "100%": { "margin-left": "304px"},
        },
        "expanded-hidden": {
          "0%": { "margin-left": "304px"},
          "100%": { "margin-left": "0" },
        },
      },
      animation: {
        'aside-show': 'aside-show 0.3s ease forwards',
        'aside-hidden': 'aside-hidden 0.3s ease forwards',
        'expanded-show': 'expanded-show 0.2s ease forwards',
        'expanded-hidden': 'expanded-hidden 0.3s ease forwards',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        'aside': 'calc(100vh - 96px)',
        'aside-mobile': '100vh',
      },
      width: {
        aside: '403px',
        'aside-mobile': '100vw',
      },
      maxWidth: {
        '7xl': '1312px'
      }
    },
  },
  plugins: [],
}
export default config
