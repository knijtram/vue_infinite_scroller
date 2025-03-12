import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.vue'],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'InfiniteScroller',
      fileName: (format) => `vue-infinite-scroller.${format}.js`,
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled.
      external: ['vue'],
      output: {
        // Provide global variables for UMD build.
        globals: {
          vue: 'Vue',
        },
      },
    },
  }
})
