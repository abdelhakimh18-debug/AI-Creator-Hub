import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // ⚠️ يجب استبداله بالدومين الفعلي قبل الإطلاق — يُستخدم في sitemap.xml وcanonical وOpen Graph
  site: 'https://REPLACE-WITH-NETLIFY-DOMAIN.netlify.app',
  integrations: [
    tailwind(),
    sitemap({
      // يستبعد كل صفحات الـ Demo (تحمل "demo" في السلاج دائمًا) — تبقى noindex ولا داعي لظهورها في الخريطة
      filter: (page) => !page.includes('demo'),
    }),
  ],
});
