import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { Category, Size } from '../enums';
import { getEnumAsClass } from '../utils';
import { useResponsiveProps } from '../utils/hooks';

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
  `,
  separator: css`
    height: 100%;
    width: 1px;
    background: ${sv.white};
  `,
  brand: css`
    background: ${sv.brand};
  `,
  danger: css`
    background: ${sv.red};
  `,
  info: css`
    background: ${sv.blue};
  `,
  warning: css`
    background: ${sv.orange};
  `,
  success: css`
    background: ${sv.green};
  `,
  active: css`
    border-radius: 0 !important;
  `,
};

const SteppedProgressBar = ({ responsive, ...rest }) => {
  const { percentage, category, size, style, steps, activeStep } = useResponsiveProps(
    rest,
    responsive,
  );

  const indeterminate = percentage == null;

  return (
    <div style={style} className={cx(styles.root, { [styles[getEnumAsClass(size)]]: size })}>
      {[...Array(steps).keys()].map((id, i) => (
        <Fragment key={id}>
          <div data-element="step" className={styles.step}>
            <div
              className={cx(styles.bar, {
                [styles.active]: id === activeStep && percentage !== 1,
                [styles.indeterminate]: indeterminate,
                [styles[getEnumAsClass(category)]]: category,
              })}
              style={{
                width: do {
                  if (id < activeStep) {
                    ('100%');
                  } else if (id == activeStep) {
                    `${percentage * 100}%`;
                  } else {
                    ('0');
                  }
                },
              }}
              data-element="bar"
            />
          </div>
          {do {
            if (i !== steps - 1) {
              <div className={styles.separator} />;
            }
          }}
        </Fragment>
      ))}
    </div>
  );
};

SteppedProgressBar.propTypes = {
  /** Determines how many steps there are in the bar */
  steps: PropTypes.number.isRequired,

  /** The index of the currenctly active step */
  activeStep: PropTypes.number.isRequired,

  /** If specified the currently active bar has a precise width, should be between 0-1 */
  percentage: PropTypes.number,

  category: PropTypes.oneOf([
    Category.BRAND,
    Category.DANGER,
    Category.SUCCESS,
    Category.INFO,
    Category.WARNING,
  ]),

  size: PropTypes.oneOf([Size.SMALL, Size.DEFAULT, Size.LARGE]),

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

SteppedProgressBar.defaultProps = {
  size: Size.DEFAULT,
};

export default SteppedProgressBar;
