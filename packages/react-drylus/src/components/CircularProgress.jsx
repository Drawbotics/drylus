import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';

import { Categories, Sizes } from '../base';
// import { getEnumAsClass } from '../utils';


const styles = {
  root: css`
  `,
  circle: css`
    stroke-width: 4px;
    transform: rotate(-90deg);
    fill: none;
    transition: ${sv.defaultTransition};
  `,
  background: css`
    stroke: ${sv.neutralLight};
  `,
  progress: css`
    stroke: ${sv.neutralDark};
  `,
};


function getSizeFromProp(size) {
  switch (size) {
    case Sizes.EXTRA_LARGE:
      return 90;
    case Sizes.LARGE:
      return 70;
    case Sizes.SMALL:
      return 30;
    default:
      return 50;
  }
}


const CircularProgress = ({
  percentage,
  category,
  size,
  text,
}) => {
  const circleSize = getSizeFromProp(size);
  const style = { cx: circleSize / -2, cy: circleSize / 2, r: (circleSize / 2) - 2 };
  const circumference = (circleSize - 4) * Math.PI;
  const offset = percentage * circleSize;
  return (
    <div className={styles.root}>
      <svg height={`${circleSize}px`} width={`${circleSize}px`}>
        <circle data-element="circle" className={cx(styles.circle, styles.background)} style={style}>
        </circle>
        <circle data-element="circle" className={cx(styles.circle, styles.progress)} style={{
          ...style,
          strokeDasharray: `${offset}, ${circumference}`,
        }}>
        </circle>
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
