import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { Fragment } from 'react';

import { Category, Color, Size } from '../enums';
import { Responsive, Style } from '../types';
import { Deprecated, categoryEnumToColor, getEnumAsClass, run, useResponsiveProps } from '../utils';
import { placeholderStyles as shimmerStyles } from './LoadingPlaceholder';

const styles = {
  root: css`
    display: flex;
    height: ${sv.marginExtraSmall};
    width: 100%;
    position: relative;
    border-radius: ${sv.marginExtraSmall};
    overflow: hidden;
    background: ${sv.neutralLight};

    [data-element='step']:first-child {
      [data-element='bar'] {
        border-top-left-radius: ${sv.marginExtraSmall};
        border-bottom-left-radius: ${sv.marginExtraSmall};
      }
    }

    [data-element='step']:last-child {
      [data-element='bar'] {
        border-top-right-radius: ${sv.marginExtraSmall};
        border-bottom-right-radius: ${sv.marginExtraSmall};
      }
    }
  `,
  large: css`
    height: ${sv.marginSmall};
    border-radius: ${sv.marginSmall};

    [data-element='step']:first-child {
      [data-element='bar'] {
        border-top-left-radius: ${sv.marginSmall};
        border-bottom-left-radius: ${sv.marginSmall};
      }
    }

    [data-element='step']:last-child {
      [data-element='bar'] {
        border-top-right-radius: ${sv.marginSmall};
        border-bottom-right-radius: ${sv.marginSmall};
      }
    }
  `,
  extraLarge: css`
    height: 90px;
  `,
  small: css`
    height: calc(${sv.marginExtraSmall} / 2);
    border-radius: calc(${sv.marginExtraSmall} / 2);

    [data-element='step']:first-child {
      [data-element='bar'] {
        border-top-left-radius: calc(${sv.marginExtraSmall} / 2);
        border-bottom-left-radius: calc(${sv.marginExtraSmall} / 2);
      }
    }

    [data-element='step']:last-child {
      [data-element='bar'] {
        border-top-right-radius: calc(${sv.marginExtraSmall} / 2);
        border-bottom-right-radius: calc(${sv.marginExtraSmall} / 2);
      }
    }
  `,
  step: css`
    flex: 1;
    position: relative;
  `,
  bar: css`
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
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
  separator: css`
    height: 100%;
    width: 1px;
    background: ${sv.white};
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
  active: css`
    border-radius: 0 !important;
  `,
};

export interface SteppedProgressBarProps {
  /** Determines how many steps there are in the bar */
  steps: number;

  /** The index of the currenctly active step */
  activeStep: number;

  /** If specified the currently active bar has a precise width, should be between 0-1 */
  percentage?: number;

  /**
   * @deprecated use color instead
   * @kind Category
   */
  category?: Category.BRAND | Category.SUCCESS | Category.INFO | Category.WARNING | Category.DANGER;

  /** @kind Color */
  color?: Color.BRAND | Color.RED | Color.BLUE | Color.GREEN | Color.ORANGE;

  /**
   * @default Size.DEFAULT
   * @kind Size
   */
  size?: Size.SMALL | Size.DEFAULT | Size.LARGE;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const SteppedProgressBar = ({ responsive, ...rest }: SteppedProgressBarProps) => {
  const {
    percentage = 0,
    category,
    size = Size.DEFAULT,
    style,
    steps,
    activeStep,
    color: _color,
  } = useResponsiveProps<SteppedProgressBarProps>(rest, responsive);

  const indeterminate = percentage == null;
  const color = category ? categoryEnumToColor(category) : _color;

  return (
    <div
      style={style}
      className={cx(styles.root, { [styles[getEnumAsClass<typeof styles>(size)]]: size != null })}>
      {[...Array(steps).keys()].map((id, i) => (
        <Fragment key={id}>
          <div data-element="step" className={styles.step}>
            <div
              className={cx(styles.bar, {
                [styles.active]: id == activeStep && percentage !== 1,
                [styles[getEnumAsClass<typeof styles>(color)]]: color != null,
                [shimmerStyles.shimmer]: id == activeStep && indeterminate,
              })}
              style={{
                width: run(() => {
                  if (id < activeStep || (id == activeStep && indeterminate)) {
                    return '100%';
                  } else if (id == activeStep) {
                    return `${percentage * 100}%`;
                  } else {
                    return '0';
                  }
                }),
              }}
              data-element="bar"
            />
          </div>
          {run(() => {
            if (i !== steps - 1) {
              return <div className={styles.separator} />;
            }
          })}
        </Fragment>
      ))}
    </div>
  );
};

SteppedProgressBar.propTypes = {
  category: Deprecated,
};
