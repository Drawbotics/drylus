import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Category } from '../enums';
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

    &:hover {
      cursor: not-allowed;
      box-shadow: inset 0px 0px 0px 1px ${sv.neutral};

      & [data-element='header'] > div {
        color: ${sv.colorTertiary};
      }
    }
  `,
};

interface BigCheckboxProps {
  /** Triggered when big checkbox is clicked */
  onChange: (value: boolean, name?: string) => void;

  /** Determines if checkbox is checked */
  value: boolean;

  /** Content displayed in the BigRadio */
  children?: React.ReactNode;

  /** Determines the title of the BigCheckbox */
  label: string;

  /** To mimic e.target.name */
  name?: string;

  /** If true, checkbox is not clickable */
  disabled?: boolean;

  /** Used for style overrides */
  style?: Style;
}

export const BigCheckbox = ({
  value,
  onChange,
  disabled,
  children,
  name,
  label,
  style,
}: BigCheckboxProps) => {
  const isChecked = Boolean(value);
  const handleOnChange = () => (!disabled ? onChange(!isChecked, name) : null);
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles.checked]: isChecked,
        [styles.disabled]: disabled,
      })}
      onClick={handleOnChange}>
      <div data-element="header" className={styles.header}>
        <Label>{label}</Label>
        <div data-element="icon">
          <RoundIcon name="check" category={Category.SUCCESS} />
        </div>
      </div>
      {children}
    </div>
  );
};
