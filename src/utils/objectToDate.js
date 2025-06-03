export function objectToDate(tsObject) {
  return new Date(tsObject.seconds * 1000 + tsObject.nanoseconds / 1_000_000);
}
