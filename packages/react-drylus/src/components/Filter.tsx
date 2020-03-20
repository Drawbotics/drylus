import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { useEffect, useRef, useState } from 'react';

import { Align } from '../enums';
import { Checkbox } from '../forms';
import { ListTile } from '../layout';
import { Option, Responsive, Style } from '../types';
import { run, useResponsiveProps } from '../utils';
import { Icon } from './Icon';

const styles = {
  root: css`
    position: relative;
    display: inline-block;
  `,
  trigger: css`
    padding: calc(${sv.paddingExtraSmall} * 1.5 - 1px) ${sv.paddingSmall};
    border-radius: ${sv.defaultBorderRadius};
    box-shadow: inset 0 0 0 1px ${sv.neutral};
    color: ${sv.colorSecondary};
    transition: ${sv.transitionShort};
    display: flex;
    align-items: center;

    &:hover {
      cursor: pointer;
      box-shadow: inset 0px 0px 0px 1px ${sv.neutralDark};
      color: ${sv.colorPrimary};
    }

    > i {
      margin-left: 2px;
    }
  `,
  active: css`
    background: ${sv.neutralDarker} !important;
    color: ${sv.white} !important;
    box-shadow: inset 0 0 0 1px ${sv.neutralDarker} !important;
  `,
  panel: css`
    position: absolute;
    z-index: 999;
    top: 100%;
    margin-top: ${sv.marginExtraSmall};
    background: ${sv.white};
    min-width: 180px;
    border-radius: ${sv.defaultBorderRadius};
    border: 1px solid ${sv.azure};
    box-shadow: ${sv.elevation2};
    opacity: 0;
    transform: translateY(-5px);
    pointer-events: none;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
    padding-top: ${sv.paddingExtraSmall};
  `,
  rightAlign: css`
    right: 0;
  `,
  visible: css`
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  `,
  clear: css`
    padding: ${sv.paddingExtraSmall} ${sv.paddingSmall};
    margin: ${sv.marginExtraSmall} 0;
    color: ${sv.blue};
    transition: ${sv.transitionShort};

    &:hover {
      cursor: pointer;
      background: ${sv.neutralLight};
    }
  `,
  option: css`
    display: flex;
    align-items: center;
    padding: 5px ${sv.paddingExtraSmall};
    transition: ${sv.transitionShort};

    &:hover {
      cursor: pointer;
      background: ${sv.neutralLight};
    }
  `,
  smallPadding: css`
    padding: 5px ${sv.paddingSmall};
  `,
  defaultCursor: css`
    &:hover {
      cursor: default;
    }
  `,
  activeOption: css`
    font-weight: 500;
  `,
  label: css`
    flex: 1;
  `,
  fullWidth: css`
    width: 100%;
    flex: 1;

    [data-element='trigger'] {
      justify-content: center;
    }

    [data-element='panel'] {
      width: 100%;
    }
  `,
};

export interface BaseFilterProps {
  /**
   * Text shown in the last row of the panel
   * @default 'Clear'
   */
  clearLabel?: string;

  /** The text shown when the filter is not active, or when more than 1 value is selected */
  label: string;

  /** Triggered when the clear button is clicked */
  onClear?: () => void;

  /** Content displayed within the filter panel */
  children?: React.ReactNode;

  /**
   * Determines on which side the panel is aligned
   * @default Align.RIGHT
   */
  align?: Align.LEFT | Align.RIGHT;

  /** If true, the filter trigger is dark, and the close icon is shown to clear it when clicked */
  active?: boolean;

  /** If true, the filter takes the whole space of the parent */
  fullWidth?: boolean;

