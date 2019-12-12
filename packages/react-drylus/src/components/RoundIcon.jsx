import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';

import Icon from './Icon';
import { Category, Size } from '../enums';
import { getEnumAsClass } from '../utils';


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
  danger: css`
    color: ${sv.white};
    background: ${sv.red};
  `,
  info: css`
    color: ${sv.white};
    background: ${sv.blue};
  `,
  success: css`
    color: ${sv.white};
    background: ${sv.green};
  `,
  warning: css`
    color: ${sv.white};
    background: ${sv.orange};
  `,
  brand: css`
    color: ${sv.white};
    background: ${sv.brand};
  `,
};


const RoundIcon = ({ name, size, category, bold, style }) => {
  const customSize = typeof size === 'number';
  return (
    <div
      className={cx(styles.root, {
        [styles[getEnumAsClass(category)]]: category,
        [styles[! customSize && getEnumAsClass(size)]]: size,
        [styles.iconInherit]: customSize,
      })}
      style={customSize ? { height: size, width: size, fontSize: size * 0.5, ...style } : style}>
      <Icon name={name} bold={bold} />
    </div>
  );
}


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

  /** Category of the icon */
  category: PropTypes.oneOf([
    Category.DANGER,
    Category.INFO,
    Category.SUCCESS,
    Category.WARNING,
    Category.BRAND,
  ]),

  /** Used for style overrides */
  style: PropTypes.object,
};


RoundIcon.defaultProps = {
  size: Size.DEFAULT,

  style: {},
};


export default RoundIcon;
