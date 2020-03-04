import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import camelCase from 'lodash/camelCase';
// import PropTypes from 'prop-types';
import React from 'react';

import { Category, Color } from '../enums';

// import { CustomPropTypes, categoryEnumToColor, getEnumAsClass } from '../utils';

export function getEnumAsClass(enumVal: any) {
  return camelCase(enumVal?.description?.toLowerCase());
}

export function categoryEnumToColor(enumVal: any) {
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

const styles: any = {
  root: css`
    display: inline-block;
    border-radius: 1000px;
    height: ${sv.marginExtraSmall};
    width: ${sv.marginExtraSmall};
    background: ${sv.neutral};
  `,
  brand: css`
    background: ${sv.brand};
  `,
  green: css`
    background: ${sv.green};
  `,
  red: css`
    background: ${sv.red};
  `,
  orange: css`
    background: ${sv.orange};
  `,
  blue: css`
    background: ${sv.blue};
  `,
  primary: css`
    background: ${sv.colorPrimary};
  `,
};

interface DotProps {
  category: any;
  style: any;
  color: any;
}

export const Dot = ({ category, style, color: _color }: DotProps) => {
  const color = category ? categoryEnumToColor(category) : _color;
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles[getEnumAsClass(color)]]: color,
      })}
    />
  );
};

// Dot.propTypes = {
//   /** DEPRECATED */
//   category: CustomPropTypes.deprecated(
//     PropTypes.oneOf([
//       Category.BRAND,
//       Category.SUCCESS,
//       Category.INFO,
//       Category.WARNING,
//       Category.DANGER,
//       Category.PRIMARY,
//     ]),
//   ),

//   color: PropTypes.oneOf([
//     Color.BRAND,
//     Color.RED,
//     Color.BLUE,
//     Color.GREEN,
//     Color.ORANGE,
//     Color.PRIMARY,
//   ]),

//   /** Used for style overrides */
//   style: PropTypes.object,
// };
