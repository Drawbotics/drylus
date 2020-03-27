import sv from '@drawbotics/drylus-style-vars';
import { useScreenSize } from '@drawbotics/use-screen-size';
import { css, cx } from 'emotion';
import React, { useEffect, useRef, useState } from 'react';

import { Icon, RoundIcon, Spinner, Tag } from '../components';
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
      content: '\\eaac';
      font-family: 'drycons';
      color: ${sv.colorPrimary};
      position: absolute;
      top: calc(${sv.marginExtraSmall} * 1.3);
      font-size: 1.3rem;
      right: ${sv.marginSmall};
      pointer-events: none;
    }

    & select {
      height: 1px;
      width: 1px;
      overflow: hidden;
      opacity: 0;
      position: absolute;
    }
  `,
  select: css`
    background-color: ${sv.azureLight};
    color: ${sv.colorPrimary};
    padding: calc(${sv.paddingExtraSmall} * 1.5) ${sv.paddingSmall};
    padding-right: ${sv.paddingExtraLarge};
    border: none;
    border-radius: ${sv.defaultBorderRadius};
    width: 100%;
    outline: none !important;
    box-shadow: inset 0px 0px 0px 1px ${sv.azure};
    transition: ${sv.transitionShort};
    letter-spacing: normal;

    &:hover {
      box-shadow: inset 0px 0px 0px 1px ${sv.azureDark};
    }
  `,
  readOnly: css`
    pointer-events: none;

    [data-element='select'] {
      box-shadow: none !important;
    }

    &::after {
      content: none;
    }

    [data-element='icon'] {
      right: ${sv.marginSmall};
    }
  `,
  active: css`
    box-shadow: inset 0px 0px 0px 2px ${sv.brand} !important;
  `,
  disabled: css`
    & > [data-element='select'] {
      cursor: not-allowed;
      background: ${sv.neutralLight};
      color: ${sv.colorDisabled};
      border-color: ${sv.neutralLight};
      box-shadow: none;

      & > div {
        pointer-events: none;
        opacity: 0.6;
      }
    }

    &::after {
      color: ${sv.colorDisabled};
    }
  `,
  valid: css`
    > [data-element='select'] {
      box-shadow: inset 0px 0px 0px 2px ${sv.green} !important;
      padding-right: calc(${sv.paddingExtraLarge} + ${sv.defaultPadding});
    }
  `,
  error: css`
    > [data-element='select'] {
      box-shadow: inset 0px 0px 0px 2px ${sv.red} !important;
      padding-right: calc(${sv.paddingExtraLarge} + ${sv.defaultPadding});
    }
  `,
  options: css`
    position: absolute;
    z-index: 999;
    margin-top: ${sv.marginExtraSmall};
    min-width: 100%;
    background: ${sv.white};
    border-radius: ${sv.defaultBorderRadius};
    border: 1px solid ${sv.azure};
    overflow: hidden;
    box-shadow: ${sv.elevation2};
    opacity: 0;
    transform: translateY(-5px);
    pointer-events: none;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
  `,
  open: css`
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  `,
  option: css`
    padding: ${sv.paddingExtraSmall} ${sv.paddingSmall};
    color: ${sv.colorPrimary};

    &:hover {
      cursor: pointer;
      background-color: ${sv.neutralLighter};
    }
  `,
  disabledOption: css`
    pointer-events: none;
    color: ${sv.colorDisabled};
  `,
  value: css`
    margin-right: ${sv.marginExtraSmall};
    margin-bottom: ${sv.marginExtraSmall};
  `,
  values: css`
    display: flex;
    flex-wrap: wrap;
    margin: -4px;
    margin-bottom: -12px;
    margin-left: -8px;
  `,
  icon: css`
    pointer-events: none;
    position: absolute;
    top: calc(${sv.marginExtraSmall} * 1.5);
    right: calc(${sv.marginSmall} * 2 + ${sv.marginExtraSmall});
  `,
  placeholder: css`
    color: ${sv.colorSecondary};
  `,
};

export interface MultiSelectOption<T> extends Option<T> {
  disabled?: boolean;
}

export interface MultiSelectProps<T> {
  /** The options to show in the list of options, note that label and value may differ depending on valueKey and labelKey */
  options: Array<MultiSelectOption<T>>;

  /** Determines which values are currently active */
  values: Array<MultiSelectOption<T>['value']>;

  /** Name of the form element (target.name) */
  name?: string;

  /** Disables the multi select */
  disabled?: boolean;

  /**
   * Text shown when no value is selected
   * @default ' -- ''
   */
  placeholder?: string;

  /** Triggered when a new value is chosen, returns the array of selected values. If not given, the field is read-only */
  onChange?: (value: Array<MultiSelectOption<T>['value']>, name?: string) => void;

  /** Small text shown below the box, replaced by error if present */
  hint?: string;

  /** Error text to prompt the user to act, or a boolean if you don't want to show a message */
  error?: string | boolean;

  /** If true the element displays a check icon and a green outline, overridden by "error" */
  valid?: boolean;

  /** If true, a spinner is shown on the right corner, like with error and valid */
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

export const MultiSelect = <T extends any>({ responsive, ...rest }: MultiSelectProps<T>) => {
  const {
    values,
    options = [],
    onChange,
    placeholder = ' -- ',
    disabled,
    hint,
    error,
    valid,
    name,
    loading,
    style,
    autoFocus,
    ...props
  } = useResponsiveProps<MultiSelectProps<T>>(rest, responsive);

  const selectRef = useRef<HTMLSelectElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [canBlur, setCanBlur] = useState(true);
  const { screenSize, ScreenSizes } = useScreenSize();

  const handleDocumentClick = (e: Event) =>
    !rootRef.current?.contains(e.target as Node) ? setIsFocused(false) : null;

  useEffect(() => {
    rootRef.current?.addEventListener('mousedown', () => setCanBlur(false));
    rootRef.current?.addEventListener('mouseup', () => setCanBlur(true));
    document.addEventListener('mousedown', handleDocumentClick);

    if (autoFocus) {
      setIsFocused(true);
    }

    return () => {
      rootRef.current?.removeEventListener('mousedown', () => setCanBlur(false));
      rootRef.current?.removeEventListener('mouseup', () => setCanBlur(true));
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  const handleOnChange = (value: MultiSelectProps<T>['value']) => {
    if (onChange != null) {
      values.includes(value)
        ? onChange(
            values.filter((v) => v !== value),
            name,
          )
        : onChange([...values, value], name);
    }
  };

  // used for mobile
  const handleSelectChange = (options: HTMLOptionsCollection) => {
    const selected = [].filter.call(options, (o: any) => o.selected).map((o: any) => o.value);
    if (onChange != null) {
      onChange(selected);
    }
  };

  const handleClickSelect = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    selectRef.current?.focus();
  };

  const handleClickRemove = (e: React.MouseEvent<HTMLElement>, value: string | number) => {
    e.stopPropagation();
    if (onChange != null) {
      onChange(values.filter((v) => v !== value));
    }
  };

  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles.disabled]: disabled,
        [styles.readOnly]: onChange == null,
        [styles.valid]: values?.length > 0 && valid,
        [styles.error]: error != null && error !== false,
      })}
      ref={rootRef}>
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
        } else if (values?.length > 0 && valid) {
          return (
            <div className={styles.icon}>
              <RoundIcon name="check" size={Size.SMALL} color={Color.GREEN} />
            </div>
          );
        }
      })}
      <div
        data-element="select"
        className={cx(styles.select, {
          [styles.active]: isFocused,
        })}
        onClick={onChange != null ? handleClickSelect : undefined}>
        {run(() => {
          if (placeholder && values?.length === 0) {
            return <div className={styles.placeholder}>{placeholder}</div>;
          } else {
            return (
              <div className={styles.values}>
                {values.map((value) => (
                  <div key={value} className={styles.value}>
                    <Tag
                      inversed
                      onClickRemove={
                        onChange != null
                          ? (e: React.MouseEvent<HTMLElement>) => handleClickRemove(e, value)
                          : undefined
                      }>
                      {String((options.find((option) => option.value === value) ?? {}).label)}
                    </Tag>
                  </div>
                ))}
              </div>
            );
          }
        })}
      </div>
      {run(() => {
        if (screenSize > ScreenSizes.XL) {
          return (
            <div
              className={cx(styles.options, {
                [styles.open]: isFocused,
              })}>
              {options.map((option) => (
                <div
                  className={cx(styles.option, {
                    [styles.disabledOption]: option.disabled || values.includes(option.value),
                  })}
                  key={option.value}
                  onClick={onChange != null ? () => handleOnChange(option.value) : undefined}>
                  {option.label}
                </div>
              ))}
            </div>
          );
        }
      })}
      {run(() => {
        if (error && typeof error === 'string') {
          return <Hint category={Category.DANGER}>{error}</Hint>;
        } else if (hint) {
          return <Hint>{hint}</Hint>;
        }
      })}
      <select
        disabled={disabled}
        ref={selectRef}
        onChange={onChange != null ? (e) => handleSelectChange(e.target.options) : undefined}
        onFocus={() => setIsFocused(true)}
        onBlur={() => (canBlur ? setIsFocused(false) : null)}
        multiple
        {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
