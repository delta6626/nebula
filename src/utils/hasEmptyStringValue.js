// Checks if an object has empty string value
export function hasEmptyStringValue(obj) {
  return Object.values(obj).some((value) => value === "");
}
