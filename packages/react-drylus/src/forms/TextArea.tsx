import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { forwardRef, useState } from 'react';

import { useThemeColor } from '../base';
import { Icon, RoundIcon, Spinner, placeholderStyles } from '../components';
import { Category, Color, Size } from '../enums';
import { Responsive, Style } from '../types';
import { getEnumAsClass, isFunction, run, useResponsiveProps } from '../utils';
import { Hint } from './Hint';

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
  textarea: css`
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
  valid: css`
    textarea {
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
    textarea {
      box-shadow: inset 0px 0px 0px 2px ${sv.red} !important;
    }
  `,
  hidden: css`
    opacity: 0;
    transform: scale(0);
  `,
  small: css`
    textarea {
      padding: ${sv.paddingExtraSmall} ${sv.paddingExtraSmall};
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
};

export interface TextAreaProps<T = string> {
  /** Value displayed in the field */
  value: ((name?: T) => string | number) | string | number;

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

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error?: string | boolean;

  /** If true the element displays a check icon and a green outline, overridden by "error" */
  valid?: boolean;

  /** If true, a spinner is shown on the right top corner, like with error and valid */
  loading?: boolean;

  /** If true, a loading overlay is displayed on top of the component */
  isPlaceholder?: boolean;

  /** If true the textarea is focused automatically on mount */
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

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;

  /** @private */
  [x: string]: any;
}

export interface RawTextAreaProps<T> extends TextAreaProps<T> {
  inputRef?: React.Ref<HTMLTextAreaElement>;
}

const RawTextArea = <T extends string>({ responsive, ...rest }: RawTextAreaProps<T>) => {
  const {
    value: _value,
    onChange,
    error,
    valid,
    hint,
    disabled,
    inputRef,
    className,
    loading,
    style,
    isPlaceholder,
    size = Size.DEFAULT,
    ...props
  } = useResponsiveProps<RawTextAreaProps<T>>(rest, responsive);
  const themeColor = useThemeColor();

  const [isFocused, setFocused] = useState(false);

  const value = isFunction(_value) ? _value(props.name) : _value;

  const handleOnChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (onChange != null) {
      onChange(
        (e.target as HTMLTextAreaElement).value,
        (e.target as HTMLTextAreaElement).name as T,
      );
    }
  };

  return (
    <div
      style={style}
      className={cx(
        styles.root,
        {
          [styles.valid]: Boolean(value) && valid === true,
          [styles.error]: error != null && error !== false,
          [placeholderStyles.shimmer]: isPlaceholder === true,
          [styles[getEnumAsClass<typeof styles>(size)]]: size != null,
        },
        className,
      )}>
      <div className={styles.outerWrapper}>
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
                  <RoundIcon inversed name="x" size={Size.SMALL} color={Color.RED} />
                </div>
              );
            } else if (Boolean(value) && valid) {
              return (
                <div
                  className={cx(styles.icon, { [styles.hidden]: isFocused })}
                  data-element="icon">
                  <RoundIcon inversed name="check" size={Size.SMALL} color={Color.GREEN} />
                </div>
              );
            }
          })}
          <textarea
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={handleOnChange}
            readOnly={onChange == null}
            className={cx(styles.textarea, {
              [styles[getEnumAsClass<typeof styles>(themeColor)]]: themeColor != null,
            })}
            value={value}
            ref={inputRef}
            {...props}
          />
        </div>
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
export const TextAreaWithRef = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  return <RawTextArea {...props} inputRef={ref} />;
});

TextAreaWithRef.displayName = 'TextArea';

export const TextArea = <T extends string>(props: TextAreaProps<T>) => {
  return <RawTextArea {...props} />;
};
