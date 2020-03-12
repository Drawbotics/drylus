import sv, { fade } from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { forwardRef, useState } from 'react';

import { Button, Icon, RoundIcon, Spinner, placeholderStyles } from '../components';
import { Category, Size } from '../enums';
import { Responsive, Style } from '../types';
import { run, useResponsiveProps } from '../utils';
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
    }

    @media ${sv.screenL} {
      height: ${sv.marginExtraLarge};
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
  prefix: css`
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    margin-right: -1px;

    i {
      font-size: 1.2rem;
    }
  `,
  prefixComponent: css`
    padding: 0;

    select,
    button {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-top-left-radius: ${sv.defaultBorderRadius};
      border-bottom-left-radius: ${sv.defaultBorderRadius};
    }
    select {
      background-color: transparent;
    }
  `,
  suffix: css`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: -1px;

    i {
      font-size: 1.2rem;
    }
  `,
  suffixComponent: css`
    padding: 0;

    select,
    button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: ${sv.defaultBorderRadius};
      border-bottom-right-radius: ${sv.defaultBorderRadius};
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
};

interface InputProps {
  /** Value displayed in the field */
  value: number | string;

  /** Name of the form element (target.name) */
  name?: string;

  /** Disables the input */
  disabled?: boolean;

  /** Text shown when no value is active */
  placeholder?: string;

  /** Triggered when the value is changed (typing). If not given, the field is read-only */
  onChange?: (value: string | number, name?: string) => void;

  /** Small text shown below the box, replaced by error if present */
  hint?: string;

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error?: boolean | string;

  /** If true the element displays a check icon and a green outline, overridden by "error" */
  valid?: boolean;

  /** Node to be rendered in front of the input field, for now limited to text, Button and Select */
  prefix?: React.ReactElement<typeof Button> | React.ReactElement<typeof Select>;

  /** Node to be rendered at the end of the input field, for now limited to text, Button and Select */
  suffix?: React.ReactElement<typeof Button> | React.ReactElement<typeof Select>;

  /** Additional class name to override styles */
  className?: string;

  /** @default 'text' */
  type?: 'text' | 'password' | 'email' | 'tel' | 'url';

  /** If true, a spinner is shown in the right corner, like with error and valid */
  loading?: boolean;

  /** If true, a loading overlay is displayed on top of the component */
  isPlaceholder?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

interface RawInputProps extends InputProps {
  inputRef?: React.Ref<HTMLInputElement>;
  extraLeftPadding?: number;
}

const RawInput = ({ responsive, ...rest }: RawInputProps) => {
  const {
    value,
    onChange,
    error,
    valid,
    hint,
    prefix,
    suffix,
    disabled,
    inputRef,
    className,
    loading,
    style,
    isPlaceholder,
    extraLeftPadding,
    type = 'text',
    ...props
  } = useResponsiveProps<RawInputProps>(rest, responsive);

  const [isFocused, setFocused] = useState(false);

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (onChange != null) {
      onChange((e.target as HTMLInputElement).value, (e.target as HTMLInputElement).name);
    }
  };

  const isPrefixComponent = prefix?.type === Button || prefix?.type === Select;
  const isSuffixComponent = suffix?.type === Button || suffix?.type === Select;
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles.valid]: Boolean(value) && valid,
        [styles.error]: error != null,
        [className as string]: className != null,
        [placeholderStyles.shimmer]: isPlaceholder,
      })}>
      <div className={styles.outerWrapper}>
        {run(() => {
          if (prefix) {
            return (
              <div
                data-element="prefix"
                className={cx(styles.fix, styles.prefix, {
                  [styles.prefixComponent]: isPrefixComponent,
                  [styles.transparentButton]: (prefix?.props as any)?.category == null, // TODO find better
                })}>
                {prefix}
              </div>
            );
          }
        })}
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
                  data-element="icon"
                  style={{ color: sv.colorSecondary }}>
                  <Icon name="lock" />
                </div>
              );
            } else if (error) {
              return (
                <div
                  className={cx(styles.icon, { [styles.hidden]: isFocused })}
                  data-element="icon">
                  <RoundIcon name="x" size={Size.SMALL} category={Category.DANGER} />
                </div>
              );
            } else if (Boolean(value) && valid) {
              return (
                <div
                  className={cx(styles.icon, { [styles.hidden]: isFocused })}
                  data-element="icon">
                  <RoundIcon name="check" size={Size.SMALL} category={Category.SUCCESS} />
                </div>
              );
            }
          })}
          <input
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={handleOnChange}
            readOnly={onChange == null}
            className={cx(styles.input, {
              [styles.straightLeft]: prefix != null,
              [styles.straightRight]: suffix != null,
            })}
            type={type}
            value={value}
            ref={inputRef}
            style={{
              paddingLeft:
                extraLeftPadding != null
                  ? `calc(${sv.paddingSmall} + ${extraLeftPadding}px)`
                  : undefined,
            }}
            {...props}
          />
        </div>
        {run(() => {
          if (suffix) {
            return (
              <div
                data-element="suffix"
                className={cx(styles.fix, styles.suffix, {
                  [styles.suffixComponent]: isSuffixComponent,
                  [styles.transparentButton]: (suffix?.props as any)?.category == null,
                })}>
                {suffix}
              </div>
            );
          }
        })}
      </div>
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

/**
 * forward-ref
 */
export const InputWithRef = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <RawInput {...props} inputRef={ref} />;
});

InputWithRef.displayName = 'Input';

export const Input = (props: InputProps) => {
  return <RawInput {...props} />;
};
