import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    sourcemap: true,
    // esbuild 构建的目标
    target: ['edge80', 'firefox78', 'chrome60', 'safari11'],
    // 自定义底层的 Rollup 打包配置
    rollupOptions: {
       external: ['element-plus','vue',],
      output: {
         globals: {
          vue: 'Vue',
          'element-plus': 'element-plus',
        },
      }
    },
    outDir: 'dist',
    lib: {
      entry: './src/entry.js',
      name: 'bsgoal-common',
      formats: ['es', 'umd'],
      fileName: 'index'
    }
  }
})
