import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';

// يبني قائمة السلاجات الفعلية لصفحات isDemo: true عبر قراءة الـ frontmatter مباشرة،
// بدل مطابقة نصية على كلمة "demo" داخل الرابط (كانت تستبعد بالخطأ صفحات حقيقية
// مثل /prompts/product-unboxing-lifestyle-demo/ التي تحمل "demo" كجزء من اسمها لا كمحتوى تجريبي).
function getDemoSlugs() {
  const contentDir = path.join(process.cwd(), 'src/content');
  const demoSlugs = new Set();
  if (!fs.existsSync(contentDir)) return demoSlugs;
  for (const collection of fs.readdirSync(contentDir, { withFileTypes: true })) {
    if (!collection.isDirectory()) continue;
    const collectionDir = path.join(contentDir, collection.name);
    for (const file of fs.readdirSync(collectionDir)) {
      if (!file.endsWith('.md')) continue;
      const raw = fs.readFileSync(path.join(collectionDir, file), 'utf-8');
      if (/^isDemo:\s*true\s*$/m.test(raw)) {
        demoSlugs.add(file.replace(/\.md$/, ''));
      }
    }
  }
  return demoSlugs;
}

const demoSlugs = getDemoSlugs();

export default defineConfig({
  site: 'https://creatoriahub.com',
  integrations: [
    tailwind(),
    sitemap({
      // يستبعد فقط صفحات isDemo: true الفعلية (تبقى noindex أيضًا) — لا مطابقة نصية سطحية على الرابط.
      filter: (page) => {
        const segments = new URL(page).pathname.split('/').filter(Boolean);
        const slug = segments[segments.length - 1];
        return !demoSlugs.has(slug);
      },
    }),
  ],
});
