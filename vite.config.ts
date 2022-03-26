import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'vite-plugin-element-plus'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),ElementPlus({ 
  })],
  base:'./' // 添加这个属性
})
