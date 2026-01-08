/**
 * Calculate the estimated reading time for a given text
 * @param text - The text content to analyze
 * @returns A formatted string like "X min read" or the number of minutes
 */
export function calculateReadingTime(text: string): number {
  if (!text) return 0;
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return minutes;
}

/**
 * Calculate reading time and return a formatted string
 * @param text - The text content to analyze
 * @returns A formatted string like "X min read"
 */
export function getReadingTimeString(text: string): string {
  const minutes = calculateReadingTime(text);
  return `${minutes} min read`;
}
