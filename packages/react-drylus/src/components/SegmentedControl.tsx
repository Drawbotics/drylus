import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { ReactNode } from 'react';

import { Color, Size } from '../enums';
import { Padding } from '../layout';
import { Option, Responsive, Style } from '../types';
import { checkComponentProps, run, useResponsiveProps } from '../utils';
import { Badge } from './Badge';
import { Spinner } from './Spinner';

const styles = {
  root: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${sv.neutralLight};
    padding: 4px 2px;
    border-radius: ${sv.defaultBorderRadius};
  `,
  control: css`
    padding: ${sv.paddingExtraSmall} ${sv.defaultPadding};
    border-radius: calc(${sv.defaultBorderRadius} - 1px);
    white-space: nowrap;
    color: ${sv.colorSecondary};
    margin: 0 2px;
    transition: ${sv.transitionShort};
    position: relative;
    display: flex;

    > * {
      z-index: 1;
    }

    &:hover {
      cursor: pointer;
      background: ${sv.neutral};
      color: ${sv.colorPrimary};
    }

    &::before {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: ${sv.white};
      border-radius: calc(${sv.defaultBorderRadius} - 1px);
      opacity: 0;
      transform: scale(0.2);
      transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
    }
  `,
  active: css`
    &::before {
      opacity: 1;
      transform: scale(1);
    }

    &:hover {
      background: transparent;
    }
  `,
  disabled: css`
    background: none !important;
    color: ${sv.colorDisabled} !important;

    &:hover {
      cursor: not-allowed;
      background: none !important;
    }

    & > [data-element='extra'] {
      opacity: 0.5;
    }
  `,
  extra: css`
    display: inline-block;
    margin-left: ${sv.marginExtraSmall};
  `,
};

interface SegmentedControlItemProps {
  /** Text displayed in the item */
  text: string;

  /** If true, the item is set as active */
  active?: boolean;

  /** If true, the item is not clickable */
  disabled?: boolean;

  /** Triggered when the option is clicked */
  onClick?: VoidFunction;

  /** Component will be displayed on the right side of the item, works best with Spinner or Badge */
  trailing?: ReactNode;

  /** Component will be displayed on the left side of the item, works best with Spinner or Badge */
  leading?: ReactNode;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const SegmentedControlItem = ({ responsive, ...rest }: SegmentedControlItemProps) => {
  const {
    text,
    disabled,
    onClick,
    trailing,
    leading,
    active,
    style,
    className,
  } = useResponsiveProps<SegmentedControlItemProps>(rest, responsive);
  return (
    <div
      style={style}
      className={cx(
        styles.control,
        {
          [styles.active]: active,
          [styles.disabled]: disabled,
        },
        className,
      )}
      onClick={disabled ? undefined : onClick}>
      {leading ? <Padding size={{ right: Size.EXTRA_SMALL }}>{leading}</Padding> : null}
      <span>{text}</span>
      {trailing ? <Padding size={{ left: Size.EXTRA_SMALL }}>{trailing}</Padding> : null}
    </div>
  );
};

export interface SegmentedControlOption<T> extends Option<T> {
  /** If given, the control shows a value in a Badge */
  bullet?: number;

  /** If true, the control is disabled */
  disabled?: boolean;

  /** If true, the control will show a spinner */
  loading?: boolean;
}

export interface SegmentedControlProps<T> {
  /**
   * @deprecated Use SegmentedControl components instead
   * Determines the controls which will be rendered
   */
  options?: Array<SegmentedControlOption<T>>;

  /**
   * @deprecated Use SegmentedControl components instead
   * Determines which value is currently active
   */
  value?: SegmentedControlOption<T>['value'];

  /**
   * @deprecated Use SegmentedControl components instead
   * Triggered when a control is clicked
   */
  onChange?: (value: SegmentedControlOption<T>['value']) => void;

  /** Should be SegmentedControlItem */
  children: ReactNode;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const SegmentedControl = <T extends any>({
  responsive,
  options,
  value,
  onChange,
  ...rest
}: SegmentedControlProps<T>) => {
  const { children, style, className } = useResponsiveProps<
    Omit<SegmentedControlProps<T>, 'options' | 'onChange' | 'value'>
  >(rest, responsive);
  checkComponentProps({ children }, { children: [SegmentedControlItem] });

  return (
    <div style={style} className={cx(styles.root, className)}>
      {options == null || children != null
        ? children
        : // If using deprecated API, still render until removed in next major version
          options.map((option) => (
            <div
              key={option.value}
              className={cx(styles.control, {
                [styles.active]: value === option.value,
                [styles.disabled]: option.disabled === true,
              })}
              onClick={
                !option.disabled && onChange != null ? () => onChange(option.value) : undefined
              }>
              <span>{option.label}</span>
              {run(() => {
                if (option.loading === true) {
                  return (
                    <div data-element="extra" className={styles.extra}>
                      <Spinner size={Size.SMALL} color={Color.BRAND} />
                    </div>
                  );
                } else if (option.bullet != null) {
                  return (
                    <div data-element="extra" className={styles.extra}>
                      <Badge color={Color.BRAND} value={option.bullet} max={99} />
                    </div>
                  );
                }
              })}
            </div>
          ))}
    </div>
  );
};
