type SubScores = {
  quality: number;
  easeOfUse: number;
  speed: number;
  reliability: number;
  value: number;
  creatorUsefulness: number;
};

/**
 * يُحسب دائمًا من subScores — لا يُخزَّن يدويًا في أي ملف محتوى.
 * يُعيد null إن لم تُتَح subScores بعد (أداة لم تُختبر فعليًا بعد).
 */
export function getOverallRating(subScores: SubScores | undefined): number | null {
  if (!subScores) return null;
  const values = Object.values(subScores);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return Math.round(avg * 10) / 10;
}
