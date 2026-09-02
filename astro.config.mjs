import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://REPLACE-WITH-NETLIFY-DOMAIN.netlify.app',
  integrations: [tailwind()],
});
