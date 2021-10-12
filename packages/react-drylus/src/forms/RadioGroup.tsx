import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';
import { v4 } from 'uuid';

import { Icon, placeholderStyles } from '../components';
import { Category, Size } from '../enums';
import { Option, Responsive, Style } from '../types';
import { isFunction, run, useResponsiveProps } from '../utils';
import { Hint } from './Hint';

const styles = {
  radioGroup: css`
    display: inline-block;
  `,
  radioWrapper: css`
    margin-bottom: ${sv.marginExtraSmall};
  `,
  largeRadioWrapper: css`
    margin-bottom: ${sv.marginSmall};
  `,
  radioWrapperHorizontal: css`
    margin-bottom: 0;
    margin-right: ${sv.marginLarge};

    &:last-of-type {
      margin-right: 0;
    }
  `,
  largeRadioWrapperHorizontal: css`
    margin-bottom: 0;
    margin-right: ${sv.marginExtraLarge};

    &:last-of-type {
      margin-right: 0;
    }
  `,
  root: css`
    position: relative;
    display: inline-block;
  `,
  wrapper: css`
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;

    &:hover {
      [data-element='sprite'] {
        background: ${sv.neutralDark};
      }
    }
  `,
  disabled: css`
    cursor: not-allowed !important;

    > label {
      cursor: not-allowed !important;
      color: ${sv.colorDisabled};
    }
  `,
  readOnly: css`
    pointer-events: none;

    [data-element='sprite'] {
      background: ${sv.neutralLight} !important;
    }

    [data-element='locked-icon'] {
      transform: scale(1);
      border-radius: 0;
      background: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${sv.colorSecondary};

      > i {
        font-size: 0.7rem !important;
      }
    }
  `,
  error: css`
    [data-element='sprite'] {
      box-shadow: inset 0px 0px 0px 2px ${sv.red};
    }

    [data-element='icon'] {
      top: 2px;
      left: 2px;
      height: calc(100% - 4px);
      width: calc(100% - 4px);
      border-radius: 1000px !important;
      line-height: calc(${sv.marginSmall} - 2px);

      > i {
        font-size: 0.7rem;
      }
    }
  `,
  radio: css`
    height: ${sv.marginSmall};
    width: ${sv.marginSmall};
    position: relative;
    overflow: hidden;
  `,
  radioLarge: css`
    height: ${sv.defaultMargin};
    width: ${sv.defaultMargin};

    label {
      line-height: calc(${sv.defaultMargin} + 3px);
    }
  `,
  input: css`
    visibility: hidden;

    &:checked + [data-element='sprite'] {
      [data-element='icon'] {
        transform: scale(1);
        border-radius: 0;
      }
      [data-element='locked-icon'] {
        background: ${sv.green};
        color: ${sv.colorPrimaryInverse};
      }
    }

    &:disabled + [data-element='sprite'] {
      cursor: not-allowed;
      background: ${sv.neutralLight} !important;

      [data-element='icon'] {
        background: ${sv.neutral};
      }
    }
  `,
  label: css`
    margin-left: ${sv.marginExtraSmall};
    color: ${sv.colorPrimary};
    position: relative;

    &:hover {
      cursor: pointer;
    }
  `,
  sprite: css`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 1000px;
    background: ${sv.neutral};
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    transition: ${sv.transitionShort};
    overflow: hidden;
  `,
  iconLabel: css`
    cursor: inherit;
    color: ${sv.white};
    height: 100%;
    width: 100%;
    background: ${sv.green};
    line-height: calc(${sv.marginSmall} + 4px);
    transform: scale(0);
    transition: all ${sv.transitionTimeShort} ${sv.bouncyTransitionCurve};
    border-radius: 100px;

    > i {
      font-size: 0.8rem;
      margin-left: 1px;
    }
  `,
  horizontal: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
};

export interface RadioProps {
  value: string | number;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  size?: Size.DEFAULT | Size.LARGE;
  error: boolean;
  checked: boolean;
  children?: string;
  isPlaceholder?: boolean;
  readOnly: boolean;
  /** @private */
  [x: string]: any;
}

