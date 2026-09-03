# AI Creator Hub — Astro + Tailwind + Netlify

دليل احترافي لأدوات الذكاء الاصطناعي لصناعة المحتوى: مراجعات أدوات، مقارنات، قوائم Best-Of، أدلة تعليمية، ومكتبة Prompts — مبني كموقع Static بالكامل.

## جدول التحويل (WordPress → Astro)

| مفهوم WordPress سابق | المعادل الآن |
|---|---|
| CPT (`tool`, `comparison`, ...) | Content Collection في `src/content/config.ts` |
| ACF Field | حقل Zod داخل schema الكولكشن |
| ACF Relationship | `reference('collection-name')` |
| ACF Repeater | `z.array(z.object({...}))` |
| قاعدة بيانات MySQL | ملفات Markdown/YAML frontmatter داخل `src/content/*` |
| PHP hook لحساب overall_rating | `src/lib/rating.ts` (يُحسب وقت البناء) |
| Rank Math (Schema/Meta) | `src/layouts/Layout.astro` — meta description/canonical/OG/Twitter + JSON-LD (BreadcrumbList، FAQPage) لكل صفحة |
| Sitemap (Yoast/Rank Math) | `@astrojs/sitemap` — يُولَّد تلقائيًا وقت البناء، يستبعد صفحات الـ Demo تلقائيًا |
| Google Analytics plugin | `PUBLIC_GA_MEASUREMENT_ID` (متغير بيئة اختياري) — انظر قسم Analytics أدناه |
| FacetWP / Relevanssi (فلترة/بحث) | لم يُبنَ بعد — سيُبنى لاحقًا بجافاسكريبت خفيف على مصفوفة JSON مُصدَّرة وقت البناء (Static Search Index) — لا حاجة لخادم بحث |
| WP Rocket / ShortPixel | Netlify Build + Astro Image Optimization المدمجة (`astro:assets`) — لم يُفعَّل بعد |
| ACF PRO (ترخيص مدفوع) | **لم يعد مطلوبًا إطلاقًا** — Content Collections مجانية ومدمجة في Astro |

## بنية المجلدات

```
src/content/config.ts         ← تعريف كل الـCollections (tools, comparisons, bestOf, guides, prompts, freeTools, deals)
src/content/tools/            ← 10 أدوات حقيقية + 3 عناصر Demo لاختبار البنية
src/content/comparisons/      ← مقارنات الأدوات (مصدر واحد رسمي — لا تُنشئ ملفات مقارنة داخل src/pages/)
src/content/bestOf/           ← قوائم Best-Of
src/content/guides/           ← أدلة تعليمية (workflow / how-to)
src/content/prompts/          ← مكتبة الـ Prompts الجاهزة
src/pages/                    ← كل المسارات (index/dynamic routes) — تقرأ من content collections، لا محتوى مباشر فيها
src/components/ToolCard.astro ← بطاقة الأداة المُعاد استخدامها في كل الصفحات
src/layouts/Layout.astro      ← الـ head المشترك: title/description/canonical/OG/Twitter/JSON-LD/Analytics
src/lib/rating.ts             ← حساب overall_rating (null إن لم تتوفر subScores — لا تقييمات مُختلَقة)
src/styles/global.css         ← Tailwind + Design Tokens
astro.config.mjs              ← site + @astrojs/sitemap (فلتر يستبعد أي مسار يحوي "demo")
netlify.toml                  ← إعداد النشر + noindex مؤقت (staging)
public/robots.txt             ← حجب كامل مؤقت (staging) + سطر Sitemap جاهز للإطلاق
```

## للتشغيل محليًا
```
npm install
npm run dev
```
```
npm run build     # يبني إلى dist/ — يشمل توليد sitemap-index.xml
npm run preview
```

## قاعدة محتوى ثابتة: `isDemo`
كل Collection تحمل حقل `isDemo` (افتراضيًا `true` في المخطط). أي محتوى حقيقي **يجب** أن يُصرَّح صراحةً بـ `isDemo: false` في الـ frontmatter — وإلا سيُعامَل تلقائيًا كمحتوى تجريبي: شارة "DEMO" ظاهرة + `noindex, nofollow`. تحقّق من هذا الحقل عند إضافة أي محتوى جديد.

## Analytics (اختياري، معطّل افتراضيًا)
لا يوجد أي معرّف تتبع مُدرَج في الكود. لتفعيل Google Analytics 4، أضف متغير بيئة في Netlify (أو `.env` محليًا):
```
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```
دون هذا المتغير، لا يُحمَّل أي سكربت تتبع إطلاقًا.

## ⚠️ قبل الإطلاق الفعلي (Checklist)
- [ ] استبدل `site` في `astro.config.mjs` بالدومين الحقيقي (يؤثر على sitemap وcanonical وOpen Graph).
- [ ] استبدل سطر `Sitemap:` في `public/robots.txt` بنفس الدومين الحقيقي.
- [ ] احذف `Disallow: /` من `public/robots.txt` (اتركه Allow بشكل افتراضي، أو حدد استثناءات إن لزم).
- [ ] احذف قسم `[[headers]] X-Robots-Tag` بالكامل من `netlify.toml`.
- [ ] تأكد أن كل محتوى حقيقي جديد يحمل `isDemo: false` صراحةً (راجع القسم أعلاه).
- [ ] فعّل `PUBLIC_GA_MEASUREMENT_ID` إن رغبتم بالتتبع من أول يوم.
