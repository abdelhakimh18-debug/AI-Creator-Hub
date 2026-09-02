import { defineCollection, reference, z } from 'astro:content';

const pricingTier = z.object({
  tierName: z.string(),
  price: z.number(),
  billingPeriod: z.enum(['monthly', 'yearly', 'one-time']),
  features: z.string().optional(),
});

const subScores = z.object({
  quality: z.number().min(0).max(10),
  easeOfUse: z.number().min(0).max(10),
  speed: z.number().min(0).max(10),
  reliability: z.number().min(0).max(10),
  value: z.number().min(0).max(10),
  creatorUsefulness: z.number().min(0).max(10),
});

const testPrompt = z.object({
  promptText: z.string(),
  outputMedia: z.string().optional(),
  notes: z.string().optional(),
});

const faqItem = z.object({
  question: z.string(),
  answer: z.string(),
});

const tools = defineCollection({
  type: 'content',
  schema: z.object({
    toolName: z.string(),
    category: z.enum(['video', 'audio', 'image', 'editing', 'ugc', 'productivity']),
    bestFor: z.array(z.string()).default([]),
    shortDescription: z.string().max(160),
    logo: z.string(),
    websiteUrl: z.string().url(),
    affiliateUrl: z.string().url().optional(),
    pricingTiers: z.array(pricingTier).default([]),
    startingPrice: z.number(),
    hasFreePlan: z.boolean().default(false),
    hasFreeTrial: z.boolean().default(false),
    // ⚠️ أصبح اختياريًا: لا نجبر أي أداة حقيقية على تقييمات مُختلَقة قبل الاختبار الفعلي
    subScores: subScores.optional(),
    features: z.array(z.string()).default([]),
    platforms: z.array(z.enum(['web', 'ios', 'android', 'desktop', 'api'])).default([]),
    apiAvailable: z.boolean().default(false),
    commercialUse: z.boolean().default(false),
    commercialUseNote: z.string().optional(),
    watermark: z.boolean().default(false),
    inputTypes: z.array(z.enum(['text', 'image', 'video', 'audio'])).default([]),
    outputTypes: z.array(z.enum(['text', 'image', 'video', 'audio'])).default([]),
    lastTestedDate: z.date(),
    reviewStatus: z.enum(['tested', 'official-info', 'community']),
    quickVerdict: z.string(),
    ourTestPrompts: z.array(testPrompt).default([]),
    pros: z.array(z.string()).default([]),
    cons: z.array(z.string()).default([]),
    alternatives: z.array(reference('tools')).default([]),
    relatedGuides: z.array(reference('guides')).default([]),
    isDemo: z.boolean().default(true),
    isSponsored: z.boolean().default(false),
    // ⚠️ حقل جديد إضافي فقط: لم يكن موجودًا، مطلوب لبنية الصفحة الحقيقية (FAQ)
    faq: z.array(faqItem).default([]),
  }),
});

const comparisons = defineCollection({
  type: 'content',
  schema: z.object({
    toolA: reference('tools'),
    toolB: reference('tools'),
    comparisonSummary: z.string(),
    winnerOverall: z.enum(['tool-a', 'tool-b', 'depends']),
    isDemo: z.boolean().default(true),
  }),
});

const bestOf = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    introSummary: z.string(),
    includedTools: z.array(
      z.object({
        tool: reference('tools'),
        rankPosition: z.number(),
        whyIncluded: z.string(),
      })
    ),
    isDemo: z.boolean().default(true),
  }),
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    guideType: z.enum(['how-to', 'workflow']),
    difficultyLevel: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    estimatedTime: z.string().optional(),
    relatedTools: z.array(reference('tools')).default([]),
    isDemo: z.boolean().default(true),
  }),
});

const prompts = defineCollection({
  type: 'content',
  schema: z.object({
    promptText: z.string(),
    category: z.string(),
    relatedTool: reference('tools').optional(),
    exampleOutput: z.string().optional(),
    isDemo: z.boolean().default(true),
  }),
});

const freeTools = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    calculatorType: z.string(),
    isDemo: z.boolean().default(true),
  }),
});

const deals = defineCollection({
  type: 'content',
  schema: z.object({
    relatedTool: reference('tools'),
    discountValue: z.string(),
    expiryDate: z.date(),
    dealUrl: z.string().url(),
    isDemo: z.boolean().default(true),
  }),
});

export const collections = { tools, comparisons, bestOf, guides, prompts, freeTools, deals };
