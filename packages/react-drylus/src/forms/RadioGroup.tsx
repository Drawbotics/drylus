import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';
import { v4 } from 'uuid';

import { Icon, placeholderStyles } from '../components';
import { Category } from '../enums';
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
    }
  `,
  error: css`
    [data-element='sprite'] {
      box-shadow: inset 0px 0px 0px 2px ${sv.red};
    }

    [data-element='icon'] {
      background: ${sv.red};
    }
  `,
  radio: css`
    height: calc(${sv.defaultMargin} - 4px);
    width: calc(${sv.defaultMargin} - 4px);
    position: relative;
    overflow: hidden;
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
        opacity: 0.7;
      }
    }
  `,
  label: css`
    margin-left: ${sv.marginExtraSmall};
    color: ${sv.colorPrimary};
    position: relative;
    top: 1px;

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
    line-height: ${sv.defaultMargin};
    transform: scale(0);
    transition: all ${sv.transitionTimeShort} ${sv.bouncyTransitionCurve};
    border-radius: 100px;

    > i {
      font-size: 0.8rem;
    }
  `,
};

export interface RadioProps {
  value: string | number;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  disabled?: boolean;
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
  disabled,
  error,
  checked,
  children,
  isPlaceholder,
  readOnly,
  ...rest
}: RadioProps) => {
  const id = v4();
  return (
    <div className={styles.root}>
      <label
        className={cx(styles.wrapper, {
          [styles.disabled]: disabled,
          [styles.error]: error,
          [styles.readOnly]: readOnly,
          [placeholderStyles.shimmer]: isPlaceholder,
        })}
        htmlFor={id}>
        <div className={styles.radio}>
          <input
            disabled={disabled}
            checked={checked}
            value={value}
            id={id}
            type="radio"
            className={styles.input}
            onChange={onChange}
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

export interface RadioGroupProps<T> {
  /** Determines the radio components which will be rendered */
  options: Array<RadioGroupOption<T>>;

  /** Name of the form element (target.name) */
  name?: string;

  /** Triggered when radio value is changed */
  onChange?: (value: RadioGroupOption<T>['value'], name?: string) => void;

  /** If true, none of the checkboxes are clickable */
  disabled?: boolean;

  /** Determines which value is currently active */
  value?: ((name?: string) => RadioGroupOption<T>['value']) | RadioGroupOption<T>['value'];

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error?: string | number;

  /** Passed to the wrapper component, to override any styles */
  className?: string;

  /** Small text shown below the group, replaced by error if present */
  hint?: string;

  /** If true, a loading overlay is displayed on top of the component */
  isPlaceholder?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;

  /** @private */
  [x: string]: any;
}

export const RadioGroup = <T extends any>({ responsive, ...rest }: RadioGroupProps<T>) => {
  const {
    value: _value,
    onChange,
    options = [],
    error,
    className,
    hint,
    style,
    ...props
  } = useResponsiveProps<RadioGroupProps<T>>(rest, responsive);

  const value = isFunction(_value) ? _value(props.name) : _value;

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (onChange != null) {
      onChange((e.target as HTMLInputElement).value as any, (e.target as HTMLInputElement).name);
    }
  };

  const readOnly = onChange == null;

  return (
    <div style={style} className={cx(styles.radioGroup, className)}>
      <div>
        {options.map((option) => (
          <div key={option.value} className={styles.radioWrapper}>
            <Radio
              readOnly={readOnly}
              error={!!error}
              onChange={handleOnChange}
              checked={value == option.value}
              value={option.value}
              disabled={option.disabled}
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
