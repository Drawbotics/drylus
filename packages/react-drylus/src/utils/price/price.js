import { getCurrentLocale } from '../';

// MDN IE polyfill
Number.isInteger =
  Number.isInteger ||
  function(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
  };

export function generateDisplayedPrice({ price, locale = getCurrentLocale(), options = {} }) {
  const { value, currency } = price;

  const localeRoot = locale.split('-')[0];

  return value.toLocaleString(localeRoot, {
    currency,
    style: currency ? 'currency' : 'decimal',
    minimumFractionDigits: Number.isInteger(value) ? 0 : undefined,
    maximumFractionDigits: Number.isInteger(value) ? 0 : undefined,
    ...options,
  });
}
