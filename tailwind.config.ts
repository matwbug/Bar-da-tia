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
          }
        },
        light: {
          default: "white",
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
        'hero-image': "url(/hero-image.png)",
      },
      fontFamily: {
        bebas: ['var(--font-bebas)', 'monospace']
      }
    },
    
  },
  variants: {},
  darkMode: "media",
  plugins: [
    nextui({
      addCommonColors: true,
      defaultTheme: "light"
    }),
],
};

export default config;
