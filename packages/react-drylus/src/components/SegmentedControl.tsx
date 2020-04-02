import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Color, Size } from '../enums';
import { Option, Style } from '../types';
import { run } from '../utils';
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

interface SegmentedControlOption extends Option {
  /** If given, the control shows a value in a Badge */
  bullet?: number;

  /** If true, the control is disabled */
  disabled?: boolean;

  /** If true, the control will show a spinner */
  loading?: boolean;
}

interface SegmentedControlProps {
  /** Determines the controls which will be rendered */
  options: Array<SegmentedControlOption>;

  /**
   * Used to pick each value in the options array
   * @default 'value'
   */
  valueKey?: string;

  /**
   * Used to pick each label in the options array
   * @default 'label'
   */
  labelKey?: string;

  /** Determines which value is currently active */
  value: string | number;

  /** Triggered when a control is clicked */
  onChange?: (value: string | number) => void;

  /** Used for style overrides */
  style?: Style;
}

export const SegmentedControl = ({
  value,
  onChange,
  options,
  valueKey = 'value',
  labelKey = 'label',
  style,
}: SegmentedControlProps) => {
  return (
    <div style={style} className={styles.root}>
      {options.map((option) => (
        <div
          key={option[valueKey as keyof Option]}
          className={cx(styles.control, {
            [styles.active]: value === option[valueKey as keyof Option],
            [styles.disabled]: option.disabled,
          })}
          onClick={
            !option.disabled && onChange != null
              ? () => onChange(option[valueKey as keyof Option])
              : undefined
          }>
          <span>{option[labelKey as keyof Option]}</span>
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
