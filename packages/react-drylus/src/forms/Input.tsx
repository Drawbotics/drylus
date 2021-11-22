import sv, { fade } from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import get from 'lodash/get';
import React, { forwardRef, useState } from 'react';

import { useThemeColor } from '../base';
import { Button, Icon, RoundIcon, Spinner, placeholderStyles } from '../components';
import { Category, Color, Size } from '../enums';
import { Responsive, Style } from '../types';
import {
  Deprecated,
  ERROR_MESSAGES_JOIN_STRING,
  getEnumAsClass,
  isFunction,
  run,
  useResponsiveProps,
} from '../utils';
import { Hint } from './Hint';
import { Select } from './Select';

const styles = {
  root: css`
    display: inline-block;
    position: relative;
    width: 100%;
  `,
  outerWrapper: css`
    display: flex;
    align-items: stretch;
  `,
  innerWrapper: css`
    position: relative;
    flex: 1;
    z-index: 1;
  `,
  input: css`
    text-overflow: ellipsis;
    background-color: ${sv.azureLight};
    color: ${sv.colorPrimary};
    padding: calc(${sv.paddingExtraSmall} * 1.5) ${sv.paddingSmall};
    border: none;
    border-radius: ${sv.defaultBorderRadius};
    appearance: button;
    outline: none !important;
    box-shadow: inset 0px 0px 0px 1px ${sv.azure};
    transition: ${sv.transitionShort};
    z-index: 1;
    width: 100%;

    &::placeholder {
      color: ${sv.colorSecondary};
    }

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

    &:read-only {
      box-shadow: none !important;
      pointer-events: none;
      padding-right: ${sv.paddingExtraLarge};
    }

    @media ${sv.screenL} {
      height: ${sv.marginExtraLarge};
    }
  `,
  blue: css`
    &:focus {
      box-shadow: inset 0px 0px 0px 2px ${sv.blue} !important;
    }
  `,
  red: css`
    &:focus {
      box-shadow: inset 0px 0px 0px 2px ${sv.red} !important;
    }
  `,
  orange: css`
    &:focus {
      box-shadow: inset 0px 0px 0px 2px ${sv.orange} !important;
    }
  `,
  green: css`
    &:focus {
      box-shadow: inset 0px 0px 0px 2px ${sv.green} !important;
    }
  `,
  straightLeft: css`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  `,
  straightRight: css`
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  `,
  valid: css`
    input {
      box-shadow: inset 0px 0px 0px 2px ${sv.green} !important;
      padding-right: ${sv.paddingExtraLarge};
    }
  `,
  icon: css`
    pointer-events: none;
    position: absolute;
    z-index: 2;
    top: calc(${sv.marginExtraSmall} * 1.5);
    right: ${sv.marginSmall};
    transition: all ${sv.transitionTimeShort} ${sv.bouncyTransitionCurve};
  `,
  error: css`
    input {
      box-shadow: inset 0px 0px 0px 2px ${sv.red} !important;
      padding-right: ${sv.paddingExtraLarge};
    }
  `,
  hidden: css`
    opacity: 0;
    transform: scale(0);
  `,
  fix: css`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${fade(sv.azure, 30)};
    box-shadow: inset 0px 0px 0px 1px ${sv.azure};
    border-radius: ${sv.defaultBorderRadius};
    padding: calc(${sv.paddingExtraSmall} * 1.5);
    color: ${sv.colorPrimary};
  `,
  smallFix: css`
    padding: ${sv.paddingExtraSmall};

    i {
      font-size: 1.1em;
    }
  `,
  leading: css`
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    margin-right: -1px;

    i {
      font-size: 1.2em;
    }
  `,
  leadingComponent: css`
    padding: 0;

    select,
    button {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-top-left-radius: calc(${sv.defaultBorderRadius} - 1px);
      border-bottom-left-radius: calc(${sv.defaultBorderRadius} - 1px);
    }
    button {
      height: calc(${sv.marginExtraLarge} - 2px);
      /* width: calc(100% - 2px); */
      white-space: nowrap;
    }
    select {
      background-color: transparent;
    }
  `,
  trailing: css`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: -1px;

    i {
      font-size: 1.2em;
    }
  `,
  trailingComponent: css`
    padding: 0;

    select,
    button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: calc(${sv.defaultBorderRadius} - 1px);
      border-bottom-right-radius: calc(${sv.defaultBorderRadius} - 1px);
    }
    button {
      height: calc(${sv.marginExtraLarge} - 2px);
      margin-right: 1px;
      white-space: nowrap;
    }
    select {
      background-color: transparent;
    }
  `,
  transparentButton: css`
    button {
      background-color: transparent;
    }
  `,
  buttonWithCategory: css`
    background: none;

    button {
      height: ${sv.marginExtraLarge};
      margin-right: 0px;
      margin-left: 0px;
      white-space: nowrap;
    }
  `,
  buttonWithCategorySmall: css`
    button {
      height: ${sv.marginLarge} !important;
    }
  `,
  small: css`
    input {
      padding: ${sv.paddingExtraSmall} ${sv.paddingExtraSmall};
    }

    button {
      height: calc(${sv.marginLarge} - 2px) !important;
      margin-right: 1px;
      white-space: nowrap;
    }

    [data-element='icon'] {
      top: ${sv.marginExtraSmall};
      right: ${sv.marginExtraSmall};
    }

    [data-element='lock-icon'] {
      top: ${sv.marginExtraSmall};
      right: ${sv.marginExtraSmall};

      > i {
        font-size: 0.95em;
      }
    }
  `,
  smallRightPadding: css`
    input {
      padding-right: ${sv.paddingLarge} !important;
    }
  `,
};

