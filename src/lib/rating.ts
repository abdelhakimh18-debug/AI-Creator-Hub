type SubScores = {
  quality: number;
  easeOfUse: number;
  speed: number;
  reliability: number;
  value: number;
  creatorUsefulness: number;
};

/** يُحسب دائمًا من subScores — لا يُخزَّن يدويًا في أي ملف محتوى. */
export function getOverallRating(subScores: SubScores): number {
  const values = Object.values(subScores);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return Math.round(avg * 10) / 10;
}
