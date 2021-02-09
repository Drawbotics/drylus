import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { useRef } from 'react';
import { v4 } from 'uuid';

import { Icon } from '../components';
import { placeholderStyles } from '../components';
import { Category, Size } from '../enums';
import { Responsive, Style } from '../types';
import { getEnumAsClass, isFunction, run, useResponsiveProps } from '../utils';
import { Hint } from './Hint';

const styles = {
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
  readOnly: css`
    pointer-events: none;

    [data-element='sprite'] {
      background: ${sv.neutralLight} !important;
    }

    [data-element='locked-icon'] {
      transform: scale(1);
      border-radius: 0;
      background: none;
      color: ${sv.colorSecondary};
    }
  `,
  disabled: css`
    cursor: not-allowed !important;

    > label {
      cursor: not-allowed !important;
      color: ${sv.colorDisabled};
    }

    [data-element='icon'] {
      background: ${sv.neutral};
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
      line-height: calc(${sv.marginSmall} - 4px);

      > i {
        font-size: 0.65rem;
      }
    }
  `,
  checkbox: css`
    height: ${sv.marginSmall};
    width: ${sv.marginSmall};
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
    border-radius: ${sv.borderRadiusSmall};
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
    line-height: calc(${sv.marginSmall} + 2px);
    transform: scale(0);
    transition: all ${sv.transitionTimeShort} ${sv.bouncyTransitionCurve};
    border-radius: 100px;

    > i {
      font-size: 0.8rem;
      margin-left: 1px;
    }
  `,
  large: css`
    > div {
      height: ${sv.defaultMargin};
      width: ${sv.defaultMargin};
    }

    [data-element='icon'],
    [data-element='locked-icon'] {
      line-height: calc(${sv.defaultMargin} + 5px);

      > i {
        font-size: 1rem !important;
      }
    }
  `,
  largeError: css`
    [data-element='icon'] {
      line-height: calc(${sv.defaultMargin} + 2px);
    }
  `,
};

export interface CheckboxProps<T = string> {
  /** The dom property */
  id?: string;

  /** If passed, the text will be the label of the checkbox */
  children?: React.ReactNode;

  /** Triggered when checkbox value is changed */
  onChange?: (value: boolean, name?: T) => void;

  /** If true, checkbox is not clickable */
  disabled?: boolean;

  /** Determines if checkbox is checked */
  value?: ((name?: T) => boolean) | boolean;

  /** Name of the form element (target.name) */
  name?: T;

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error?: string | boolean;

  /**
   * Size of the checkbox. Can be large or default
   * @default Size.DEFAULT
   * @kind Size
   */
  size?: Size.LARGE | Size.DEFAULT;

  /** If true, a loading overlay is displayed on top of the component */
  isPlaceholder?: boolean;

  /** If true, and if the component is checked, the checkmark is replaced by a line to display a "indeterminate" state */
  indeterminate?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;

  /** @private */
  [x: string]: any;
}

export const Checkbox = <T extends string>({ responsive, ...rest }: CheckboxProps<T>) => {
  const {
    onChange,
    value: _value,
    id,
    children,
    disabled,
    error,
    size = Size.DEFAULT,
    style,
    isPlaceholder,
    indeterminate,
    className,
    ...props
  } = useResponsiveProps<CheckboxProps<T>>(rest, responsive);
  const inputRef = useRef<HTMLInputElement>(null);

  const value = isFunction(_value) ? _value(props.name) : _value;
  const isChecked = value === true;

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onChange ? onChange(!isChecked, (e.target as HTMLInputElement).name as T) : null;
  };

  const uniqId = id ? id : v4();
  const readOnly = onChange == null;
  return (
    <div style={style} className={cx(styles.root, className)}>
      <label
        className={cx(styles.wrapper, {
          [styles[getEnumAsClass<typeof styles>(size)]]: size != null,
          [styles.disabled]: disabled === true,
          [styles.error]: error != null && error !== false,
          [styles.largeError]: error != null && error !== false && size === Size.LARGE,
          [styles.readOnly]: readOnly,
          [placeholderStyles.shimmer]: isPlaceholder === true,
        })}
        htmlFor={uniqId}>
        <div className={styles.checkbox}>
          <input
            ref={inputRef}
            disabled={disabled}
            checked={isChecked}
            id={uniqId}
            type="checkbox"
            className={styles.input}
            onChange={handleOnChange}
            readOnly={readOnly}
            {...props}
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
                  <label data-element="icon" className={styles.iconLabel} htmlFor={uniqId}>
                    {<Icon bold name={indeterminate ? 'minus' : 'check'} />}
                  </label>
                );
              }
            })}
          </div>
        </div>
        {run(() => {
          if (children != null) {
            return (
              <label data-element="label" className={styles.label} htmlFor={uniqId}>
                {children}
              </label>
            );
          }
        })}
      </label>
      {run(() => {
        if (error && typeof error === 'string') {
          return <Hint category={Category.DANGER}>{error}</Hint>;
        }
      })}
    </div>
  );
};
