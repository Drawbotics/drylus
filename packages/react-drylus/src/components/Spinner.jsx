import React from 'react';
import { css, cx, keyframes } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';

import { Size, Category } from '../enums';
import { useResponsiveProps } from '../utils/hooks';


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
  container: css`
  `,
  fullSizeContainer: css`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  `,
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
  responsive,
  ...rest,
}) => {
  const {
    size,
    category,
    inversed,
    fullSize,
    style,
  } = useResponsiveProps(rest, responsive);
  return (
    <div
      style={style}
      className={cx(styles.container, {
        [styles.fullSizeContainer]: fullSize,
      })}>
      <div className={cx(styles.root, {
        [styles.small]: size === Size.SMALL,
        [styles.large]: size === Size.LARGE,
      })}>
        <svg className={styles.circle} viewBox="25 25 50 50">
          <circle className={cx(styles.path, {
            [styles.brand]: category === Category.BRAND,
            [styles.info]: category === Category.INFO,
            [styles.white]: inversed,
          })} cx="50" cy="50" r="20" fill="none" />
        </svg>
      </div>
    </div>
  );
};


Spinner.propTypes = {
  size: PropTypes.oneOf([ Size.DEFAULT, Size.SMALL, Size.LARGE ]),

  /** For now limited to BRAND and INFO only, could have more in the future */
  category: PropTypes.oneOf([ Category.BRAND, Category.INFO ]),

  /** If true, sets the color of the spinner to white (to be used against colored backgrounds) */
  inversed: PropTypes.bool,

  /** If true the spinner will be placed in the center of the parent container */
  fullSize: PropTypes.bool,

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


Spinner.defaultProps = {
  size: Size.DEFAULT,
};


export default Spinner;
