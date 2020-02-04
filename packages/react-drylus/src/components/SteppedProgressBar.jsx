import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';

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

    [data-element='bar'] {
      border-radius: ${sv.marginExtraSmall};
    }
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
    width: 0;
    background: ${sv.neutralDark};
    transition: ${sv.transitionShort};
    overflow: hidden;
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
      {[...Array(steps).keys()].map((id) => (
        <div className={styles.step} key={id}>
          <div
            className={cx(styles.stepChild, {
              [styles.active]: id === activeStep,
              [styles.indeterminate]: indeterminate,
              [styles[getEnumAsClass(category)]]: category,
            })}
            style={{ width: `${percentage * 100}%` }}
            data-element="bar"
          />
        </div>
      ))}
    </div>
  );
};

SteppedProgressBar.propTypes = {
  /** Determines how many steps there are in the bar */
  steps: PropTypes.number.required,

  /** The index of the currenctly active step */
  activeStep: PropTypes.number.required,

  /** If specified the currently active bar has a precise width, should be between 0-1 */
  progress: PropTypes.number,

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
