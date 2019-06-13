import get from 'lodash/get';


export function normalizeValue(v, enums) {
  const asSymbol = get(enums, v);

  if (asSymbol) {
    return asSymbol;
  }

  if (v.includes("'") || v === '_empty') {
    return v.replace(/'/g, '');
  }
  else {
    return parseFloat(v) || v;
  }
}


export function displayValue(v) {
  return v;
}
