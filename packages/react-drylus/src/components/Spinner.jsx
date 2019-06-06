import React from 'react';
import { css, cx, keyframes } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';

import { Sizes, Categories } from '../base';


const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;


const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`;


const styles = {
  root: css`
    position: relative;
    width: ${sv.defaultMargin};
    height: ${sv.defaultMargin};

    &::before {
      content: ' ';
      padding-top: 100%;
    }
  `,
  circle: css`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    transform-origin: center center;
    animation: ${rotate} calc(${sv.defaultTransitionTime} * 5) linear infinite;
  `,
  path: css`
    stroke-width: 5;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: ${dash} calc(${sv.defaultTransitionTime} * 4) ease-in-out infinite;
    stroke-linecap: round;
    stroke-miterlimit: 10;
    stroke: ${sv.neutralDarker};
  `,
  brand: css`
    stroke: ${sv.brand};
  `,
  info: css`
    stroke: ${sv.blue};
  `,
  white: css`
    stroke: ${sv.white};
  `,
  large: css`
    width: ${sv.marginLarge};
    height: ${sv.marginLarge};
  `,
  small: css`
    width: ${sv.marginSmall};
    height: ${sv.marginSmall};
  `,
};


const Spinner = ({
  size,
  category,
  inversed,
}) => {
  return (
    <div className={cx(styles.root, {
      [styles.small]: size === Sizes.SMALL,
      [styles.large]: size === Sizes.LARGE,
    })}>
      <svg className={styles.circle} viewBox="25 25 50 50">
        <circle className={cx(styles.path, {
          [styles.brand]: category === Categories.BRAND,
          [styles.info]: category === Categories.INFO,
          [styles.white]: inversed,
        })} cx="50" cy="50" r="20" fill="none" />
      </svg>
    </div>
  );
};


Spinner.propTypes = {
  size: PropTypes.oneOf([ Sizes.DEFAULT, Sizes.SMALL, Sizes.LARGE ]),

  /** For now limited to BRAND and INFO only, could have more in the future */
  category: PropTypes.oneOf([ Categories.BRAND, Categories.INFO ]),

  /** If true, sets the color of the spinner to white (to be used against colored backgrounds) */
  inversed: PropTypes.bool,
};


Spinner.defaultProps = {
  size: Sizes.DEFAULT,
};


export default Spinner;
