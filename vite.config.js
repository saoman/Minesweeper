import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: '/Minesweeper/',  
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    // 构建配置
    outDir: 'dist',
    assetsDir: 'assets',
    // 如果要内嵌到APK，建议启用下面的配置
    rollupOptions: {
      output: {
        manualChunks: undefined,
        inlineDynamic: true,
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})