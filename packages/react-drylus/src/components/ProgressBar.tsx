import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Color, Size } from '../enums';
import { Responsive, Style } from '../types';
import { getEnumAsClass, useResponsiveProps } from '../utils';
import { placeholderStyles as shimmerStyles } from './LoadingPlaceholder';

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

    &::after {
      background: ${sv.neutralDark};
      border-radius: 0 !important;
      background-image: linear-gradient(
        to right,
        ${sv.neutralDark} 8%,
        ${sv.neutral} 18%,
        ${sv.neutralDark} 33%
      ) !important;
    }
  `,
  indeterminate: css`
    width: 100% !important;
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

    &::after {
      background: ${sv.brand};
      background-image: linear-gradient(
        to right,
        ${sv.brand} 8%,
        ${sv.brandLight} 18%,
        ${sv.brand} 33%
      ) !important;
    }
  `,
  red: css`
    background: ${sv.red};

    &::after {
      background: ${sv.red};
      background-image: linear-gradient(
        to right,
        ${sv.red} 8%,
        ${sv.redLight} 18%,
        ${sv.red} 33%
      ) !important;
    }
  `,
  blue: css`
    background: ${sv.blue};

    &::after {
      background: ${sv.blue};
      background-image: linear-gradient(
        to right,
        ${sv.blue} 8%,
        ${sv.blueLight} 18%,
        ${sv.blue} 33%
      ) !important;
    }
  `,
  orange: css`
    background: ${sv.orange};

    &::after {
      background: ${sv.orange};
      background-image: linear-gradient(
        to right,
        ${sv.orange} 8%,
        ${sv.orangeLight} 18%,
        ${sv.orange} 33%
      ) !important;
    }
  `,
  green: css`
    background: ${sv.green};

    &::after {
      background: ${sv.green};
      background-image: linear-gradient(
        to right,
        ${sv.green} 8%,
        ${sv.greenLight} 18%,
        ${sv.green} 33%
      ) !important;
    }
  `,
};

export interface ProgressBarProps {
  /** Determines the amount of the bar which is completed, between 0 and 1. If not given the bar is indeterminate */
  percentage?: number;

  /** @kind Color */
  color?: Color.BRAND | Color.RED | Color.BLUE | Color.GREEN | Color.ORANGE;

  /**
   * @default Size.DEFAULT
   * @kind Size
   */
  size?: Size.SMALL | Size.DEFAULT | Size.LARGE;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const ProgressBar = ({ responsive, ...rest }: ProgressBarProps) => {
  const { percentage, size = Size.DEFAULT, style, color, className } = useResponsiveProps<
    ProgressBarProps
  >(rest, responsive);

  const indeterminate = percentage == null;

  return (
    <div
      style={style}
      className={cx(
        styles.root,
        {
          [styles[getEnumAsClass<typeof styles>(size)]]: size != null,
        },
        className,
      )}>
      <div
        data-element="bar"
        className={cx(styles.bar, {
          [styles[getEnumAsClass<typeof styles>(color)]]: color != null,
          [styles.indeterminate]: indeterminate,
          [shimmerStyles.shimmer]: indeterminate,
        })}
        style={{ width: `${(percentage ?? 0) * 100}%` }}
      />
    </div>
  );
};
