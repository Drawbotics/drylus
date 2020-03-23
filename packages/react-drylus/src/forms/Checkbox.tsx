import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';
import { v4 } from 'uuid';

import { Icon } from '../components';
import { placeholderStyles } from '../components';
import { Category, Size } from '../enums';
import { Responsive, Style } from '../types';
import { getEnumAsClass, run, useResponsiveProps } from '../utils';
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
  `,
  error: css`
    [data-element='sprite'] {
      box-shadow: inset 0px 0px 0px 2px ${sv.red};
    }

    [data-element='icon'] {
      background: ${sv.red};
    }
  `,
  checkbox: css`
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
    border-radius: ${sv.defaultBorderRadius};
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
  large: css`
    > div {
      height: ${sv.marginLarge};
      width: ${sv.marginLarge};
    }

    [data-element='label'] {
      font-size: 1.1rem;
      margin-left: ${sv.marginSmall};
      top: 0;
    }

    [data-element='icon'],
    [data-element='locked-icon'] {
      line-height: calc(${sv.marginLarge} + 5px);

      > i {
        font-size: 1.2rem !important;
      }
    }
  `,
};

interface CheckboxProps {
  /** The dom property */
  id?: string;

  /** If passed, the text will be the label of the checkbox */
  children?: string;

  /** Triggered when checkbox value is changed */
  onChange?: (value: boolean, name?: string) => void;

  /** If true, checkbox is not clickable */
  disabled?: boolean;

  /** Determines if checkbox is checked */
  value?: boolean;

  /** Name of the form element (target.name) */
  name?: string;

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error?: string | boolean;

  /**
   * Size of the checkbox. Can be large or default
   * @default Size.DEFAULT
   */
  size?: Exclude<
    Size,
    Size.EXTRA_SMALL | Size.SMALL | Size.EXTRA_LARGE | Size.HUGE | Size.EXTRA_HUGE | Size.MASSIVE
  >;

  /** If true, a loading overlay is displayed on top of the component */
  isPlaceholder?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;

  /** @private */
  [x: string]: any;
}

export const Checkbox = ({ responsive, ...rest }: CheckboxProps) => {
  const {
    onChange,
    value,
    id,
    children,
    disabled,
    error,
    size = Size.DEFAULT,
    style,
    isPlaceholder,
    ...props
  } = useResponsiveProps<CheckboxProps>(rest, responsive);

  const isChecked = value === true;

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onChange ? onChange(!isChecked, (e.target as HTMLInputElement).name) : null;
  };

  const uniqId = id ? id : v4();
  const readOnly = onChange == null;
  return (
    <div style={style} className={styles.root}>
      <label
        className={cx(styles.wrapper, {
          [styles[getEnumAsClass<typeof styles>(size)]]: size != null,
          [styles.disabled]: disabled === true,
          [styles.error]: error != null && error !== false,
          [styles.readOnly]: readOnly,
          [placeholderStyles.shimmer]: isPlaceholder,
        })}
        htmlFor={uniqId}>
        <div className={styles.checkbox}>
          <input
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
