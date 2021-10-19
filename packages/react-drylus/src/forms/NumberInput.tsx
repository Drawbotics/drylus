import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { useEffect, useRef, useState } from 'react';

import { Icon } from '../components';
import { Size } from '../enums';
import { Responsive, Style } from '../types';
import { isFunction, run, useResponsiveProps } from '../utils';
import { InputWithRef } from './Input';

const smallHeight = sv.marginLarge;

const styles = {
  root: css`
    position: relative;
    display: inline-block;
    width: 100%;
  `,
  withCounter: css`
    & [data-element='trailing'],
    & [data-element='leading'] {
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
      font-size: 1em;
    }
  `,
  small: css`
    padding: 0 ${sv.paddingExtraSmall};

    i {
      font-size: 0.9em !important;
      margin-bottom: -1px;
    }
  `,
  disabled: css`
    & [data-element='trailing'] {
      button {
        box-shadow: 4px 0px 0px -2px ${sv.neutral} inset;
        background: ${sv.neutralLight} !important;
      }
    }

    & [data-element='leading'] {
      button {
        box-shadow: -4px 0px 0px -2px ${sv.neutral} inset;
        background: ${sv.neutralLight} !important;
      }
    }

    button {
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
    left: calc(${sv.marginSmall} + 48px);
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
  withoutCounter: css`
    left: ${sv.marginSmall};
    max-width: calc(100% - ${sv.marginSmall});
  `,
  smallRenderValue: css`
    top: calc(${sv.marginExtraSmall});
    left: calc(${sv.marginExtraSmall} + ${smallHeight});
  `,
  smallWithoutCounter: css`
    left: ${sv.marginExtraSmall};
  `,
  value: css`
    color: transparent;
  `,
};

type NumberInputValue = number | '-' | '';

export interface NumberInputProps<T = string> {
  /** Value displayed in the field */
  value: ((name?: T) => NumberInputValue) | NumberInputValue;

  /** Name of the form element (target.name) */
  name?: T;

  /** Disables the countbox */
  disabled?: boolean;

  /** Text shown when no value is active */
  placeholder?: string;

  /** Triggered when the value is changed (typing or clicking +/-). If not given, the field is read-only */
  onChange?: (v: NumberInputValue, name?: T) => void;

  /** Small text shown below the box, replaced by error if present */
  hint?: string;

  /** Used to trigger validation after an user switches inputs */
  validate?: (name?: T) => void;

  /** Error text (or function that returns an error text) to prompt the user to act, or a boolean if you don't want to show a message */
  error?: boolean | string | string[] | ((name?: T) => string | string[] | undefined);

  /** If true the element displays a check icon and a green outline, overridden by "error" */
  valid?: boolean;

  /** Use if you want to modify the way you display the value (string operations only) */
  renderValue?: (v: NumberInputValue) => string;

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

  /**
   * Size of the input. Can be small or default
   * @default Size.DEFAULT
   * @kind Size
   */
  size?: Size.SMALL | Size.DEFAULT;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;

  /** @private */
  [x: string]: any;
}

export const NumberInput = <T extends string>({ responsive, ...rest }: NumberInputProps<T>) => {
  const {
    value: _value,
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
    size = Size.DEFAULT,
    className,
    validate,
    ...props
  } = useResponsiveProps<NumberInputProps<T>>(rest, responsive);
  const inputRef = useRef<HTMLInputElement>(null);
  const leftSpanRef = useRef<HTMLSpanElement>(null);
  const [extraLeftPadding, setExtraLeftPadding] = useState<number>();

  const rawValue = isFunction(_value) ? _value(name) : _value;

  const handleInputOnChange = (v: NumberInputValue) => {
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
    <div
      style={style}
      className={cx(
        styles.root,
        {
          [styles.withCounter]: withCounter,
          [styles.disabled]: disabled === true,
        },
        className,
      )}>
      {run(() => {
        if (renderValue != null && (value === 0 || value)) {
          const sections = renderValue(value).split(String(value));
          return (
            <span
              className={cx(styles.renderedValue, {
                [styles.withoutCounter]: withCounter === false,
                [styles.smallRenderValue]: size === Size.SMALL,
                [styles.smallWithoutCounter]: withCounter === false && size === Size.SMALL,
              })}>
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
        validate={validate}
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
        size={size}
        trailing={
          withCounter && onChange != null ? (
            <button
              tabIndex={-1}
              className={cx(styles.button, {
                [styles.small]: size === Size.SMALL,
              })}
              onClick={() => {
                const res = (Number(value) ?? 0) + step;
                if (!disabled && value < max) {
                  onChange(Number.isInteger(res) ? res : Number(res.toFixed(decimalPlaces)), name);
                }
              }}>
              <Icon name="plus" bold />
            </button>
          ) : null
        }
        leading={
          withCounter && onChange != null ? (
            <button
              tabIndex={-1}
              className={cx(styles.button, {
                [styles.small]: size === Size.SMALL,
              })}
              onClick={() => {
                const res = (Number(value) ?? 0) - step;
                if (!disabled && value > min) {
                  onChange(Number.isInteger(res) ? res : Number(res.toFixed(decimalPlaces)), name);
                }
              }}>
              <Icon name="minus" bold />
            </button>
          ) : null
        }
        {...props}
      />
    </div>
  );
};
