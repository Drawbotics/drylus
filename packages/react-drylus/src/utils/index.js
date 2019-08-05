import camelCase from 'lodash/camelCase';

import Categories from '../base/Categories';


export function getEnumAsClass(enumVal) {
  return camelCase(enumVal?.description.toLowerCase());
}


export function getIconForCategory(category) {
  switch (category) {
    case Categories.DANGER:
      return 'alert-circle';
    case Categories.SUCCESS:
      return 'check-circle';
    case Categories.WARNING:
      return 'alert-triangle';
    default:
      return 'info';
  }
}


export function validateOptions(labelKey, valueKey, options) {
  if (options.some((o) => ! o.hasOwnProperty(labelKey))) {
    console.warn(`'labelKey' '${labelKey}' provided, but some options don't have property '${labelKey}'`);
    return false;
  }

  if (options.some((o) => ! o.hasOwnProperty(valueKey))) {
    console.warn(`'valueKey' '${valueKey}' provided, but some options don't have property '${valueKey}'`);
    return false;
  }

  return true;
}
