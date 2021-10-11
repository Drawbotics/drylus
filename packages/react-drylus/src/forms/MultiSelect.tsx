import sv from '@drawbotics/drylus-style-vars';
import { useScreenSize } from '@drawbotics/use-screen-size';
import { css, cx } from 'emotion';
import last from 'lodash/last';
import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { useThemeColor } from '../base';
import { Icon, RoundIcon, Spinner, Tag } from '../components';
import { Category, Color, Size } from '../enums';
import { Option, Responsive, Style } from '../types';
import { getEnumAsClass, getIconContent, isFunction, run, useResponsiveProps } from '../utils';
import { Hint } from './Hint';

const defaultHeight = sv.marginExtraLarge;
const smallHeight = sv.marginLarge;

const styles = {
  root: css`
    display: inline-block;
    position: relative;
    width: 100%;

    &::after {
      content: ${getIconContent('chevron-down')};
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
  noChevron: css`
    &::after {
      content: none;
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
      padding-right: ${sv.paddingExtraLarge} !important;
    }

    &::after {
      content: none;
    }

    [data-element='lock-icon'] {
      right: ${sv.marginSmall};
    }
  `,
  active: css`
    box-shadow: inset 0px 0px 0px 2px ${sv.brand} !important;
  `,

  blue: css`
    box-shadow: inset 0px 0px 0px 2px ${sv.blue} !important;
  `,
  red: css`
    box-shadow: inset 0px 0px 0px 2px ${sv.red} !important;
  `,
  orange: css`
    box-shadow: inset 0px 0px 0px 2px ${sv.orange} !important;
  `,
  green: css`
    box-shadow: inset 0px 0px 0px 2px ${sv.green} !important;
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
  optionsWrapper: css`
    position: absolute;
    z-index: 999;
    min-width: 100%;
    pointer-events: none;
  `,
  options: css`
    margin-top: ${sv.marginExtraSmall};
    min-width: 100%;
    background: ${sv.white};
    border-radius: ${sv.defaultBorderRadius};
    border: 1px solid ${sv.azure};
    box-shadow: ${sv.elevation2};
    opacity: 0;
    transform: translateY(-5px);
    pointer-events: none;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
    max-height: 210px;
    overflow: auto;
  `,
  top: css`
    transform: translateY(calc(-100% - 20px - ${defaultHeight}));
  `,
  topOpen: css`
    transform: translateY(calc(-100% - 15px - ${defaultHeight}));
  `,
  topSmall: css`
    transform: translateY(calc(-100% - 20px - ${smallHeight}));
  `,
  topSmallOpen: css`
    transform: translateY(calc(-100% - 15px - ${smallHeight}));
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
  smallValues: css`
    margin-left: -5px;
    margin-bottom: -6px;

    [data-element='value'] {
      margin-right: 2px;
      margin-bottom: 2px;
    }
  `,
  icon: css`
    pointer-events: none;
    position: absolute;
    top: calc(${sv.marginExtraSmall} * 1.5);
    right: calc(${sv.marginSmall} * 2 + ${sv.marginExtraSmall});
  `,
  small: css`
    [data-element='select'] {
      padding: ${sv.paddingExtraSmall} ${sv.paddingExtraSmall};
      padding-right: ${sv.paddingHuge};
    }

    [data-element='placeholder'],
    [data-element='typezone'] {
      margin-bottom: 2px;
    }

    &::after {
      top: ${sv.marginExtraSmall};
      font-size: 1.1em;
      right: ${sv.marginExtraSmall};
    }

    [data-element='icon'] {
      top: ${sv.marginExtraSmall};
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
  placeholder: css`
    color: ${sv.colorSecondary};
    padding: calc(${sv.paddingExtraSmall} / 2) ${sv.paddingExtraSmall};
    margin-bottom: ${sv.marginExtraSmall};
  `,
  smallReadOnly: css`
    [data-element='select'] {
      padding-right: ${sv.defaultPadding} !important;
    }
  `,
  typeZone: css`
    flex: 1;
    margin-right: ${sv.marginExtraSmall};
    margin-bottom: ${sv.marginExtraSmall};

    > input {
      background: none;
      border: none;
      outline: none;
      margin: 0;
      padding: calc(${sv.paddingExtraSmall} / 2) ${sv.paddingExtraSmall};
      color: ${sv.colorPrimary};

      ::placeholder {
        color: ${sv.colorSecondary};
      }
    }
  `,
};

interface TypeZoneProps {
  placeholder?: string;
  onPressEnter: (value: MultiSelectOption<string>) => void;
  onPressDelete: VoidFunction;
}

const TypeZone = forwardRef<HTMLInputElement, TypeZoneProps>(
  ({ placeholder, onPressEnter, onPressDelete }, ref) => {
    const [value, setValue] = useState('');

    const handleSubmit = () => {
      onPressEnter({ value: `${value}_${Math.random()}`, label: value });
      setValue('');
    };

    return (
      <div className={styles.typeZone} data-element="typezone">
        <input
          style={{ width: '100%' }}
          ref={ref}
          value={value}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && value !== '') {
              handleSubmit();
            } else if ((e.key === 'Backspace' || e.key === 'Delete') && value === '') {
              onPressDelete();
            }
          }}
          onBlur={value !== '' ? handleSubmit : undefined}
          onChange={(e: React.FormEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
        />
      </div>
    );
  },
);

