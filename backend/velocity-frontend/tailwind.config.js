//@type {import('tailwindcss').Config} */
//export default {
//  content: [
//    "./index.html",
//    "./src/**/*.{js,ts,jsx,tsx}",
//  ],
//  theme: {
//    extend: {},
//  },
//  plugins: [],
//}
//import { defineConfig } from 'vite'
//import tailwindcss from '@tailwindcss/vite'
//
//export default defineConfig({
//  plugins: [
//    tailwindcss(),
//  ],
//})
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
}