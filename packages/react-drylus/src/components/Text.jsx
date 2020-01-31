import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';
import sv from '@drawbotics/drylus-style-vars';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

import { Tier, Size, Category } from '../enums';
import { getEnumAsClass } from '../utils';
import { useResponsiveProps } from '../utils/hooks';
import { generateDisplayedDate, ShowDateTime } from '../utils/date/date';


const styles = {
  root: css`
    display: inline;
  `,
  bold: css`
    font-weight: 500;
    letter-spacing: 0.01rem;
  `,
  light: css`
    font-weight: 300;
    letter-spacing: 0.06rem;
  `,
  primary: css`
    color: ${sv.colorPrimary};
  `,
  secondary: css`
    color: ${sv.colorSecondary};
  `,
  tertiary: css`
    color: ${sv.colorTertiary};
  `,
  disabled: css`
    color: ${sv.colorDisabled};
  `,
  primaryInversed: css`
  color: ${sv.colorPrimaryInverse};
  `,
  secondaryInversed: css`
    color: ${sv.colorSecondaryInverse};
  `,
  tertiaryInversed: css`
    color: ${sv.colorTertiaryInverse};
  `,
  disabledInversed: css`
    color: ${sv.colorDisabledInverse};
  `,
  small: css`
    font-size: 0.9rem;
  `,
  default: css`
    font-size: 1rem;
  `,
  large: css`
    font-size: 1.1rem;
  `,
  brand: css`
    color: ${sv.brand};
  `,
  success: css`
    color: ${sv.success};
  `,
  danger: css`
    color: ${sv.danger};
  `,
  warning: css`
    color: ${sv.warning};
  `,
  info: css`
    color: ${sv.info};
  `,
};


function _processChild(child, dateOptions) {
  if (isObject(child)) {
    if (child instanceof Date) {
      // Handle dates
      return generateDisplayedDate({
        date: child,
        options: dateOptions,
      });
    }
    else if (child.value != null && child.currency != null) {
      // Handle currency
      return '[currency]';
    }
    else {
      console.warn('Unsupported Text child type. Please provde text, Date or Currency');
      return '';
    }
  }
  return child;
}


const Text = ({
  responsive,
  ...rest
}) => {
  const {
    inversed,
    bold,
    size,
    tier,
    disabled,
    children,
    category,
    style,
    light,
    dateOptions,
  } = useResponsiveProps(rest, responsive);

  const transformedChildren = isArray(children)
    ? [...children].map((child) => _processChild(child, dateOptions)).join('')
    : _processChild(children, dateOptions);

  return (
    <span className={cx(styles.root, {
      [styles.bold]: bold,
      [styles.light]: light,
      [styles.primary]: tier === Tier.PRIMARY && ! disabled && ! inversed,
      [styles.secondary]: tier === Tier.SECONDARY && ! disabled && ! inversed,
      [styles.tertiary]: tier === Tier.TERTIARY && ! disabled && ! inversed,
      [styles.disabled]: disabled && ! inversed,
      [styles.primaryInversed]: tier === Tier.PRIMARY && ! disabled && inversed,
      [styles.secondaryInversed]: tier === Tier.SECONDARY && ! disabled && inversed,
      [styles.tertiaryInversed]: tier === Tier.TERTIARY && ! disabled && inversed,
      [styles.disabledInversed]: disabled && inversed,
      [styles.small]: size === Size.SMALL,
      [styles.default]: size === Size.DEFAULT,
      [styles.large]: size === Size.LARGE,
      [styles[getEnumAsClass(category)]]: category && ! disabled && ! inversed,
    })} style={style}>
      {transformedChildren}
    </span>
  );
};


Text.propTypes = {
  /** Makes the text visible on dark backgrounds */
  inversed: PropTypes.bool,

  bold: PropTypes.bool,

  /** The opposite of bold, will set the font weight to 300 (useful with `inversed` on dark backgrounds) */
  light: PropTypes.bool,

  size: PropTypes.oneOf([Size.SMALL, Size.DEFAULT, Size.LARGE]),

  tier: PropTypes.oneOf([Tier.PRIMARY, Tier.SECONDARY, Tier.TERTIARY]),

  /** Makes the text appear disabled, but still selectable */
  disabled: PropTypes.bool,

  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({
      currency: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
          currency: PropTypes.string.isRequired,
          value: PropTypes.number.isRequired,
        }),
        PropTypes.instanceOf(Date),
      ])
    ),
  ]).isRequired,

  category: PropTypes.oneOf([
    Category.BRAND,
    Category.DANGER,
    Category.SUCCESS,
    Category.INFO,
    Category.WARNING,
  ]),

  /** Custom style object override */
  style: PropTypes.object,

  /** Reponsive prop overrides */
  responsive: PropTypes.shape({
    XS: PropTypes.object,
    S: PropTypes.object,
    M: PropTypes.object,
    L: PropTypes.object,
    XL: PropTypes.object,
    HUGE: PropTypes.object,
  }),
  
  /** Options to change the way the date is displayed, if provided. showTime toggles display of hour/minutes, format for dayjs overrides */
  dateOptions: PropTypes.shape({
    showTime: PropTypes.oneOf([
      ShowDateTime.DEFAULT,
      ShowDateTime.NEVER,
      ShowDateTime.ALWAYS,
    ]),
    asArchive: PropTypes.bool,
    // need to add options for dayjs
  }),
};


Text.defaultProps = {
  inversed: false,
  bold: false,
  light: false,
  size: Size.DEFAULT,
  tier: Tier.PRIMARY,
  disabled: false,
};


export default Text;
