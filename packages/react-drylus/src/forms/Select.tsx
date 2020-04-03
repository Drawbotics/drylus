import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Icon, RoundIcon, Spinner } from '../components';
import { Category, Color, Size } from '../enums';
import { Option, Responsive, Style } from '../types';
import { getEnumAsClass, run, useResponsiveProps } from '../utils';
import { Hint } from './Hint';

const styles = {
  root: css`
    display: inline-block;
    position: relative;
    width: 100%;

    &::after {
      content: '\\ea30';
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

    > select {
      padding-right: ${sv.paddingExtraLarge} !important;
    }

    &::after {
      content: none;
    }

    [data-element='lock-icon'] {
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
      padding-right: calc(${sv.paddingExtraLarge} + ${sv.defaultPadding});
    }
  `,
  noValue: css`
    > select {
      color: ${sv.colorSecondary};
    }
  `,
  small: css`
    select {
      padding: calc(${sv.paddingExtraSmall} - 1px) ${sv.paddingExtraSmall};
      padding-right: ${sv.paddingHuge};
    }

    &::after {
      top: calc(${sv.marginExtraSmall} - 1px);
      font-size: 1.1em;
      right: ${sv.marginExtraSmall};
    }

    [data-element='icon'] {
      top: calc(${sv.marginExtraSmall} - 1px);
      right: ${sv.marginLarge};
    }

    [data-element='lock-icon'] {
      top: ${sv.marginExtraSmall};
      right: ${sv.marginExtraSmall};

      > i {
        font-size: 0.95em;
      }
    }
  `,
  smallReadOnly: css`
    select {
      padding-right: ${sv.defaultPadding} !important;
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

  /**
   * Size of the select. Can be small or default
   * @default Size.DEFAULT
   */
  size?: Size.SMALL | Size.DEFAULT;

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
    size = Size.DEFAULT,
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
        [styles.noValue]: value == null,
        [styles.readOnly]: onChange == null,
        [styles.disabled]: disabled,
        [styles.valid]: Boolean(value) && valid,
        [styles.error]: error != null && error !== false,
        [styles[getEnumAsClass<typeof styles>(size)]]: size != null,
        [styles.smallReadOnly]: onChange == null && size === Size.SMALL,
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
            <div
              className={styles.icon}
              data-element="lock-icon"
              style={{ color: sv.colorSecondary }}>
              <Icon name="lock" />
            </div>
          );
        } else if (error) {
          return (
            <div className={styles.icon} data-element="icon">
              <RoundIcon inversed name="x" size={Size.SMALL} color={Color.RED} />
            </div>
          );
        } else if (value && valid) {
          return (
            <div className={styles.icon} data-element="icon">
              <RoundIcon inversed name="check" size={Size.SMALL} color={Color.GREEN} />
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
