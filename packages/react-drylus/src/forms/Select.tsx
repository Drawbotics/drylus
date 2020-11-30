import sv from '@drawbotics/drylus-style-vars';
import { useScreenSize } from '@drawbotics/use-screen-size';
import { css, cx } from 'emotion';
import React, { useEffect, useRef, useState } from 'react';

import { Icon, IconType, RoundIcon, Spinner } from '../components';
import { Category, Color, Shade, Size } from '../enums';
import { Flex, FlexItem, FlexSpacer } from '../layout';
import { Option, Responsive, Style } from '../types';
import { getEnumAsClass, isFunction, run, useResponsiveProps } from '../utils';
import { Hint } from './Hint';

const styles = {
  root: css`
    display: inline-block;
    position: relative;
    width: 100%;

    &::after {
      content: '\\ea33';
      font-family: 'drycons';
      color: ${sv.colorPrimary};
      position: absolute;
      top: calc(${sv.marginExtraSmall} * 1.3);
      font-size: 1.3rem;
      right: ${sv.marginSmall};
      pointer-events: none;
    }
  `,
  hiddenSelect: css`
    height: 1px;
    width: 1px;
    overflow: hidden;
    opacity: 0;
    position: absolute;
  `,
  disabled: css`
    [data-element='select'] {
      cursor: not-allowed;
      background: ${sv.neutralLight};
      color: ${sv.colorDisabled};
      border-color: ${sv.neutralLight};
      box-shadow: none;
      opacity: 1;

      & > div {
        pointer-events: none;
        opacity: 0.6;
      }
    }

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
    letter-spacing: normal;
    max-height: 40px;

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
  valid: css`
    > [data-element='select'] {
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
    > [data-element='select'] {
      box-shadow: inset 0px 0px 0px 2px ${sv.red} !important;
      padding-right: calc(${sv.paddingExtraLarge} + ${sv.defaultPadding});
    }
  `,
  noValue: css`
    > [data-element='select'] {
      color: ${sv.colorSecondary};
    }
  `,
  small: css`
    [data-element='select'] {
      max-height: 30px;
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
    [data-element='select'] {
      padding-right: ${sv.defaultPadding} !important;
    }
  `,
  placeholder: css`
    color: ${sv.colorSecondary};
    user-select: none;
  `,
  value: css`
    display: flex;
    align-items: center;
    justify-content: start;
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
    max-height: 200px;
    overflow: auto;
  `,
  top: css`
    transform: translateY(calc(-100% - 20px - 40px));
  `,
  topOpen: css`
    transform: translateY(calc(-100% - 15px - 40px));
  `,
  topSmall: css`
    transform: translateY(calc(-100% - 20px - 30px));
  `,
  topSmallOpen: css`
    transform: translateY(calc(-100% - 15px - 30px));
  `,
  open: css`
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  `,
  option: css`
    display: flex;
    align-items: center;
    padding: ${sv.paddingExtraSmall} ${sv.paddingSmall};
    color: ${sv.colorPrimary};
    max-height: 32px; /* hardcoded for styling purposes */

    &:hover {
      cursor: pointer;
      background-color: ${sv.neutralLighter};
    }
  `,
  disabledOption: css`
    pointer-events: none;
    color: ${sv.colorDisabled};
  `,
};

function _getShouldRenderTop(box: DOMRect): boolean {
  return box?.bottom > window.innerHeight;
}

export interface SelectOption<T> extends Option<T> {
  disabled?: boolean;
  icon?: IconType;
}

interface NativeSelectProps<T, K = string> {
  options: Array<SelectOption<T>>;
  value?: SelectOption<T>['value'];
  name?: K;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (value: SelectOption<T>['value'], name?: K) => void;
  [x: string]: any;
}

const NativeSelect = <T extends number | string, K extends string>({
  disabled,
  value,
  onChange,
  placeholder,
  options,
  ...props
}: NativeSelectProps<T, K>) => {
  const handleOnChange = (e: React.FormEvent<HTMLSelectElement>) => {
    if (onChange != null) {
      const valueIsNumber = typeof value === 'number';
      const newValue = (e.target as HTMLSelectElement).value;
      onChange(
        (valueIsNumber ? Number(newValue) : newValue) as T,
        (e.target as HTMLSelectElement).name as K,
      );
    }
  };

  return (
    <select
      data-element="select"
      disabled={disabled}
      className={styles.select}
      value={value}
      onChange={handleOnChange}
      {...props}>
      {value == null ? <option key="_placeholder">{placeholder}</option> : null}
      {options.map((option) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

interface CustomSelectProps<T, K = string> extends NativeSelectProps<T, K> {
  size: Size.SMALL | Size.DEFAULT;
}

const CustomSelect = <T extends number | string, K extends string>({
  disabled,
  value,
  onChange,
  placeholder,
  options,
  name,
  size,
}: CustomSelectProps<T, K>) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [canBlur, setCanBlur] = useState(true);

  const optionsPanel = optionsRef.current?.getBoundingClientRect();
  const topRender = optionsPanel ? _getShouldRenderTop(optionsPanel) : false;

  const handleDocumentClick = (e: Event) =>
    !rootRef.current?.contains(e.target as Node) ? setIsFocused(false) : null;

  const handleClickSelect = (e: React.MouseEvent<HTMLElement>) => {
    if (onChange != null) {
      e.preventDefault();
      e.stopPropagation();
      selectRef.current?.focus();
    }
  };

  const handleOnChange = (value: SelectOption<T>['value']) => {
    onChange?.(value, name);
    setIsOpen(false);
  };

  useEffect(() => {
    rootRef.current?.addEventListener('mousedown', () => setCanBlur(false));
    rootRef.current?.addEventListener('mouseup', () => setCanBlur(true));
    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      rootRef.current?.removeEventListener('mousedown', () => setCanBlur(false));
      rootRef.current?.removeEventListener('mouseup', () => setCanBlur(true));
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  const optionsValue = options.find((option) => option.value === value);

  return (
    <div ref={rootRef}>
      <div
        className={cx(styles.select, {
          [styles.active]: isFocused,
        })}
        onClick={handleClickSelect}
        style={{ display: 'flex' }}
        data-element="select">
        {value == null ? (
          <div className={styles.placeholder}>{placeholder}</div>
        ) : (
          <div className={styles.value}>
            <div>
              {optionsValue?.icon != null ? (
                <Icon style={{ marginRight: sv.marginExtraSmall }} name={optionsValue.icon} />
              ) : null}
            </div>
            <div>{optionsValue?.label}</div>
          </div>
        )}
      </div>
      <div ref={optionsRef} className={styles.optionsWrapper}>
        <div
          className={cx(styles.options, {
            [styles.open]: isOpen,
            [styles.top]: topRender,
            [styles.topOpen]: topRender && isFocused,
            [styles.topSmall]: topRender && size === Size.SMALL,
            [styles.topSmallOpen]: topRender && size === Size.SMALL && isFocused,
          })}>
          {options.map((option) => (
            <div
              className={cx(styles.option, {
                [styles.disabledOption]: option.disabled,
              })}
              data-value={option.value}
              key={option.value}
              onClick={() => handleOnChange(option.value)}>
              <Flex style={{ width: '100%' }}>
                {option.icon != null ? (
                  <FlexItem>
                    <Icon name={option.icon} />
                  </FlexItem>
                ) : null}
                <FlexSpacer size={Size.EXTRA_SMALL} />
                <FlexItem flex>{option.label}</FlexItem>
                {option.value === value ? (
                  <FlexItem>
                    <Icon shade={Shade.MEDIUM} name="check" />
                  </FlexItem>
                ) : null}
              </Flex>
            </div>
          ))}
        </div>
      </div>
      <select
        ref={selectRef}
        disabled={disabled}
        className={styles.hiddenSelect}
        defaultValue={value}
        onFocus={() => {
          setIsOpen(true);
          setIsFocused(true);
        }}
        onBlur={
          canBlur
            ? () => {
                setIsFocused(false);
                setIsOpen(false);
              }
            : undefined
        }>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export interface SelectProps<T, K = string> {
  /** The options to show in the list of options */
  options: Array<SelectOption<T>>;

  /** Determines which value is currently active */
  value?: ((name?: K) => SelectOption<T>['value']) | SelectOption<T>['value'];

  /** Name of the form element (target.name) */
  name?: K;

  /** Disables the select */
  disabled?: boolean;

  /**
   * Text shown when no value is selected
   * @default ' -- ''
   */
  placeholder?: string;

  /** Triggered when a new value is chosen, returns a value, key (label, value) pair. If not given, the field is read-only */
  onChange?: (value: SelectOption<T>['value'], name?: K) => void;

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
   * @kind Size
   */
  size?: Size.SMALL | Size.DEFAULT;

  /**
   * If false, the component uses its non-native variant, which allows for icons in the options
   * @default true
   */
  native?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;

  /** @private */
  [x: string]: any;
}

export const Select = <T extends number | string, K extends string>({
  responsive,
  ...rest
}: SelectProps<T, K>) => {
  const {
    value: _value,
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
    native = true,
    ...props
  } = useResponsiveProps<SelectProps<T, K>>(rest, responsive);
  const { screenSize, ScreenSizes } = useScreenSize();

  const value = isFunction(_value) ? _value(props.name) : _value;

  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles.noValue]: value == null,
        [styles.readOnly]: onChange == null,
        [styles.disabled]: disabled === true,
        [styles.valid]: Boolean(value) && valid === true,
        [styles.error]: error != null && error !== false,
        [styles[getEnumAsClass<typeof styles>(size)]]: size != null,
        [styles.smallReadOnly]: onChange == null && size === Size.SMALL,
      })}>
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
        } else if (value && valid) {
          return (
            <div className={styles.icon} data-element="icon">
              <RoundIcon inversed name="check" size={Size.SMALL} color={Color.GREEN} />
            </div>
          );
        }
      })}
      {native || screenSize <= ScreenSizes.XL ? (
        <NativeSelect
          value={value}
          options={options}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          {...props}
        />
      ) : (
        <CustomSelect
          value={value}
          options={options}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          size={size}
          {...props}
        />
      )}
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
