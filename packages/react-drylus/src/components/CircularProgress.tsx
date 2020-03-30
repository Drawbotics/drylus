import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Category, Color, Size } from '../enums';
import { Responsive, Style } from '../types';
import { Deprecated, categoryEnumToColor, getEnumAsClass, run, useResponsiveProps } from '../utils';

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
    & [data-element='circle'] {
      stroke: ${sv.brand};
    }
  `,
  red: css`
    & [data-element='circle'] {
      stroke: ${sv.red};
    }
  `,
  blue: css`
    & [data-element='circle'] {
      stroke: ${sv.blue};
    }
  `,
  orange: css`
    & [data-element='circle'] {
      stroke: ${sv.orange};
    }
  `,
  green: css`
    & [data-element='circle'] {
      stroke: ${sv.green};
    }
  `,
};

interface CircularProgressProps {
  /**
   * Determines the amount of the circle which is completed, between 0 and 1
   * @default 0
   */
  percentage: number;

  /** Text shown within the circular progress. Not shown when size is smaller than DEFAULT */
  text?: string;

  /** @deprecated Use color instead */
  /** @enum Category */
  category?: Category.BRAND | Category.SUCCESS | Category.INFO | Category.WARNING | Category.DANGER;

  /** @enum Color */
  color?: Color.BRAND | Color.RED | Color.BLUE | Color.GREEN | Color.ORANGE;

  /**
   * @default Size.DEFAULT
   * @enum Size
   * */
  size?: Size.SMALL | Size.DEFAULT | Size.LARGE | Size.EXTRA_LARGE;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const CircularProgress = ({ responsive, ...rest }: CircularProgressProps) => {
  const {
    percentage = 0,
    category,
    size = Size.DEFAULT,
    text,
    style,
    color: _color,
  } = useResponsiveProps(rest, responsive);

  const circumference = 84 * Math.PI;
  const offset = percentage * circumference;

  const color = category ? categoryEnumToColor(category) : _color;

  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles[getEnumAsClass<typeof styles>(size)]]: size != null,
        [styles[getEnumAsClass<typeof styles>(color)]]: color != null,
      })}>
      {run(() => {
        if (text && size !== Size.SMALL) {
          return <div className={styles.text}>{text}</div>;
        }
      })}
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" className={cx(styles.circle, styles.background)} />
        <circle
          cx="50"
          cy="50"
          r="42"
          data-element="circle"
          className={cx(styles.circle, styles.progress)}
          style={{ strokeDasharray: `${offset}, ${circumference}` }}
        />
      </svg>
    </div>
  );
};

CircularProgress.propTypes = {
  category: Deprecated,
};