function _getShouldRenderTop(box: DOMRect) {
  if (box?.bottom > window.innerHeight) {
    return true;
  }
  return false;
}

export interface MultiSelectOption<T> extends Option<T> {
  disabled?: boolean;
}

export interface MultiSelectProps<T, K = string> {
  /** The options to show in the list of options, note that label and value may differ depending on valueKey and labelKey */
  options: Array<MultiSelectOption<T>>;

  /** Determines which values are currently active */
  values:
    | ((name?: K) => Array<MultiSelectOption<T>['value']>)
    | Array<MultiSelectOption<T>['value']>;

  /** If true, allows the user to type into the multi select to add options. If the `hideOptions` is enabled, then the dropdown will not open when in focus */
  allowTyping?: boolean;

  /** Used in conjunction with `allowTyping`. If true, the dropdown with the options will not be shown. When this is true, if a tag is removed, the option is also deleted from the list to avoid duplicates */
  hideOptions?: boolean;

  /** When using `allowTyping`, pass the function to modify the `options` array prop. Returns the new array of `options` on add/remove */
  onChangeOptions?: (value: Array<MultiSelectOption<T | string>>, name?: K) => void;

  /**
   *  When using `allowTyping` you may set a different placeholder to what is shown when no values are displayed
   * @default 'Add option...'
   */
  typeZonePlaceholder?: string;

  /** Name of the form element (target.name) */
  name?: K;

  /** Disables the multi select */
  disabled?: boolean;

  /**
   * Text shown when no value is selected
   * @default ' -- '
   */
  placeholder?: string;

  /** Triggered when a new value is chosen, returns the array of selected values. If not given, the field is read-only */
  onChange?: (value: Array<MultiSelectOption<T>['value']>, name?: K) => void;

  /** Small text shown below the box, replaced by error if present */
  hint?: string;

  /** Used to trigger validation after an user switches inputs */
  validate?: (name?: K) => void;

  /** Error text (or function that returns an error text) to prompt the user to act, or a boolean if you don't want to show a message */
  error?: boolean | string | ((name?: K) => string | undefined);

  /** If true the element displays a check icon and a green outline, overridden by "error" */
  valid?: boolean;

  /** If true, a spinner is shown on the right corner, like with error and valid */
  loading?: boolean;

  /** If true the select is focused automatically on mount */
  autoFocus?: boolean;

  /**
   * If false, the multi select will not change to native on mobile devices
   * @default 'true'
   */
  native?: boolean;

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

export const MultiSelect = <T extends any, K extends string>({
  responsive,
  ...rest
}: MultiSelectProps<T, K>) => {
  const {
    values: _values,
    options = [],
    onChange,
    placeholder = ' -- ',
    disabled,
    hint,
    error: _error,
    valid,
    name,
    loading,
    style,
    autoFocus,
    size = Size.DEFAULT,
    allowTyping,
    hideOptions,
    onChangeOptions,
    typeZonePlaceholder = 'Add option...',
    className,
    native = true,
    validate,
    ...props
  } = useResponsiveProps<MultiSelectProps<T, K>>(rest, responsive);
  const error = typeof _error === 'function' ? _error(name) : _error

  const selectRef = useRef<HTMLSelectElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const [canBlur, setCanBlur] = useState(true);
  const { screenSize, ScreenSizes } = useScreenSize();
  const themeColor = useThemeColor();

  const values = isFunction(_values) ? _values(name) : _values;
  const hideDropdown = hideOptions === true && allowTyping === true;

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

  const handleOnChange = (value: MultiSelectProps<T, K>['value']) => {
    if (onChange != null) {
      values.includes(value)
        ? onChange(
            values.filter((v) => v !== value),
            name,
          )
        : onChange([...values, value], name);
    }
  };

  const optionsPanel = optionsRef.current?.getBoundingClientRect();
  const topRender = optionsPanel ? _getShouldRenderTop(optionsPanel) : false;

  // used for mobile
  const handleSelectChange = (options: HTMLOptionsCollection) => {
    const selected = [].filter.call(options, (o: any) => o.selected).map((o: any) => o.value);
    if (onChange != null) {
      onChange(selected, name);
    }
  };

  const handleClickSelect = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (allowTyping) {
      inputRef.current?.focus();
      setIsFocused(true);
    } else {
      selectRef.current?.focus();
    }
  };