  /**
   * If true, the panel closes when clicked
   * @default false
   */
  closeOnClick?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const BaseFilter = ({ responsive, ...rest }: BaseFilterProps) => {
  const {
    clearLabel = 'Clear',
    label,
    children,
    onClear,
    align = Align.RIGHT,
    active,
    style,
    fullWidth,
    closeOnClick = false,
  } = useResponsiveProps<BaseFilterProps>(rest, responsive);

  const panelRef = useRef<HTMLDivElement>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const handleDocumentClick = (e: Event) => {
    // Needs Event because React.MouseEvent<HTMLDivElement> does not match addEventListener signature
    if (!panelRef.current?.contains(e.target as Node) && panelRef.current !== e.target) {
      setPanelOpen(false);
    }
  };

  const handleClickClear = () => {
    setPanelOpen(false);

    if (onClear != null) {
      onClear();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles.fullWidth]: fullWidth,
      })}>
      <div
        data-element="trigger"
        className={cx(styles.trigger, {
          [styles.active]: panelOpen || active,
        })}
        onClick={() => setPanelOpen(!panelOpen)}>
        {label}
        <Icon
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            if (active) {
              e.stopPropagation();
              if (onClear != null) {
                onClear();
              }
            }
          }}
          name={active ? 'x' : panelOpen ? 'chevron-up' : 'chevron-down'}
        />
      </div>
      <div
        ref={panelRef}
        data-element="panel"
        className={cx(styles.panel, {
          [styles.visible]: panelOpen,
          [styles.rightAlign]: align === Align.RIGHT,
        })}
        onClick={closeOnClick === true ? () => setPanelOpen(false) : undefined}>
        <div>{children}</div>
        <div className={styles.clear} onClick={handleClickClear}>
          {clearLabel}
        </div>
      </div>
    </div>
  );
};

export interface SelectFilterOption<T> extends Option<T> {
  /** Shown at the end of the option */
  trailing?: React.ReactNode;

  /** Shown at the beginning of the option */
  leading?: React.ReactNode;
}

export interface SelectFilterProps<T> extends BaseFilterProps {
  /** The items to show in the filter panel: value(string, number), label(string), leading(node), trailing(node) */
  options: Array<SelectFilterOption<T>>;

  /** Determines which value is currently active */
  value?: SelectFilterOption<T>['value'];

  /** Triggered when an option is clicked */
  onChange: (value: SelectFilterOption<T>['value']) => void;

  /** Used for style overrides */
  style?: Style;
}

export const SelectFilter = <T extends any>({
  options,
  value,
  onChange,
  label,
  ...rest
}: SelectFilterProps<T>) => {
  const currentLabel =
    value != null ? options.find((option) => String(option.value) === String(value))?.label : label;
  return (
    <BaseFilter
      {...rest}
      closeOnClick
      label={currentLabel != null ? String(currentLabel) : label}
      active={currentLabel != null && value != null}>
      {options.map((option) => (
        <div
          key={option.value}
          className={cx(styles.option, styles.smallPadding, {
            [styles.activeOption]: String(value) === String(option.value),
          })}
          onClick={() => onChange(option.value)}>
          <div className={styles.label}>
            <ListTile title={option.label} leading={option.leading} />
          </div>
          {run(() => {
            if (option.trailing != null) {
              return option.trailing;
            }
          })}
        </div>
      ))}
    </BaseFilter>
  );
};

function getLabelForCheckboxFilter<T>(
  label: string,
  options: Array<Option<T>>,
  values: Array<Option<T>['value']>,
) {
  if (values == null) {
    return label;
  } else if (values.length === 1) {
    return options.find((option) => String(option.value) === String(values[0]))?.label;
  } else if (values.length > 1) {
    return `${label} (${values.length})`;
  } else {
    return label;
  }
}

export interface CheckboxFilterProps<T> extends BaseFilterProps {
  /** The items to show in the filter panel: value(string, number), label(string) */
  options: Array<Option<T>>;

  /** Determines which values are currently active */
  values?: Array<Option<T>['value']>;

  /** Triggered when an option is clicked. Returns the list of currently selected elements */
  onChange: (values: Array<Option<T>['value']>) => void;

  /** Used for style overrides */
  style?: Style;
}

export const CheckboxFilter = <T extends any>({
  options,
  values = [],
  onChange,
  label,
  ...rest
}: CheckboxFilterProps<T>) => {
  const currentLabel = getLabelForCheckboxFilter(label, options, values);
  return (
    <BaseFilter
      {...rest}
      label={currentLabel != null ? String(currentLabel) : label}
      active={currentLabel != null && values.length > 0}>
      {options.map((option) => (
        <label
          htmlFor={String(option.value)}
          key={option.value}
          className={cx(styles.option, styles.defaultCursor)}>
          <Checkbox
            id={String(option.value)}
            onChange={(checked: boolean) => {
              checked
                ? onChange([...values, option.value])
                : onChange(values.filter((v) => String(v) !== String(option.value)));
            }}
            value={values.includes(option.value)}>
            {String(option.label)}
          </Checkbox>
        </label>
      ))}
    </BaseFilter>
  );
};
