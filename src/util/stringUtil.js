export function isNullOrEmpty(value) {
  if (value == null || value === "" || value === 0) {
    return true;
  }
  return false;
}
