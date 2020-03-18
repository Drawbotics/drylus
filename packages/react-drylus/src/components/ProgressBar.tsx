import sv from '@drawbotics/drylus-style-vars';
import { css, cx, keyframes } from 'emotion';
import React from 'react';

import { Category, Color, Size } from '../enums';
import { Responsive, Style } from '../types';
import { Deprecated, categoryEnumToColor, getEnumAsClass, useResponsiveProps } from '../utils';

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
  red: css`
    background: ${sv.red};
  `,
  blue: css`
    background: ${sv.blue};
  `,
  orange: css`
    background: ${sv.orange};
  `,
  green: css`
    background: ${sv.green};
  `,
};

interface ProgressBarProps {
  /** Determines the amount of the bar which is completed, between 0 and 1. If not given the bar is indeterminate */
  percentage?: number;

  /** @deprecated use color instead */
  category?: Exclude<Category, Category.PRIMARY>;

  color?: Exclude<Color, Color.PRIMARY>;

  /** @default Size.DEFAULT */
  size?: Size.SMALL | Size.DEFAULT | Size.LARGE;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const ProgressBar = ({ responsive, ...rest }: ProgressBarProps) => {
  const {
    percentage = 0,
    category,
    size = Size.DEFAULT,
    style,
    color: _color,
  } = useResponsiveProps<ProgressBarProps>(rest, responsive);

  const indeterminate = percentage == null;
  const color = category ? categoryEnumToColor(category) : _color;

  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles[getEnumAsClass<typeof styles>(size)]]: size != null,
      })}>
      <div
        data-element="bar"
        className={cx(styles.bar, {
          [styles[getEnumAsClass<typeof styles>(color)]]: color != null,
          [styles.indeterminate]: indeterminate,
        })}
        style={{ width: `${percentage * 100}%` }}
      />
    </div>
  );
};

ProgressBar.propTypes = {
  category: Deprecated,
};