export interface InputProps<T = string> {
  /** Value displayed in the field */
  value: ((name?: T) => number | string) | number | string;

  /** Name of the form element (target.name) */
  name?: T;

  /** Disables the input */
  disabled?: boolean;

  /** Text shown when no value is active */
  placeholder?: string;

  /** Triggered when the value is changed (typing). If not given, the field is read-only */
  onChange?: (value: string | number, name?: T) => void;

  /** Small text shown below the box, replaced by error if present */
  hint?: string;

  /** Used to trigger validation after an user switches inputs */
  validate?: (name?: T) => void;

  /** Error text (or function that returns an error text) to prompt the user to act, or a boolean if you don't want to show a message */
  error?: boolean | string | string[] | ((name?: T) => string | string[] | undefined);

  /** If true the element displays a check icon and a green outline, overridden by "error" */
  valid?: boolean;

  /**
   * Node to be rendered in front of the input field, for now limited to text, Button and Select
   *
   * @deprecated Use `leading` instead
   */
  prefix?:
    | React.ReactElement<typeof Icon>
    | React.ReactElement<typeof Button>
    | React.ReactElement<typeof Select>
    | React.ReactNode;

  /** Node to be rendered in front of the input field, Button and Select are rendered specially */
  leading?:
    | React.ReactElement<typeof Icon>
    | React.ReactElement<typeof Button>
    | React.ReactElement<typeof Select>
    | React.ReactNode;

  /**
   * Node to be rendered at the end of the input field, for now limited to text, Button and Select
   *
   * @deprecated Use `trailing` instead
   */
  suffix?:
    | React.ReactElement<typeof Icon>
    | React.ReactElement<typeof Button>
    | React.ReactElement<typeof Select>
    | React.ReactNode;

  /** Node to be rendered at the end of the input field, Button and Select are rendered specially */
  trailing?:
    | React.ReactElement<typeof Icon>
    | React.ReactElement<typeof Button>
    | React.ReactElement<typeof Select>
    | React.ReactNode;

  /** @default 'text' */
  type?: 'text' | 'password' | 'email' | 'tel' | 'url';

  /** If true, a spinner is shown in the right corner, like with error and valid */
  loading?: boolean;

  /** If true, a loading overlay is displayed on top of the component */
  isPlaceholder?: boolean;

  /** If true the input is focused automatically on mount */
  autoFocus?: boolean;

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

  /** Responsive prop overrides */
  responsive?: Responsive<this>;

  /** @private */
  [x: string]: any;
}

export interface RawInputProps<T> extends InputProps<T> {
  inputRef?: React.Ref<HTMLInputElement>;
  extraLeftPadding?: number;
}

