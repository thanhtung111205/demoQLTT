/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: { // Thêm các màu tùy chỉnh
        primary: {
          DEFAULT: '#4F46E5', // Màu indigo chính
          light: '#6366F1',
          dark: '#4338CA',
        },
        secondary: {
          DEFAULT: '#EF4444', // Màu đỏ phụ
          light: '#F87171',
          dark: '#DC2626',
        },
        accent: { // Màu nhấn
          DEFAULT: '#10B981', // Màu xanh ngọc
          light: '#34D399',
        },
        darkblue: '#1E3A8A', // Một màu xanh đậm khác
      },
      animation: { // Thêm animation cho mượt mà hơn
        'fade-in-up': 'fade-in-up 0.7s ease-out',
        'zoom-in': 'zoom-in 0.5s ease-out',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'zoom-in': {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}