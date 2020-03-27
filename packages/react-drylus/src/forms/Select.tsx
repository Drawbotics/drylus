import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Icon, RoundIcon, Spinner } from '../components';
import { Category, Color, Size } from '../enums';
import { Option, Responsive, Style } from '../types';
import { run, useResponsiveProps } from '../utils';
import { Hint } from './Hint';

const styles = {
  root: css`
    display: inline-block;
    position: relative;
    width: 100%;

    &::after {
      content: '\\ea2c';
      font-family: 'drycons';
      color: ${sv.colorPrimary};
      position: absolute;
      top: calc(${sv.marginExtraSmall} * 1.3);
      font-size: 1.3rem;
      right: ${sv.marginSmall};
      pointer-events: none;
    }
  `,
  disabled: css`
    &::after {
      color: ${sv.colorDisabled};
    }
  `,
  select: css`
    background-color: ${sv.azureLight};
    color: ${sv.colorPrimary};
    padding: calc(${sv.paddingExtraSmall} * 1.5) ${sv.paddingSmall};
    padding-right: ${sv.paddingExtraLarge};
    border: none;
    border-radius: ${sv.defaultBorderRadius};
    appearance: none;
    width: 100%;
    outline: none !important;
    box-shadow: inset 0px 0px 0px 1px ${sv.azure};
    transition: ${sv.transitionShort};

    &:hover {
      box-shadow: inset 0px 0px 0px 1px ${sv.azureDark};
    }

    &:focus {
      box-shadow: inset 0px 0px 0px 2px ${sv.brand} !important;
    }

    &:disabled {
      cursor: not-allowed;
      background: ${sv.neutralLight};
      color: ${sv.colorDisabled};
      border-color: ${sv.neutralLight};
      box-shadow: none;
    }
  `,
  readOnly: css`
    box-shadow: none !important;
    pointer-events: none;

    &::after {
      content: none;
    }

    [data-element='icon'] {
      right: ${sv.marginSmall};
    }
  `,
  valid: css`
    > select {
      box-shadow: inset 0px 0px 0px 2px ${sv.green} !important;
      padding-right: calc(${sv.paddingExtraLarge} + ${sv.defaultPadding});
    }
  `,
  icon: css`
    pointer-events: none;
    position: absolute;
    top: calc(${sv.marginExtraSmall} * 1.5);
    right: calc(${sv.marginSmall} * 2 + ${sv.marginExtraSmall});
  `,
  error: css`
    > select {
      box-shadow: inset 0px 0px 0px 2px ${sv.red} !important;
    }
  `,
  noValue: css`
    > select {
      color: ${sv.colorSecondary};
    }
  `,
};

export interface SelectOption<T> extends Option<T> {
  disabled?: boolean;
}

export interface SelectProps<T> {
  /** The options to show in the list of options */
  options: Array<SelectOption<T>>;

  /** Determines which value is currently active */
  value?: SelectOption<T>['value'];

  /** Name of the form element (target.name) */
  name?: string;

  /** Disables the select */
  disabled?: boolean;

  /**
   * Text shown when no value is selected
   * @default ' -- ''
   */
  placeholder?: string;

  /** Triggered when a new value is chosen, returns a value, key (label, value) pair. If not given, the field is read-only */
  onChange?: (value: SelectOption<T>['value'], name?: string) => void;

  /** Small text shown below the box, replaced by error if present */
  hint?: string;

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error?: string | boolean;

  /** If true the element displays a check icon and a green outline, overridden by "error" */
  valid?: boolean;

  /** If true, a spinner is shown in the right corner, like with error and valid */
  loading?: boolean;

  /** If true the select is focused automatically on mount */
  autoFocus?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;

  /** @private */
  [x: string]: any;
}

export const Select = <T extends any>({ responsive, ...rest }: SelectProps<T>) => {
  const {
    value,
    options = [],
    onChange,
    placeholder = ' -- ',
    disabled,
    hint,
    error,
    valid,
    loading,
    style,
    ...props
  } = useResponsiveProps<SelectProps<T>>(rest, responsive);

  const handleOnChange = (e: React.FormEvent<HTMLSelectElement>) => {
    if (onChange != null) {
      onChange((e.target as HTMLSelectElement).value as any, (e.target as HTMLSelectElement).name);
    }
  };
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles.noValue]: !value,
        [styles.readOnly]: onChange == null,
        [styles.disabled]: disabled,
        [styles.valid]: Boolean(value) && valid,
        [styles.error]: error != null && error !== false,
      })}>
      {run(() => {
        if (loading) {
          return (
            <div className={styles.icon}>
              <Spinner size={Size.SMALL} />
            </div>
          );
        } else if (onChange == null) {
          return (
            <div className={styles.icon} data-element="icon" style={{ color: sv.colorSecondary }}>
              <Icon name="lock" />
            </div>
          );
        } else if (error) {
          return (
            <div className={styles.icon}>
              <RoundIcon name="x" size={Size.SMALL} color={Color.RED} />
            </div>
          );
        } else if (value && valid) {
          return (
            <div className={styles.icon}>
              <RoundIcon name="check" size={Size.SMALL} color={Color.GREEN} />
            </div>
          );
        }
      })}
      <select
        disabled={disabled}
        className={styles.select}
        value={value}
        onChange={handleOnChange}
        {...props}>
        {run(() => {
          if (!value) {
            return <option key={options.length}>{placeholder}</option>;
          }
        })}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {run(() => {
        if (error && typeof error === 'string') {
          return <Hint category={Category.DANGER}>{error}</Hint>;
        } else if (hint) {
          return <Hint>{hint}</Hint>;
        }
      })}
    </div>
  );
};
