import React from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import PropTypes from 'prop-types';


const TRIGGER_DIMENSIONS = '21px';
const SWITCH_PADDING = '3px';
const TRIGGER_OFFSET = '12px';


const styles = {
  root: css`
    padding: ${SWITCH_PADDING};
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
        transform: translateX(3px);
      }
    }
  `,
  active: css`
    background: ${sv.green} !important;

    & > [data-element="trigger"] {
      transform: translateX(calc(100% + ${TRIGGER_OFFSET} / 2)) !important;
    }

    &:active {
      & > [data-element="trigger"] {
        transform: translateX(calc(100% + ${TRIGGER_OFFSET} / 2 - 3px)) !important;
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
      font-size: 1.3rem;
      left: calc((${TRIGGER_DIMENSIONS} + 3px) * -1);
      pointer-events: none;
    }
  `,
};


const Toggle = ({
  onChange,
  disabled,
  value,
}) => {
  return (
    <div className={cx(styles.root, { [styles.active]: value })} onClick={() => onChange(! value)}>
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
};


export default Toggle;
