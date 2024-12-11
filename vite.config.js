// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://survey-app-nous.onrender.com', // Backend URL
//         changeOrigin: true,
//         secure: true,
//       },
//     },
//   },
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      // '/api':'https://blog-app-sny5.onrender.com'
       '/api':'https://survey-app-nous.onrender.com',
    },
  },
  plugins: [react()],
})
