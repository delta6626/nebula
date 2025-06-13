export function formatDateDDMMYY(date) {
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0"); // months are 0-based
  const y = date.getFullYear().toString().slice(-2);
  return `${d}-${m}-${y}`;
}
