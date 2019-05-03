export function normalizeValue(v) {
  if (v.includes("'") || v === '_empty') {
    return v.replace(/'/g, '');
  }
  else {
    return parseFloat(v) || v;
  }
}


export function displayValue(v) {
  return v.split(/[.]/).pop().replace(/'/g, '');
}
