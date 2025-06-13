// Utility function to convert HTML string to plain text

export function sanitizeHTML(htmlString) {
  const d = document.createElement("div");
  d.innerHTML = (htmlString || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/?(p|div|li|tr|td|h[1-6])[^>]*>/gi, " ");
  return d.textContent.replace(/\s+/g, " ").trim();
}
