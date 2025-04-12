export const replaceItem = <T>(list: T[], item: T, key: keyof T): T[] => {
  const newList = [...list];
  const itemIndex = newList.findIndex(
    (listItem) => listItem[key] === item[key],
  );

  if (itemIndex === -1) throw 'Failed to find item in list';

  newList[itemIndex] = item;
  return newList;
};

export const sortByProp = <T>(
  list: T[],
  prop: keyof T,
  sortDirection: 'asc' | 'desc' = 'asc',
): T[] => {
  const newList = [...list];
  newList.sort((a, b) => {
    const sortValue = a[prop] > b[prop] ? 1 : -1;
    return sortDirection === 'desc' ? -1 * sortValue : sortValue;
  });
  return newList;
};

export const sortBy = <T>(
  a: T,
  b: T,
  prop: keyof T,
  sortDirection: 'asc' | 'desc' = 'asc',
): 1 | -1 => {
  const sortValue = a[prop] > b[prop] ? 1 : -1;
  return sortDirection === 'desc' ? ((-1 * sortValue) as 1 | -1) : sortValue;
};

export const findByProp = <T>(
  list: T[],
  prop: keyof T,
  value: T[keyof T],
): T | undefined => {
  return list.find((item) => item[prop] === value);
};

export const removeByProp = <T>(
  list: T[],
  prop: keyof T,
  value: T[keyof T],
): T[] => {
  return list.filter((item) => item[prop] !== value);
};

/** Adds a list of entries to list in a manner where for each individual insertion it takes the indices of the initial list for reference */
export const insertEntries = <T>(
  list: T[],
  entries: { entry: T; index: number }[],
) => {
  const newList = [...list];
  entries.sort((a, b) => (a.index > b.index ? 1 : -1)); //Sort to highest index first
  const highestIndex = entries[0].index;
  if (highestIndex > list.length) {
    throw 'Invalid list length';
  }
  entries.forEach((entry) => {
    newList.splice(entry.index, 0, entry.entry);
  });
};

export function chunk<T>(items: T[], chunkSize: number): T[][] {
  const accs = items.reduce((acc, entry, index) => {
    const isNewChunk = index % chunkSize === 0;
    if (isNewChunk) {
      acc.push([entry]);
    } else {
      acc[acc.length - 1].push(entry);
    }
    return acc;
  }, [] as T[][]);

  return accs;
}

export function sortAlphabetically(a: string, b: string): number {
  return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
}
