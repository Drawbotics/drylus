import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';

import { Categories, Sizes } from '../base';
import { getEnumAsClass } from '../utils';


const styles = {
  root: css`
    height: ${sv.marginExtraSmall};
    width: 100%;
    position: relative;
    border-radius: ${sv.marginExtraSmall};
    overflow: hidden;
    background: ${sv.neutralLight};

    [data-element="bar"] {
      border-radius: ${sv.marginExtraSmall};
    }
  `,
  bar: css`
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background: ${sv.neutralDark};
    transition: ${sv.defaultTransition};
    overflow: hidden;
  `,
  large: css`
    height: ${sv.marginSmall};
    border-radius: ${sv.marginSmall};

    [data-element="bar"] {
      border-radius: ${sv.marginSmall};
    }
  `,
  extraLarge: css`
    height: 90px;
  `,
  small: css`
    height: calc(${sv.marginExtraSmall} / 2);
    border-radius: calc(${sv.marginExtraSmall} / 2);

    [data-element="bar"] {
      border-radius: calc(${sv.marginExtraSmall} / 2);
    }
  `,
  brand: css`
    background: ${sv.brand};
  `,
  danger: css`
    background: ${sv.red};
  `,
  info: css`
    background: ${sv.blue};
  `,
  warning: css`
    background: ${sv.orange};
  `,
  success: css`
    background: ${sv.green};
  `,
};


const ProgressBar = ({
  percentage,
  category,
  size,
  style,
}) => {
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles[getEnumAsClass(size)]]: size,
      })}>
      <div
        data-element="bar"
        className={cx(styles.bar, {
          [styles[getEnumAsClass(category)]]: category,
        })}
        style={{ width: `${percentage * 100}%` }} />
    </div>
  );
};


ProgressBar.propTypes = {
  /** Determines the amount of the bar which is completed, between 0 and 1 */
  percentage: PropTypes.number.isRequired,

  category: PropTypes.oneOf([
    Categories.BRAND,
    Categories.DANGER,
    Categories.SUCCESS,
    Categories.INFO,
    Categories.WARNING,
  ]),

  size: PropTypes.oneOf([
    Sizes.SMALL,
    Sizes.DEFAULT,
    Sizes.LARGE,
  ]),

  /** Used for style overrides */
  style: PropTypes.object,
};


ProgressBar.defaultProps = {
  percentage: 0,
  size: Sizes.DEFAULT,
};


export default ProgressBar;
