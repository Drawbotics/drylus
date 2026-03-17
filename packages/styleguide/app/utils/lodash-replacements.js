/**
 * Native replacements for lodash functions used in the styleguide.
 * Eliminates the full lodash dependency (~692 KB).
 */

/** "FooBarBaz" → "foo-bar-baz", "foo bar" → "foo-bar" */
export function kebabCase(str) {
  if (!str) return '';
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/** "foo-bar" → "Foo Bar", "fooBar" → "Foo Bar" */
export function startCase(str) {
  if (!str) return '';
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** "hello" → "Hello" */
export function upperFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Get last element of array */
export function last(arr) {
  return arr?.[arr.length - 1];
}

/** Return a copy of obj without the specified keys */
export function omit(obj, keys) {
  if (!obj) return {};
  const keysToOmit = Array.isArray(keys) ? keys : [keys];
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keysToOmit.includes(key)),
  );
}

/** Compose functions left to right: flow(f, g)(x) === g(f(x)) */
export function flow(...fns) {
  return (...args) => {
    let result = fns[0](...args);
    for (let i = 1; i < fns.length; i++) {
      result = fns[i](result);
    }
    return result;
  };
}

/** Deep merge objects (non-mutating) */
export function merge(target, ...sources) {
  const result = { ...target };
  for (const source of sources) {
    if (!source) continue;
    for (const [key, value] of Object.entries(source)) {
      if (
        value != null &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        result[key] != null &&
        typeof result[key] === 'object' &&
        !Array.isArray(result[key])
      ) {
        result[key] = merge(result[key], value);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}

/** Get nested value by dot-separated path: get(obj, "a.b.c") */
export function get(obj, path) {
  if (obj == null || !path) return undefined;
  const keys = typeof path === 'string' ? path.split('.') : path;
  let result = obj;
  for (const key of keys) {
    if (result == null) return undefined;
    result = result[key];
  }
  return result;
}
