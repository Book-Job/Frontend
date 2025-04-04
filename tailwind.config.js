/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gray-8e8e8e': '#8e8e8e',
        'light-gray': '#d9d9d9',
        'main-color-pink': '#E36397',
      },
      fontFamily: {
        logo: ['TTLaundryGothicB', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
