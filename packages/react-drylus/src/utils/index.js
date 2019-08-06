import camelCase from 'lodash/camelCase';
import PropTypes from 'prop-types';

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


export function optionsPropType(extraPropTypes, props, propName, componentName) {
  const options = props[propName];
  const labelKey = props.labelKey;
  const valueKey = props.valueKey;

  if (options.some((o) => ! o.hasOwnProperty(labelKey))) {
    return new TypeError(`Invalid Options Prop Value: 'labelKey' '${labelKey}' provided, but some options don't have property '${labelKey}' in ${componentName}`);
  }

  if (options.some((o) => ! o.hasOwnProperty(valueKey))) {
    return new TypeError(`Invalid Options Prop Value: 'valueKey' '${valueKey}' provided, but some options don't have property '${valueKey}' in ${componentName}`);
  }

  return PropTypes.checkPropTypes({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    ...extraPropTypes,
  }, props, 'options', componentName);
}
