import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
 server: {
  proxy: {
    '/api': {
      target: 'https://survey-app-nous.onrender.com', // Replace with your backend's local URL
      changeOrigin: true,
    },
  },
},

});


