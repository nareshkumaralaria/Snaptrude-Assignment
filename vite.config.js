import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// import process from 'process';
// globalThis.process = process;


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
