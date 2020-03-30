import sv from '@drawbotics/drylus-style-vars';
import { css, cx, keyframes } from 'emotion';
import React from 'react';

import { Category, Color, Size } from '../enums';
import { Responsive, Style } from '../types';
import { Deprecated, categoryEnumToColor, useResponsiveProps } from '../utils';

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
  container: css``,
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
  blue: css`
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

interface SpinnerProps {
  /**
   * @default Size.DEFAULT
   * @enum Size
   * */
  size?: Size.SMALL | Size.DEFAULT | Size.LARGE;

  /**
   * @deprecated use color instead
   * @enum Category
   * */
  category?: Category.BRAND | Category.INFO;

  /** @enum Color */
  color?: Color.BRAND | Color.BLUE;

  /** If true, sets the color of the spinner to white (to be used against colored backgrounds) */
  inversed?: boolean;

  /** If true the spinner will be placed in the center of the parent container */
  fullSize?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const Spinner = ({ responsive, ...rest }: SpinnerProps) => {
  const {
    size = Size.DEFAULT,
    category,
    inversed,
    fullSize,
    style,
    color: _color,
  } = useResponsiveProps<SpinnerProps>(rest, responsive);
  const color = category != null ? categoryEnumToColor(category) : _color;
  return (
    <div
      style={style}
      className={cx(styles.container, {
        [styles.fullSizeContainer]: fullSize,
      })}>
      <div
        className={cx(styles.root, {
          [styles.small]: size === Size.SMALL,
          [styles.large]: size === Size.LARGE,
        })}>
        <svg className={styles.circle} viewBox="25 25 50 50">
          <circle
            className={cx(styles.path, {
              [styles.brand]: color === Color.BRAND,
              [styles.blue]: color === Color.BLUE,
              [styles.white]: inversed,
            })}
            cx="50"
            cy="50"
            r="20"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
};

Spinner.propTypes = {
  category: Deprecated,
};
