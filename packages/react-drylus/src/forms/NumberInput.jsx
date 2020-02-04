import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import Icon from '../components/Icon';
import { useResponsiveProps } from '../utils/hooks';
import { InputWithRef } from './Input';

const styles = {
  root: css`
    position: relative;
    display: inline-block;
    width: 100%;

    & [data-element='suffix'] {
      padding: 0;
      align-items: stretch;
      overflow: hidden;
    }
  `,
  numberInput: css`
    & [type='number'] {
      &::-webkit-outer-spin-button {
        appearance: none;
        margin: 0;
      }
      &::-webkit-inner-spin-button {
        appearance: none;
        margin: 0;
      }
    }
  `,
  buttons: css`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
  button: css`
    flex: 1;
    padding: 0 ${sv.paddingSmall};
    display: flex;
    align-items: center;
    transition: ${sv.transitionShort};
    border: none;

    &:hover {
      cursor: pointer;
      background: ${sv.azure};
    }

    &:focus {
      outline: none;
    }

    &:active {
      box-shadow: ${sv.insetActiveMedium};
    }

    & > i {
      font-size: 1rem;
    }
  `,
  disabled: css`
    > button {
      background: ${sv.neutralLight};
      color: ${sv.colorDisabled};
      border-color: ${sv.neutralLight};
      color: ${sv.colorDisabled};

      &:hover {
        cursor: not-allowed;
        background: ${sv.neutralLight};
      }

      &:active {
        box-shadow: none;
      }
    }
  `,
  renderedValue: css`
    position: absolute;
    top: 12px;
    left: ${sv.marginSmall};
    z-index: 9;
    color: red;
    letter-spacing: normal;
    white-space: nowrap;
    max-width: calc(100% - 65px);
    text-overflow: ellipsis;
    overflow: hidden;
    color: ${sv.colorSecondary};
    pointer-events: none;
  `,
  value: css`
    color: transparent;
  `,
};

const NumberInput = ({ responsive, ...rest }) => {
  const {
    value: rawValue,
    placeholder,
    disabled,
    onChange,
    hint,
    error,
    valid,
    renderValue,
    max,
    min,
    name,
    withCounter,
    loading,
    style,
    step,
  } = useResponsiveProps(rest, responsive);
  const inputRef = useRef(null);
  const leftSpanRef = useRef(null);
  const [extraLeftPadding, setExtraLeftPadding] = useState(null);

  const handleInputOnChange = (v) => {
    const numericalValue = Number(v);

    if (v === '-' || v === '') {
      onChange(v, name);
    } else if (numericalValue === 0 || numericalValue) {
      const finalValue = numericalValue > max ? max : numericalValue < min ? min : numericalValue;
      onChange(finalValue, name);
    }
  };

  const value = rawValue === '-' || rawValue === '' ? rawValue : Number(rawValue);

  if (value !== '-' && value !== '' && value !== 0 && !value) {
    console.warn('Only numbers allowed as value for NumberInput');
  }

  useEffect(() => {
    if (value === 0 || value) {
      setExtraLeftPadding(leftSpanRef.current?.getBoundingClientRect()?.width);
    } else if (value === '' || value == null) {
      setExtraLeftPadding(null);
    }
  }, [rawValue]);

  const decimalPlaces = (String(step).split('.')[1] || []).length;

  return (
    <div style={style} className={styles.root}>
      {do {
        if (renderValue != null && (value === 0 || value)) {
          const sections = renderValue(value).split(value);
          return (
            <span className={styles.renderedValue}>
              <span ref={leftSpanRef}>{sections[0]}</span>
              <span className={styles.value}>{value}</span>
              <span>{sections[1]}</span>
            </span>
          );
        }
      }}
      <InputWithRef
        ref={inputRef}
        error={error}
        hint={hint}
        valid={valid}
        loading={loading}
        onChange={onChange != null ? handleInputOnChange : null}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        name={name}
        type="number"
        max={max}
        min={min}
        step={String(step)}
        inputMode="numeric"
        className={styles.numberInput}
        extraLeftPadding={extraLeftPadding}
        suffix={
          withCounter && onChange != null ? (
            <div className={cx(styles.buttons, { [styles.disabled]: disabled })}>
              <button
                className={styles.button}
                onClick={() => {
                  const res = (value || 0) + step;
                  if (!disabled && value < max) {
                    onChange(Number.isInteger(res) ? res : res.toFixed(decimalPlaces), name);
                  }
                }}>
                <Icon name="plus" bold />
              </button>
              <button
                className={styles.button}
                onClick={() => {
                  const res = (value || 0) - step;
                  if (!disabled && value > min) {
                    onChange(Number.isInteger(res) ? res : res.toFixed(decimalPlaces), name);
                  }
                }}>
                <Icon name="minus" bold />
              </button>
            </div>
          ) : null
        }
      />
    </div>
  );
};

NumberInput.propTypes = {
  /** Value displayed in the field */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['-', ''])]).isRequired,

  /** Name of the form element (target.name) */
  name: PropTypes.string,

  /** Disables the countbox */
  disabled: PropTypes.bool,

  /** Text shown when no value is active */
  placeholder: PropTypes.string,

  /** Triggered when the value is changed (typing or clicking +/-). If not given, the field is read-only */
  onChange: PropTypes.func,

  /** Small text shown below the box, replaced by error if present */
  hint: PropTypes.string,

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  /** If true the element displays a check icon and a green outline, overridden by "error" */
  valid: PropTypes.bool,

  /** Use if you want to modify the way you display the value (string operations only) */
  renderValue: PropTypes.func,

  /** Limits the max value */
  max: PropTypes.number,

  /** Limits the min value */
  min: PropTypes.number,

  /** If true, the counter arrows to increase/decrease are shown */
  withCounter: PropTypes.bool,

  /** If true, a spinner is shown on the right corner, like with error and valid */
  loading: PropTypes.bool,

  /** Used for style overrides */
  style: PropTypes.object,

  /** The amount by which the value is increased or decresed */
  step: PropTypes.number,

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

NumberInput.defaultProps = {
  min: -Infinity,
  max: Infinity,
  withCounter: true,
  step: 1,
};

export default NumberInput;
