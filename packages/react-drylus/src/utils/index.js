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


function _verifyOptions(props, propName, componentName) {
  const options = props[propName];
  const labelKey = props.labelKey;
  const valueKey = props.valueKey;

  if (options.some((o) => ! o.hasOwnProperty(labelKey))) {
    return new TypeError(`Invalid Options Prop Value: 'labelKey' '${labelKey}' provided, but some options don't have property '${labelKey}' in ${componentName}`);
  }

  if (options.some((o) => ! o.hasOwnProperty(valueKey))) {
    return new TypeError(`Invalid Options Prop Value: 'valueKey' '${valueKey}' provided, but some options don't have property '${valueKey}' in ${componentName}`);
  }
}


export const CustomPropTypes = {
  options: (props, propName, componentName) => {
    return _verifyOptions(props, propName, componentName);
  },
  optionsWith: (extraPropTypes={}) => {
    return (props, propName, componentName) => {
      _verifyOptions(props, propName, componentName);

      const propTypes = {
        options: PropTypes.arrayOf(PropTypes.shape({
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          label: PropTypes.string,
          ...extraPropTypes,
        })),
      };

      return PropTypes.checkPropTypes(propTypes, props, 'options', componentName);
    };
  },
};


export function getStyleForSide({
  side,
  rect,
  rectComponent,
  sides,
}) {
  if (rect == null || rectComponent == null) return null;
  const arrowHeight = 12;

  if (side === sides.TOP) {
    return {
      top: rect?.top - rectComponent?.height - arrowHeight,
      left: rect?.left + (rect?.width / 2) - (rectComponent?.width / 2),
    };
  }
  else if (side === sides.LEFT) {
    return {
      top: rect?.top + (rect?.height / 2) - (rectComponent?.height / 2),
      left: rect?.left - rectComponent?.width - arrowHeight,
    };
  }
  else if (side === sides.RIGHT) {
    return {
      top: rect?.top + (rect?.height / 2) - (rectComponent?.height / 2),
      left: rect?.left + rect?.width + arrowHeight,
    };
  }
  else if (side === sides.BOTTOM) {
    return {
      top: rect?.top + rect?.height + arrowHeight,
      left: rect?.left + (rect?.width / 2) - (rectComponent?.width / 2),
    };
  }
  else {
    console.warn(`${String(side)} side value provided not supported`);
    return null;
  }
}