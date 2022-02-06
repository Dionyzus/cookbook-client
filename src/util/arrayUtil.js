export function generateArray(number, divisor) {
  if (divisor > 0) {
    number = Math.ceil(number / divisor);
  }
  return [...Array(number).keys()];
}
