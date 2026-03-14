export function camelCase(str?: unknown): string {
  if (str == null) return '';
  const words = String(str)
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/);
  return words
    .map((w, i) => {
      const lower = w.toLowerCase();
      return i === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

export function upperFirst(str?: unknown): string {
  if (str == null) return '';
  const s = String(str);
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function get(obj: any, path: string, defaultValue?: any): any {
  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let result = obj;
  for (const key of keys) {
    result = result?.[key];
    if (result === undefined) return defaultValue;
  }
  return result;
}

export function omit<T extends Record<string, any>>(obj: T, keys: string | string[]): Partial<T> {
  const keyList = Array.isArray(keys) ? keys : [keys];
  const result = { ...obj };
  for (const key of keyList) {
    delete (result as any)[key];
  }
  return result;
}

export function omitBy<T extends Record<string, any>>(
  obj: T,
  predicate: (value: any, key: string) => boolean,
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => !predicate(value, key)),
  ) as Partial<T>;
}

export function isEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;
  if (typeof a !== 'object') return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => isEqual(a[key], b[key]));
}
