export function sanitizeDto<T extends Record<string, any>>(
  dto: T,
): {
  [K in keyof T as T[K] extends undefined ? never : K]: Exclude<T[K], undefined>;
} {
  return Object.fromEntries(Object.entries(dto).filter(([_, v]) => v !== undefined)) as any; // тут TS всё равно не сможет вывести идеально, но возвращаемый тип будет точный
}
