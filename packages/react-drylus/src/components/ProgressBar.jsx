import sv from '@drawbotics/drylus-style-vars';
import { css, cx, keyframes } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';

import { Category, Size } from '../enums';
import { getEnumAsClass } from '../utils';
import { useResponsiveProps } from '../utils/hooks';

const translateX = keyframes`
  0% {
    transform: translateX(-40%);
  }
  100% {
    transform: translateX(140%);
  }
`;

const styles = {
  root: css`
    height: ${sv.marginExtraSmall};
    width: 100%;
    position: relative;
    border-radius: ${sv.marginExtraSmall};
    overflow: hidden;
    background: ${sv.neutralLight};

    [data-element='bar'] {
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
    transition: ${sv.transitionShort};
    overflow: hidden;
  `,
  indeterminate: css`
    width: 50% !important;
    animation: ${translateX} calc(${sv.defaultTransitionTime} * 2) ease-in-out alternate infinite;
  `,
  large: css`
    height: ${sv.marginSmall};
    border-radius: ${sv.marginSmall};

    [data-element='bar'] {
      border-radius: ${sv.marginSmall};
    }
  `,
  extraLarge: css`
    height: 90px;
  `,
  small: css`
    height: calc(${sv.marginExtraSmall} / 2);
    border-radius: calc(${sv.marginExtraSmall} / 2);

    [data-element='bar'] {
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

const ProgressBar = ({ responsive, ...rest }) => {
  const { percentage, category, size, style } = useResponsiveProps(rest, responsive);

  const indeterminate = percentage == null;

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
          [styles.indeterminate]: indeterminate,
        })}
        style={{ width: `${percentage * 100}%` }}
      />
    </div>
  );
};

ProgressBar.propTypes = {
  /** Determines the amount of the bar which is completed, between 0 and 1. If not given the bar is indeterminate */
  percentage: PropTypes.number,

  category: PropTypes.oneOf([
    Category.BRAND,
    Category.DANGER,
    Category.SUCCESS,
    Category.INFO,
    Category.WARNING,
  ]),

  size: PropTypes.oneOf([Size.SMALL, Size.DEFAULT, Size.LARGE]),

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

ProgressBar.defaultProps = {
  size: Size.DEFAULT,
};

export default ProgressBar;
