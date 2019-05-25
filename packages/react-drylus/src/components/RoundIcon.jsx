import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';

import Icon from './Icon';
import { Categories, Sizes } from '../base';


const styles = {
  base: css`
    border-radius: 1000px;
    height: ${sv.defaultMargin};
    width: ${sv.defaultMargin};
    color: ${sv.colorPrimary};
    background: ${sv.neutralLight};
    display: flex;
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


const RoundIcon = ({ name, size=Sizes.DEFAULT, category }) => {
  const customSize = typeof size === 'number';
  return (
    <div className={cx(styles.base, {
      [styles[category?.toLowerCase()]]: category,
      [styles[! customSize && size?.toLowerCase()]]: size,
      [styles.iconInherit]: customSize,
    })} style={customSize ? { height: size, width: size, fontSize: size * 0.5 } : null}>
      <Icon name={name} bold />
    </div>
  );
}


RoundIcon.propTypes = {
  /** Name of the icon */
  name: PropTypes.string.isRequired,

  /** Size of the icon */
  size: PropTypes.oneOfType([
    PropTypes.oneOf([Sizes.SMALL, Sizes.DEFAULT, Sizes.LARGE]),
    PropTypes.number,
  ]),

  /** Category of the icon */
  category: PropTypes.oneOf([
    Categories.DANGER,
    Categories.INFO,
    Categories.SUCCESS,
    Categories.WARNING,
    Categories.BRAND,
  ]),
};


RoundIcon.defaultProps = {
  size: Sizes.DEFAULT,
};


export default RoundIcon;
