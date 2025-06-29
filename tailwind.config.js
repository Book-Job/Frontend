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
        'dark-gray': '#8e8e8e',
        'light-gray': '#d9d9d9',
        'main-pink': '#ec4899',
        'hover-pink': '#DB2777',
        lightBlueGray: '#F3F3F3',
      },
      fontFamily: {
        logo: ['TTLaundryGothicB', 'sans-serif'],
      },
      animation: {
        'move-left': 'move-left 1s ease-in-out',
      },
      keyframes: {
        'move-left': {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-20px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      screens: {
        sm: '640px',
        md: '769px', // 기본값 768px → 800px로 변경
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [import('@tailwindcss/typography')],
}
