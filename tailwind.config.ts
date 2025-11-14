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
        primary: {
          light: '#67e8f9',
          DEFAULT: '#06b6d4',
          dark: '#0e7490',
        },
        secondary: {
          light: '#f9a8d4',
          DEFAULT: '#f472b6',
          dark: '#be185d',
        },
        accent: {
          light: '#fde047',
          DEFAULT: '#facc15',
          dark: '#ca8a04',
        },
      },
    },
  },
  plugins: [],
}
export default config
