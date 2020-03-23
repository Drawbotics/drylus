import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { useEffect, useRef, useState } from 'react';

import { Icon } from '../components';
import { Responsive, Style } from '../types';
import { run, useResponsiveProps } from '../utils';
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

export interface NumberInputProps {
  /** Value displayed in the field */
  value: number | '-' | '';

  /** Name of the form element (target.name) */
  name?: string;

  /** Disables the countbox */
  disabled?: boolean;

  /** Text shown when no value is active */
  placeholder?: string;

  /** Triggered when the value is changed (typing or clicking +/-). If not given, the field is read-only */
  onChange?: (v: NumberInputProps['value'], name?: string) => void;

  /** Small text shown below the box, replaced by error if present */
  hint?: string;

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error?: string | boolean;

  /** If true the element displays a check icon and a green outline, overridden by "error" */
  valid?: boolean;

  /** Use if you want to modify the way you display the value (string operations only) */
  renderValue?: (v: NumberInputProps['value']) => string;

  /**
   * Limits the max value
   * @default Infinity
   */
  max?: number;

  /**
   * Limits the min value
   * @default -Infinity
   */
  min?: number;

  /**
   * If true, the counter arrows to increase/decrease are shown
   * @default true
   */
  withCounter?: boolean;

  /** If true, a spinner is shown on the right corner, like with error and valid */
  loading?: boolean;

  /**
   * The amount by which the value is increased or decresed
   * @default 1
   */
  step?: number;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const NumberInput = ({ responsive, ...rest }: NumberInputProps) => {
  const {
    value: rawValue,
    placeholder,
    disabled,
    onChange,
    hint,
    error,
    valid,
    renderValue,
    max = Infinity,
    min = -Infinity,
    name,
    withCounter = true,
    loading,
    style,
    step = 1,
  } = useResponsiveProps(rest, responsive);
  const inputRef = useRef<HTMLInputElement>(null);
  const leftSpanRef = useRef<HTMLSpanElement>(null);
  const [extraLeftPadding, setExtraLeftPadding] = useState<number>();

  const handleInputOnChange = (v: NumberInputProps['value']) => {
    const numericalValue = Number(v);

    if (onChange != null) {
      if (v === '-' || v === '') {
        onChange(v, name);
      } else if (numericalValue === 0 || numericalValue) {
        const finalValue = numericalValue > max ? max : numericalValue < min ? min : numericalValue;
        onChange(finalValue, name);
      }
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
      setExtraLeftPadding(undefined);
    }
  }, [rawValue]);

  const decimalPlaces = (String(step).split('.')[1] || []).length;

  return (
    <div style={style} className={styles.root}>
      {run(() => {
        if (renderValue != null && (value === 0 || value)) {
          const sections = renderValue(value).split(String(value));
          return (
            <span className={styles.renderedValue}>
              <span ref={leftSpanRef}>{sections[0]}</span>
              <span className={styles.value}>{value}</span>
              <span>{sections[1]}</span>
            </span>
          );
        }
      })}
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
                  const res = (Number(value) ?? 0) + step;
                  if (!disabled && value < max) {
                    onChange(
                      Number.isInteger(res) ? res : Number(res.toFixed(decimalPlaces)),
                      name,
                    );
                  }
                }}>
                <Icon name="plus" bold />
              </button>
              <button
                className={styles.button}
                onClick={() => {
                  const res = (Number(value) ?? 0) - step;
                  if (!disabled && value > min) {
                    onChange(
                      Number.isInteger(res) ? res : Number(res.toFixed(decimalPlaces)),
                      name,
                    );
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
