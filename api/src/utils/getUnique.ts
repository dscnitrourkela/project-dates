function onlyUnique(value: unknown, index: number, self: unknown[]) {
  return self.indexOf(value) === index;
}

export const getUnique = (arr: unknown[]): unknown[] => arr.filter(onlyUnique);
