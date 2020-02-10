import Dayjs from 'dayjs';
import camelCase from 'lodash/camelCase';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import { Category, Color, Shade, Tier } from '../enums';

export function getEnumAsClass(enumVal) {
  return camelCase(enumVal?.description?.toLowerCase());
}

export function colorEnumToCategory(enumVal) {
  switch (enumVal) {
    case Color.RED:
      return Category.DANGER;
    case Color.GREEN:
      return Category.SUCCESS;
    case Color.ORANGE:
      return Category.WARNING;
    case Color.BLUE:
      return Category.INFO;
  }
  return enumVal;
}

export function categoryEnumToColor(enumVal) {
  switch (enumVal) {
    case Category.DANGER:
      return Color.RED;
    case Category.SUCCESS:
      return Color.GREEN;
    case Category.WARNING:
      return Color.ORANGE;
    case Category.INFO:
      return Color.BLUE;
  }
  return enumVal;
}

export function shadeEnumToTier(enumVal) {
  switch (enumVal) {
    case Shade.DARK:
      return Tier.PRIMARY;
    case Shade.MEDIUM:
      return Tier.SECONDARY;
    case Shade.LIGHT:
      return Tier.TERTIARY;
  }
  return enumVal;
}

export function getIconForCategory(category) {
  switch (category) {
    case Category.DANGER:
      return 'alert-circle';
    case Category.SUCCESS:
      return 'check-circle';
    case Category.WARNING:
      return 'alert-triangle';
    default:
      return 'info';
  }
}

function _verifyOptions(props, propName, componentName) {
  const options = props[propName];
  const labelKey = props.labelKey;
  const valueKey = props.valueKey;

  if (options.some((o) => !o.hasOwnProperty(labelKey))) {
    return new TypeError(
      `Invalid Options Prop Value: 'labelKey' '${labelKey}' provided, but some options don't have property '${labelKey}' in ${componentName}`,
    );
  }

  if (options.some((o) => !o.hasOwnProperty(valueKey))) {
    return new TypeError(
      `Invalid Options Prop Value: 'valueKey' '${valueKey}' provided, but some options don't have property '${valueKey}' in ${componentName}`,
    );
  }
}

export const CustomPropTypes = {
  deprecated: (type) => {
    return (props, propName, componentName) => {
      if (props[propName]) {
        console.warn(
          `Deprecation warning: \`${propName}\` has been deprecated. It will be removed in the next major version (${componentName})`,
        );
      }

      return PropTypes.checkPropTypes({ [propName]: type }, props, propName, componentName);
    };
  },
  mutuallyExclusive: (mutuallyExclusiveProp, options) => {
    return (props, propName, componentName) => {
      if (props[propName] != null && options.deprecated) {
        console.warn(
          `Deprecation warning: \`${propName}\` has been deprecated in favour of \`${mutuallyExclusiveProp}\`. It will be removed in the next major version (${componentName})`,
        );
      }
      if (props[propName] != null && props[mutuallyExclusiveProp] != null) {
        return new TypeError(
          `Prop \`${propName}\` cannot be used with \`${mutuallyExclusiveProp}\` (${componentName})`,
        );
      }

      const propTypes = {
        [propName]:
          options.required && props[mutuallyExclusiveProp] == null
            ? options.type.isRequired
            : options.type,
      };

      return PropTypes.checkPropTypes(propTypes, props, propName, componentName);
    };
  },
  options: (props, propName, componentName) => {
    return _verifyOptions(props, propName, componentName);
  },
  optionsWith: (extraPropTypes = {}) => {
    return (props, propName, componentName) => {
      _verifyOptions(props, propName, componentName);

      const propTypes = {
        options: PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            label: PropTypes.string,
            ...extraPropTypes,
          }),
        ),
      };

      return PropTypes.checkPropTypes(propTypes, props, 'options', componentName);
    };
  },
};

export const deprecateProperty = (target, oldName, newName) => {
  if (process.env.NODE_ENV === 'production') {
    return target;
  }
  return new Proxy(target, {
    get(target, key) {
      console.warn(`${oldName} is deprecated. Use ${newName} instead.`);
      return Reflect.get(...arguments);
    },
  });
};

export function getStyleForSide({ side, rect, rectComponent, sides }) {
  if (rect == null || rectComponent == null) return null;
  const arrowHeight = 12;

  if (side === sides.TOP) {
    return {
      top: rect?.top - rectComponent?.height - arrowHeight,
      left: rect?.left + rect?.width / 2 - rectComponent?.width / 2,
    };
  } else if (side === sides.LEFT) {
    return {
      top: rect?.top + rect?.height / 2 - rectComponent?.height / 2,
      left: rect?.left - rectComponent?.width - arrowHeight,
    };
  } else if (side === sides.RIGHT) {
    return {
      top: rect?.top + rect?.height / 2 - rectComponent?.height / 2,
      left: rect?.left + rect?.width + arrowHeight,
    };
  } else if (side === sides.BOTTOM) {
    return {
      top: rect?.top + rect?.height + arrowHeight,
      left: rect?.left + rect?.width / 2 - rectComponent?.width / 2,
    };
  } else {
    console.warn(`${String(side)} side value provided not supported`);
    return null;
  }
}

export function getCurrentLocale() {
  if (navigator.languages != null && navigator.languages.length != null) {
    return navigator.languages[0];
  } else {
    return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en-GB';
  }
}

export function getTimeDifferenceFromToday(_date) {
  const date = Dayjs(_date);
  const today = Dayjs(new Date());
  const minutesDifference = date.diff(today, 'minutes');
  const hoursDifference = date.diff(today, 'hours');
  const daysDifference = date.diff(today, 'days');
  const isTomorrow = date.isAfter(today, 'day');
  const isYesterday = date.isBefore(today, 'day');
  const isToday = date.isSame(today, 'day');
  const isSameYear = date.year() == today.year();

  return {
    minutesDifference,
    hoursDifference,
    daysDifference,
    isToday,
    isTomorrow,
    isYesterday,
    isSameYear,
  };
}

export class WrapperRef extends React.Component {
  componentDidMount() {
    const { setChildrenRef } = this.props;
    // eslint-disable-next-line react/no-find-dom-node
    const node = ReactDOM.findDOMNode(this);
    setChildrenRef(node);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
