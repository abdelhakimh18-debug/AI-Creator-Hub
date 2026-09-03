import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://creatoriahub.com',
  integrations: [
    tailwind(),
    sitemap({
      // يستبعد كل صفحات الـ Demo (تحمل "demo" في السلاج دائمًا) — تبقى noindex ولا داعي لظهورها في الخريطة
      filter: (page) => !page.includes('demo'),
    }),
  ],
});
