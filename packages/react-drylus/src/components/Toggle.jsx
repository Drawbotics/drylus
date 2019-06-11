import React from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import PropTypes from 'prop-types';

import Sizes from '../base/Sizes';


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

    &:active {
      & > [data-element="trigger"] {
        transform: translateX(TOGGLE_PADDING);
      }
    }
  `,
  active: css`
    background: ${sv.green} !important;

    & > [data-element="trigger"] {
      transform: translateX(calc(100% + ${TRIGGER_OFFSET} - ${TOGGLE_PADDING} * 2)) !important;
    }

    &:active {
      & > [data-element="trigger"] {
        transform: translateX(calc(100% + ${TRIGGER_OFFSET} - ${TOGGLE_PADDING} * 3)) !important;
      }
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
      content: '\\ea26';
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
};


const Toggle = ({
  onChange,
  disabled,
  value,
  size,
}) => {
  return (
    <div
      className={cx(styles.root, {
        [styles.active]: value,
        [styles.small]: size === Sizes.SMALL,
      })}
      onClick={() => onChange(! value)}>
      <div className={styles.trigger} data-element="trigger" />
    </div>
  );
};


Toggle.propTypes = {
  /** Triggered when toggle value is changed */
  onChange: PropTypes.func,

  /** If true, toggle is not clickable */
  disabled: PropTypes.bool,

  /** Determines if toggle is active */
  active: PropTypes.bool,

  size: PropTypes.oneOf([ Sizes.SMALL, Sizes.DEFAULT ]),
};


export default Toggle;
