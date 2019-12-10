import React from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/drylus-style-vars';
import PropTypes from 'prop-types';

import Sizes from '../enums/Sizes';
import { useResponsiveProps } from '../utils/hooks';


const TRIGGER_DIMENSIONS = '21px';
const TRIGGER_DIMENSIONS_SMALL = '16px';
const TOGGLE_PADDING = '3px';
const TRIGGER_OFFSET = '10px';


const styles = {
  root: css`
    padding: ${TOGGLE_PADDING};
    background: ${sv.neutral};
    border-radius: ${TRIGGER_DIMENSIONS};
    width: calc(${TRIGGER_DIMENSIONS} * 2 + ${TRIGGER_OFFSET});
    transition: ${sv.defaultTransition};
    overflow: hidden;

    &:hover {
      cursor: pointer;
      background: ${sv.neutralDark};
    }
  `,
  active: css`
    background: ${sv.green} !important;

    & > [data-element="trigger"] {
      transform: translateX(calc(100% + ${TRIGGER_OFFSET} - ${TOGGLE_PADDING} * 2)) !important;
    }
  `,
  trigger: css`
    position: relative;
    height: ${TRIGGER_DIMENSIONS};
    width: ${TRIGGER_DIMENSIONS};
    border-radius: 100%;
    background: ${sv.white};
    transform: translateX(0);
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};

    &::after {
      content: '\\ea29';
      font-family: 'drycons';
      color: ${sv.white};
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: calc(${TRIGGER_DIMENSIONS} * -1);
      pointer-events: none;
    }
  `,
  small: css`
    width: calc(${TRIGGER_DIMENSIONS_SMALL} * 2 + ${TRIGGER_OFFSET});

    & > [data-element="trigger"] {
      height: ${TRIGGER_DIMENSIONS_SMALL};
      width: ${TRIGGER_DIMENSIONS_SMALL};

      &::after {
        left: calc(${TRIGGER_DIMENSIONS_SMALL} * -1.2);
        font-size: 0.9rem;
      }
    }
  `,
  disabled: css`
    opacity: 0.5;

    &:hover {
      cursor: not-allowed;
      background: ${sv.neutral};
    }
  `,
};


const Toggle = ({
  responsive,
  ...rest,
}) => {
  const {
    onChange,
    disabled,
    value,
    size,
    style,
  } = useResponsiveProps(rest, responsive);
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles.active]: value,
        [styles.small]: size === Sizes.SMALL,
        [styles.disabled]: disabled,
      })}
      onClick={() => disabled ? null : onChange(! value)}>
      <div className={styles.trigger} data-element="trigger" />
    </div>
  );
};


Toggle.propTypes = {
  /** Triggered when toggle value is changed */
  onChange: PropTypes.func.isRequired,

  /** If true, toggle is not clickable */
  disabled: PropTypes.bool,

  /** Determines if toggle is active */
  value: PropTypes.bool.isRequired,

  size: PropTypes.oneOf([ Sizes.SMALL, Sizes.DEFAULT ]),

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


export default Toggle;
