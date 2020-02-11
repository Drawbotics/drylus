import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';

import { Category, Color, Size } from '../enums';
import { CustomPropTypes, categoryEnumToColor, getEnumAsClass } from '../utils';
import { useResponsiveProps } from '../utils/hooks';
import Icon from './Icon';

const styles = {
  root: css`
    border-radius: 1000px;
    height: ${sv.defaultMargin};
    width: ${sv.defaultMargin};
    color: ${sv.colorPrimary};
    background: ${sv.neutralLight};
    display: inline-flex;
    align-items: center;
    justify-content: center;

    > i {
      font-size: 1rem;
      margin-top: 1px;
    }
  `,
  small: css`
    height: ${sv.marginSmall};
    width: ${sv.marginSmall};

    > i {
      font-size: 0.65rem;
    }
  `,
  large: css`
    height: ${sv.marginLarge};
    width: ${sv.marginLarge};

    > i {
      font-size: 1.3rem;
      margin-top: 0;
      margin-left: -1px;
    }
  `,
  iconInherit: css`
    > i {
      font-size: inherit;
    }
  `,
  red: css`
    color: ${sv.white};
    background: ${sv.red};
  `,
  blue: css`
    color: ${sv.white};
    background: ${sv.blue};
  `,
  green: css`
    color: ${sv.white};
    background: ${sv.green};
  `,
  orange: css`
    color: ${sv.white};
    background: ${sv.orange};
  `,
  brand: css`
    color: ${sv.white};
    background: ${sv.brand};
  `,
};

const RoundIcon = ({ responsive, ...rest }) => {
  const { name, size, category, bold, style, color: _color } = useResponsiveProps(rest, responsive);

  const customSize = typeof size === 'number';
  const color = category ? categoryEnumToColor(category) : _color;
  return (
    <div
      className={cx(styles.root, {
        [styles[getEnumAsClass(color)]]: color,
        [styles[!customSize && getEnumAsClass(size)]]: size,
        [styles.iconInherit]: customSize,
      })}
      style={customSize ? { height: size, width: size, fontSize: size * 0.5, ...style } : style}>
      <Icon name={name} bold={bold} />
    </div>
  );
};

RoundIcon.propTypes = {
  /** Name of the icon */
  name: PropTypes.string.isRequired,

  /** Size of the icon */
  size: PropTypes.oneOfType([
    PropTypes.oneOf([Size.SMALL, Size.DEFAULT, Size.LARGE]),
    PropTypes.number,
  ]),

  /** Makes the icon bold */
  bold: PropTypes.bool,

  /** DEPRECATED */
  category: CustomPropTypes.deprecated(
    PropTypes.oneOf([
      Category.DANGER,
      Category.INFO,
      Category.SUCCESS,
      Category.WARNING,
      Category.BRAND,
    ]),
  ),

  color: PropTypes.oneOf([Color.BRAND, Color.RED, Color.BLUE, Color.GREEN, Color.ORANGE]),

  /** Used for style overrides */
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
};

RoundIcon.defaultProps = {
  size: Size.DEFAULT,

  style: {},
};

export default RoundIcon;
