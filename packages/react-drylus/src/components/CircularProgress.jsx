import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';

import { Categories, Sizes } from '../base';
import { getEnumAsClass } from '../utils';


const styles = {
  root: css`
    height: 50px;
    width: 50px;
    position: relative;
    font-size: 0.8rem;

    > svg {
      height: 100%;
      width: 100%;
    }
  `,
  text: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${sv.colorTertiary};
    text-align: center;
  `,
  circle: css`
    stroke-width: 8px;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    fill: none;
    transition: ${sv.transitionShort};
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
    font-size: 1rem;
  `,
  extraLarge: css`
    height: 90px;
    width: 90px;
    font-size: 1.2rem;
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
  style,
}) => {
  const circumference = 84 * Math.PI;
  const offset = percentage * circumference;
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles[getEnumAsClass(size)]]: size,
        [styles[getEnumAsClass(category)]]: category,
      })}>
      {do{
        if (text && size !== Sizes.SMALL) {
          <div className={styles.text}>
            {text}
          </div>
        }
      }}
      <svg viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="42"
          className={cx(styles.circle, styles.background)} />
        <circle
          cx="50"
          cy="50"
          r="42"
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

  /** Text shown within the circular progress. Not shown when size is smaller than DEFAULT */
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

  /** Used for style overrides */
  style: PropTypes.object,
};


CircularProgress.defaultProps = {
  percentage: 0,
  size: Sizes.DEFAULT,
};


export default CircularProgress;
