export function getPseudoRandomId(
  max: number = Number.MAX_SAFE_INTEGER,
): number {
  return Math.floor(Math.random() * max);
}
