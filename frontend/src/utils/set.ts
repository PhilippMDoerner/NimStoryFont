export function addEntries<T>(set: Set<T>, entries: T[]): Set<T> {
  entries.forEach((entry) => set.add(entry));
  return set;
}
