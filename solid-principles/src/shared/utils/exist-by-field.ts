function existByField<T>(
  items: T[],
  field: keyof T,
  value: T[keyof T]
): boolean {
  return items.some((item) => item[field] === value);
}


export { existByField };