const Radio = ({
  value,
  onChange,
  onBlur,
  disabled,
  error,
  checked,
  children,
  isPlaceholder,
  readOnly,
  size,
  ...rest
}: RadioProps) => {
  const id = v4();
  return (
    <div className={styles.root}>
      <label
        className={cx(styles.wrapper, {
          [styles.disabled]: disabled === true,
          [styles.error]: error,
          [styles.readOnly]: readOnly,
          [placeholderStyles.shimmer]: isPlaceholder === true,
        })}
        htmlFor={id}>
        <div className={cx(styles.radio, { [styles.radioLarge]: size === Size.LARGE })}>
          <input
            disabled={disabled}
            checked={checked}
            value={value}
            id={id}
            type="radio"
            className={styles.input}
            onChange={onChange}
            onBlur={onBlur}
            {...rest}
          />
          <div data-element="sprite" className={styles.sprite}>
            {run(() => {
              if (readOnly) {
                return (
                  <label data-element="locked-icon" className={styles.iconLabel}>
                    <Icon name="lock" />
                  </label>
                );
              } else {
                return (
                  <label data-element="icon" className={styles.iconLabel} htmlFor={id}>
                    <Icon bold name="check" />
                  </label>
                );
              }
            })}
          </div>
        </div>
        {run(() => {
          if (children) {
            return (
              <label data-element="label" className={styles.label} htmlFor={id}>
                {children}
              </label>
            );
          }
        })}
      </label>
    </div>
  );
};

export interface RadioGroupOption<T> extends Option<T> {
  disabled?: boolean;
}

export interface RadioGroupProps<T, K = string> {
  /** Determines the radio components which will be rendered */
  options: Array<RadioGroupOption<T>>;

  /** Name of the form element (target.name) */
  name?: K;

  /** Triggered when radio value is changed */
  onChange?: (value: RadioGroupOption<T>['value'], name?: K) => void;

  /** If true, none of the checkboxes are clickable */
  disabled?: boolean;

  /** Determines which value is currently active */
  value?: ((name?: K) => RadioGroupOption<T>['value']) | RadioGroupOption<T>['value'];

  /**
   * Size of the radios. Can be large or default
   * @default Size.DEFAULT
   * @kind Size
   */
  size?: Size.LARGE | Size.DEFAULT;

  /** If true, form elements will be aligned horizontally */
  horizontal?: boolean;

  /** Used to trigger validation after an user switches inputs */
  validate?: (name?: K) => void;

  /** Error text (or function that returns an error text) to prompt the user to act, or a boolean if you don't want to show a message */
  error?: boolean | string | ((name?: K) => string | undefined);

  /** Small text shown below the group, replaced by error if present */
  hint?: string;

  /** If true, a loading overlay is displayed on top of the component */
  isPlaceholder?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;

  /** @private */
  [x: string]: any;
}

export const RadioGroup = <T extends any, K extends string>({
  responsive,
  ...rest
}: RadioGroupProps<T, K>) => {
  const {
    name,
    value: _value,
    onChange,
    options = [],
    error: _error,
    className,
    hint,
    style,
    size,
    horizontal,
    validate,
    ...props
  } = useResponsiveProps<RadioGroupProps<T, K>>(rest, responsive);
  const error = isFunction(_error) ? _error(name) : _error

  const value = isFunction(_value) ? _value(name) : _value;

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (onChange != null) {
      onChange(
        (e.target as HTMLInputElement).value as any,
        (e.target as HTMLInputElement).name as K,
      );
    }
  };

  const readOnly = onChange == null;

  return (
    <div style={style} className={cx(styles.radioGroup, className)}>
      <div className={horizontal ? styles.horizontal : undefined}>
        {options.map((option) => (
          <div
            key={option.value}
            className={cx(styles.radioWrapper, {
              [styles.radioWrapperHorizontal]: horizontal === true,
              [styles.largeRadioWrapper]: size === Size.LARGE,
              [styles.largeRadioWrapperHorizontal]: size === Size.LARGE && horizontal === true,
            })}>
            <Radio
              name={name}
              readOnly={readOnly}
              error={!!error}
              onChange={handleOnChange}
              onBlur={() => validate?.(name)}
              checked={value == option.value}
              value={option.value}
              disabled={option.disabled}
              size={size}
              {...props}>
              {option.label}
            </Radio>
          </div>
        ))}
      </div>
      {run(() => {
        if (error && typeof error === 'string') {
          return <Hint category={Category.DANGER}>{error}</Hint>;
        } else if (hint != null) {
          return <Hint>{hint}</Hint>;
        }
      })}
    </div>
  );
};
