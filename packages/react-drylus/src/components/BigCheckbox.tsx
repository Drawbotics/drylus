import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Color } from '../enums';
import { Style } from '../types';
import { Label } from './Label';
import { RoundIcon } from './RoundIcon';

const styles = {
  root: css`
    border-radius: ${sv.borderRadiusLarge};
    padding: ${sv.paddingSmall};
    box-shadow: inset 0px 0px 0px 1px ${sv.neutral};
    transition: ${sv.transitionShort};

    & [data-element='icon'] {
      transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
      transform: scale(0);

      > div {
        border-radius: ${sv.defaultBorderRadius};
      }
    }

    & [data-element='header'] > div {
      transition: ${sv.transitionShort};
    }

    &:hover {
      cursor: pointer;
      box-shadow: inset 0px 0px 0px 1px ${sv.neutralDark};

      & [data-element='header'] > div {
        color: ${sv.colorSecondary};
      }
    }
  `,
  checked: css`
    box-shadow: inset 0px 0px 0px 2px ${sv.green} !important;

    & [data-element='icon'] {
      transform: scale(1);
    }
  `,
  header: css`
    height: ${sv.defaultMargin};
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${sv.marginExtraSmall};
  `,
  disabled: css`
    opacity: 0.5;
    box-shadow: inset 0px 0px 0px 1px ${sv.neutral} !important;

    & [data-element='header'] > div {
      color: ${sv.colorTertiary} !important;
    }

    &:hover {
      cursor: not-allowed;
    }
  `,
  checkedDisabled: css`
    box-shadow: inset 0px 0px 0px 2px ${sv.neutral} !important;

    & [data-element='icon'] > div {
      background: ${sv.neutral} !important;
    }
  `,
};

export interface BigCheckboxProps<T = string> {
  /** Triggered when big checkbox is clicked */
  onChange: (value: boolean, name?: T) => void;

  /** Determines if checkbox is checked */
  value: boolean;

  /** Content displayed in the BigRadio */
  children?: React.ReactNode;

  /** Determines the title of the BigCheckbox */
  label: string;

  /** To mimic e.target.name */
  name?: T;

  /** If true, checkbox is not clickable */
  disabled?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;
}

export const BigCheckbox = <T extends string>({
  value,
  onChange,
  disabled,
  children,
  name,
  label,
  style,
  className,
}: BigCheckboxProps<T>) => {
  const isChecked = Boolean(value);
  const handleOnChange = () => (!disabled ? onChange(!isChecked, name) : null);
  return (
    <div
      style={style}
      className={cx(
        styles.root,
        {
          [styles.checked]: isChecked,
          [styles.disabled]: disabled === true,
          [styles.checkedDisabled]: isChecked && disabled === true,
        },
        className,
      )}
      onClick={handleOnChange}>
      <div data-element="header" className={styles.header}>
        <Label>{label}</Label>
        <div data-element="icon">
          <RoundIcon inversed name="check" color={Color.GREEN} />
        </div>
      </div>
      {children}
    </div>
  );
};
