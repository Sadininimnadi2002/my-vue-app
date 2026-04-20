import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 1. ADD THIS LINE BELOW
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // 2. ADD tailwindcss() INSIDE THE BRACKETS BELOW
  plugins: [vue(), tailwindcss()],
})