  const handleClickRemove = (value: string | number) => {
    if (onChange != null) {
      onChange(
        values.filter((v) => v !== value),
        name,
      );
    }
  };

  const handleRemoveTag = (value: MultiSelectOption<T>['value']) => {
    handleClickRemove(value);
    if (hideOptions && allowTyping) {
      onChangeOptions?.(options.filter((v) => v.value !== value));
      inputRef.current?.focus();
    }
  };

  const handlePressEnter = (option: MultiSelectOption<string>) => {
    onChangeOptions?.([...options, option]);
    handleOnChange(option.value);
    inputRef.current?.focus();
  };

  const handlePressDelete = () => {
    const lastValue = last(values);
    if (lastValue != null) {
      handleRemoveTag(lastValue);
    }
  };

  return (
    <div
      style={style}
      className={cx(
        styles.root,
        {
          [styles.disabled]: disabled === true,
          [styles.readOnly]: onChange == null,
          [styles.valid]: values?.length > 0 && valid === true,
          [styles.error]: error != null && error !== false,
          [styles[getEnumAsClass<typeof styles>(size)]]: size != null,
          [styles.smallReadOnly]: onChange == null && size === Size.SMALL,
          [styles.noChevron]: hideDropdown,
        },
        className,
      )}
      ref={rootRef}>
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
            <div className={styles.icon} data-element="icon">
              <RoundIcon inversed name="x" size={Size.SMALL} color={Color.RED} />
            </div>
          );
        } else if (values?.length > 0 && valid) {
          return (
            <div className={styles.icon} data-element="icon">
              <RoundIcon inversed name="check" size={Size.SMALL} color={Color.GREEN} />
            </div>
          );
        }
      })}
      <div
        data-element="select"
        className={cx(styles.select, {
          [styles.active]: isFocused,
          [styles[getEnumAsClass<typeof styles>(themeColor)]]: themeColor != null && isFocused,
        })}
        onClick={onChange != null ? handleClickSelect : undefined}>
        <div className={cx(styles.values, { [styles.smallValues]: size === Size.SMALL })}>
          {values?.length === 0 && !allowTyping ? (
            <div className={styles.placeholder} data-element="placeholder">
              {placeholder}
            </div>
          ) : null}
          {values?.map((value) => (
            <div key={value} className={styles.value} data-element="value">
              <Tag
                inversed
                onClickRemove={(e) => {
                  e.stopPropagation();
                  handleRemoveTag(value);
                }}>
                {String((options.find((option) => option.value === value) ?? {}).label)}
              </Tag>
            </div>
          ))}
          {allowTyping === true ? (
            <TypeZone
              ref={inputRef}
              placeholder={values?.length === 0 ? placeholder : typeZonePlaceholder}
              onPressEnter={handlePressEnter}
              onPressDelete={handlePressDelete}
            />
          ) : null}
        </div>
      </div>
      {run(() => {
        if ((!native || screenSize > ScreenSizes.XL) && !hideDropdown) {
          return (
            <div ref={optionsRef} className={styles.optionsWrapper}>
              <div
                className={cx(styles.options, {
                  [styles.open]: isFocused,
                  [styles.top]: topRender,
                  [styles.topOpen]: topRender && isFocused,
                  [styles.topSmall]: topRender && size === Size.SMALL,
                  [styles.topSmallOpen]: topRender && size === Size.SMALL && isFocused,
                })}>
                {options.map((option) => (
                  <div
                    className={cx(styles.option, {
                      [styles.disabledOption]: option.disabled || values.includes(option.value),
                    })}
                    data-value={option.value}
                    key={option.value}
                    onClick={onChange != null ? () => handleOnChange(option.value) : undefined}>
                    {option.label}
                  </div>
                ))}
              </div>
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
        onBlur={() => {
          if(canBlur) {
            setIsFocused(false)
            validate && validate(name)
          }
        }}
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
