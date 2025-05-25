export function setLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function getLS(key, fallback = null) {
  const v = localStorage.getItem(key);
  try {
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
export function removeLS(key) {
  localStorage.removeItem(key);
} 