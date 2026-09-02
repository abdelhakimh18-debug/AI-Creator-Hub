# AI Creator Hub — Astro + Tailwind + Netlify

## جدول التحويل (WordPress → Astro)

| مفهوم WordPress سابق | المعادل الآن |
|---|---|
| CPT (`tool`, `comparison`, ...) | Content Collection في `src/content/config.ts` |
| ACF Field | حقل Zod داخل schema الكولكشن |
| ACF Relationship | `reference('collection-name')` |
| ACF Repeater | `z.array(z.object({...}))` |
| قاعدة بيانات MySQL | ملفات Markdown/YAML frontmatter داخل `src/content/*` |
| PHP hook لحساب overall_rating | `src/lib/rating.ts` (يُحسب وقت البناء) |
| Rank Math (Schema/Meta) | يُضاف لاحقًا كمكوّن Astro يولّد JSON-LD + meta tags (Step لاحقة) |
| FacetWP / Relevanssi (فلترة/بحث) | يُبنى لاحقًا بجافاسكريبت خفيف على مصفوفة JSON مُصدَّرة وقت البناء (Static Search Index) — لا حاجة لخادم بحث |
| WP Rocket / ShortPixel | Netlify Build + Astro Image Optimization المدمجة (`astro:assets`) — تُضاف في خطوة لاحقة |
| ACF PRO (ترخيص مدفوع) | **لم يعد مطلوبًا إطلاقًا** — Content Collections مجانية ومدمجة في Astro |

## بنية المجلدات الحالية (Step 1 فقط)

```
src/content/config.ts     ← تعريف كل الـCollections (بديل قاعدة البيانات)
src/content/tools/        ← ملف Demo واحد فقط (is_demo: true)
src/lib/rating.ts          ← حساب overall_rating
src/styles/global.css      ← Tailwind + Design Tokens
netlify.toml                ← إعداد النشر + noindex مؤقت
public/robots.txt            ← حجب كامل مؤقت (staging)
```

## للتشغيل محليًا
```
npm install
npm run dev
```

## ⚠️ قبل الإطلاق الفعلي
احذف من `netlify.toml` قسم `X-Robots-Tag`، واستبدل `public/robots.txt`، وأزل جميع ملفات `isDemo: true`.

---
**لم يُبنَ بعد (خطوات لاحقة):** الصفحات (`src/pages`)، المكوّنات (ToolCard، ComparisonTable...)، محرك البحث الثابت، توليد Schema/JSON-LD. هذه تبدأ في Step 2.
