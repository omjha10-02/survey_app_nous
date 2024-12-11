import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',  // Change this to your backend server URL
        changeOrigin: true,
        secure: false,  // Set to true if your backend uses HTTPS
      },
    },
  },
});
