export const calculateReadingTime = (text) => {
  if (!text) return 0;
  const wpm = 200; // Words per minute
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm); // Time = Total Words / 200
  return time;
};