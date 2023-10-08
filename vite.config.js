import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Important : need to setup your 127.0.0.1 to vpv.srm-backend.loc in your OS

export default defineConfig({
  server: {
    host: `${process.env.SRM_TENANT_HOST || 'vpv.srm-backend.loc'}`
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
