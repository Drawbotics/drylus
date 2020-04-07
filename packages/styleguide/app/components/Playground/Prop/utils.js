import get from 'lodash/get';

export function normalizeValue(v, enums) {
  if (!v) return '';

  const asSymbol = get(enums, v);

  if (asSymbol) {
    return asSymbol;
  }

  if (Number(v)) {
    return Number(v);
  }

  if (v.includes("'") || v === '_empty') {
    return v.replace(/'/g, '');
  }

  if (v.includes('.')) {
    return v;
  }

  return v;
}


export function extractIntrinsics(values) {
  return values.reduce((memo, val) => {
    const maybeVariant = val.split('.')[1];
    const isVariant = ! ['boolean', 'number', 'string'].includes(maybeVariant);
    
    return {
      variants: isVariant ? [...memo.variants, val] : memo.variants,
      nonVariants: isVariant ? memo.nonVariants : [...memo.nonVariants, maybeVariant],
    }
  }, { variants: [], nonVariants: [] });
}