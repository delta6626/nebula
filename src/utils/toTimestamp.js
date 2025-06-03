export function toTimestamp(date) {
  const millis = date.getTime();
  return {
    seconds: Math.floor(millis / 1000),
    nanoseconds: (millis % 1000) * 1e6,
  };
}
