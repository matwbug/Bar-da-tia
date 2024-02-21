import type { Config } from "tailwindcss";

import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-roboto)', 'sans-serif'],
    },
    extend: {
      colors: {
        dark: {
          default: { // Cor de fundo escura padrão
            '50': '#f5f6f6',
            '100': '#e5e8e8',
            '200': '#cdd3d4',
            '300': '#abb4b5',
            '400': '#818d8f',
            '500': '#667274',
            '600': '#576163',
            '700': '#4a5254',
            '800': '#424748',
            '900': '#3a3e3f',
            '950': '#222526',
          }, 
          primary: {
            '50': '#f3f3ff',
            '100': '#e9e9fe',
            '200': '#d6d6fe',
            '300': '#b7b5fd',
            '400': '#928bfa',
            '500': '#6f5cf6',
            '600': '#5b3aed',
            '700': '#5735db',
            '800': '#3f21b6',
            '900': '#361d95',
            '950': '#1e1065',
          },
          background: {
            '50': '#f6f6f6',
            '100': '#e7e7e7',
            '200': '#d1d1d1',
            '300': '#b0b0b0',
            '400': '#888888',
            '500': '#6d6d6d',
            '600': '#5d5d5d',
            '700': '#4f4f4f',
            '800': '#454545',
            '900': '#3d3d3d',
            '950': '#111111',
          }
        },
        light: {
          background: { 
            '50': '#f8f8f8',
            '100': '#f1f1f1',
            '200': '#dcdcdc',
            '300': '#bdbdbd',
            '400': '#989898',
            '500': '#7c7c7c',
            '600': '#656565',
            '700': '#525252',
            '800': '#464646',
            '900': '#3d3d3d',
            '950': '#292929',
          }, 
          primary: {
            '50': '#fff0f3',
            '100': '#ffdde4',
            '200': '#ffc0cc',
            '300': '#ff95aa',
            '400': '#ff5879',
            '500': '#ff244f',
            '600': '#f80132',
            '700': '#d6002a',
            '800': '#b10326',
            '900': '#910b26',
            '950': '#500010',
          },
        }
      },
      backgroundImage: {
        'hero-gradient': "linear-gradient(90deg, rgba(4,7,14,1) 0%, rgba(17,24,39,1) 100%)",
        'login-gradient': "linear-gradient(125deg, rgba(92,6,23,1) 0%, rgba(244,31,74,1) 55%, rgba(117,3,25,0.9332107843137255) 100%)",
        'hero-image': "url(/hero-image.png)",
      },
      fontFamily: {
        bebas: ['var(--font-bebas)', 'monospace'],
        oswald: ['var(--font-oswald)', 'sans-serif']
      }
    },
    
  },
  variants: {},
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
      defaultTheme: "light"
    }),
],
};

export default config;