const RawInput = <T extends string>({ responsive, ...rest }: RawInputProps<T>) => {
  const {
    name,
    value: _value,
    onChange,
    error: _error,
    valid,
    hint,
    prefix,
    leading: _leading,
    suffix,
    trailing: _trailing,
    disabled,
    inputRef,
    className,
    loading,
    style,
    isPlaceholder,
    extraLeftPadding,
    type = 'text',
    size = Size.DEFAULT,
    validate,
    ...props
  } = useResponsiveProps<RawInputProps<T>>(rest, responsive);

  const error = isFunction(_error) ? _error(name) : _error;

  const [isFocused, setFocused] = useState(false);
  const themeColor = useThemeColor();

  const value = isFunction(_value) ? _value(name) : _value;

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (onChange != null) {
      onChange((e.target as HTMLInputElement).value, (e.target as HTMLInputElement).name as T);
    }
  };

  const leading = _leading != null ? _leading : prefix;
  const trailing = _trailing != null ? _trailing : suffix;
  const isLeadingComponent = get(leading, 'type') === Button || get(leading, 'type') === Select;
  const isTrailingComponent = get(trailing, 'type') === Button || get(trailing, 'type') === Select;

  return (
    <div
      data-element="input-root"
      style={style}
      className={cx(
        styles.root,
        {
          [styles.valid]: Boolean(value) && valid === true,
          [styles.error]: error != null && error !== false,
          [placeholderStyles.shimmer]: isPlaceholder === true,
          [styles[getEnumAsClass<typeof styles>(size)]]: size != null,
          [styles.smallRightPadding]:
            size === Size.SMALL &&
            ((error != null && error !== false) || (Boolean(value) && valid) || onChange == null),
        },
        className,
      )}>
      <div className={styles.outerWrapper}>
        {leading != null ? (
          <div
            data-element="leading"
            className={cx(styles.fix, styles.leading, {
              [styles.leadingComponent]: isLeadingComponent,
              [styles.transparentButton]: get(leading, 'props')?.category == null, // TODO find better
              [styles.buttonWithCategory]: get(leading, 'props')?.category != null,
              [styles.buttonWithCategorySmall]:
                get(leading, 'props')?.category != null && size === Size.SMALL,
              [styles.smallFix]: size === Size.SMALL && !isLeadingComponent,
            })}>
            {isLeadingComponent && size === Size.SMALL
              ? React.cloneElement(leading as React.ReactElement, { size: Size.SMALL })
              : leading}
          </div>
        ) : null}
        <div className={styles.innerWrapper}>
          {run(() => {
            if (loading) {
              return (
                <div className={styles.icon} data-element="icon">
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
                <div
                  className={cx(styles.icon, { [styles.hidden]: isFocused })}
                  data-element="icon">
                  <RoundIcon bold inversed name="x" size={Size.SMALL} color={Color.RED} />
                </div>
              );
            } else if (Boolean(value) && valid) {
              return (
                <div
                  className={cx(styles.icon, { [styles.hidden]: isFocused })}
                  data-element="icon">
                  <RoundIcon bold inversed name="check" size={Size.SMALL} color={Color.GREEN} />
                </div>
              );
            }
          })}
          <input
            name={name}
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              validate?.(name);
            }}
            onChange={handleOnChange}
            readOnly={onChange == null}
            className={cx(styles.input, {
              [styles.straightLeft]: leading != null,
              [styles.straightRight]: trailing != null,
              [styles[getEnumAsClass<typeof styles>(themeColor)]]: themeColor != null,
            })}
            type={type}
            value={value}
            ref={inputRef}
            style={{
              paddingLeft:
                extraLeftPadding != null
                  ? `calc(${
                      size === Size.SMALL ? sv.paddingExtraSmall : sv.paddingSmall
                    } + ${extraLeftPadding}px)`
                  : undefined,
            }}
            {...props}
          />
        </div>
        {trailing != null ? (
          <div
            data-element="trailing"
            className={cx(styles.fix, styles.trailing, {
              [styles.trailingComponent]: isTrailingComponent,
              [styles.transparentButton]: get(trailing, 'props')?.category == null,
              [styles.buttonWithCategory]: get(trailing, 'props')?.category != null,
              [styles.buttonWithCategorySmall]:
                get(trailing, 'props')?.category != null && size === Size.SMALL,
              [styles.smallFix]: size === Size.SMALL && !isTrailingComponent,
            })}>
            {isTrailingComponent && size === Size.SMALL
              ? React.cloneElement(trailing as React.ReactElement, { size: Size.SMALL })
              : trailing}
          </div>
        ) : null}
      </div>
      {run(() => {
        if (error && typeof error === 'string') {
          return <Hint category={Category.DANGER}>{error}</Hint>;
        } else if (error && Array.isArray(error)) {
          return <Hint category={Category.DANGER}>{error.join(ERROR_MESSAGES_JOIN_STRING)}</Hint>;
        } else if (hint) {
          return <Hint>{hint}</Hint>;
        }
      })}
    </div>
  );
};

RawInput.propTypes = {
  prefix: Deprecated,
  suffix: Deprecated,
};

/**
 * forward-ref
 */
export const InputWithRef = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <RawInput {...props} inputRef={ref} />;
});

InputWithRef.displayName = 'Input';

export const Input = <T extends string>(props: InputProps<T>) => {
  return <RawInput {...props} />;
};
