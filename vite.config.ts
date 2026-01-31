import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // ✅ REQUIRED for GitHub Pages
    base: '/portfolio/',

    server: {
      port: 3000,
      host: true,
    },

    plugins: [react()],

    // ✅ Correct way to expose env variables
    define: {
      __GEMINI_API_KEY__: JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  }
})
