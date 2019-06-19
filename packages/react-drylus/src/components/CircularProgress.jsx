import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';

import { Categories, Sizes } from '../base';
import { getEnumAsClass } from '../utils';


const styles = {
  root: css`
    height: 50px;
    width: 50px;

    > svg {
      height: 100%;
      width: 100%;
    }
  `,
  circle: css`
    stroke-width: 10px;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    fill: none;
    cx: 50;
    cy: 50;
    r: 40;
    transition: ${sv.defaultTransition};
  `,
  background: css`
    stroke: ${sv.neutralLight};
  `,
  progress: css`
    stroke: ${sv.neutralDark};
  `,
  large: css`
    height: 70px;
    width: 70px;
  `,
  extraLarge: css`
    height: 90px;
    width: 90px;
  `,
  small: css`
    height: 30px;
    width: 30px;
  `,
  brand: css`
    & [data-element="circle"] {
      stroke: ${sv.brand};
    }
  `,
  danger: css`
    & [data-element="circle"] {
      stroke: ${sv.red};
    }
  `,
  info: css`
    & [data-element="circle"] {
      stroke: ${sv.blue};
    }
  `,
  warning: css`
    & [data-element="circle"] {
      stroke: ${sv.orange};
    }
  `,
  success: css`
    & [data-element="circle"] {
      stroke: ${sv.green};
    }
  `,
};


const CircularProgress = ({
  percentage,
  category,
  size,
  text,
}) => {
  const circumference = 80 * Math.PI;
  const offset = percentage * circumference;
  return (
    <div
      className={cx(styles.root, {
        [styles[getEnumAsClass(size)]]: size,
        [styles[getEnumAsClass(category)]]: category,
      })}>
      <svg viewBox="0 0 100 100">
        <circle
          className={cx(styles.circle, styles.background)} />
        <circle
          data-element="circle"
          className={cx(styles.circle, styles.progress)}
          style={{ strokeDasharray: `${offset}, ${circumference}` }} />
      </svg>
    </div>
  );
};


CircularProgress.propTypes = {
  /** Determines the amount of the circle which is completed, between 0 and 1 */
  percentage: PropTypes.number.isRequired,

  /** Text shown within the circular progress */
  text: PropTypes.string,

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
    Sizes.EXTRA_LARGE,
  ]),
};


CircularProgress.defaultProps = {
  percentage: 0,
  size: Sizes.DEFAULT,
};


export default CircularProgress;
