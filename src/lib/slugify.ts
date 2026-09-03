/** Turns a free-form label into a URL-safe slug, e.g. "Cinematic Prompts" -> "cinematic-prompts". */
export function slugify(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
