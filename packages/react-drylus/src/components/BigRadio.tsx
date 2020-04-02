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

interface BigRadioProps {
  /** Determines if the radio is checked */
  checked?: boolean;

  /** Triggered when big radio is clicked */
  onChange: (value: string | number, name?: string) => void;

  /** Determines the value of the radio */
  value: string | number;

  /** Content displayed in the BigRadio */
  children?: React.ReactNode;

  /** Determines the title of the BigRadio */
  label: string;

  /** To mimic e.target.name */
  name?: string;

  /** If true, radio is not clickable */
  disabled?: boolean;

  /** Used for style overrides */
  style?: Style;
}

export const BigRadio = ({
  value,
  onChange,
  disabled,
  checked,
  children,
  name,
  label,
  style,
}: BigRadioProps) => {
  const handleOnChange = () => (!disabled ? onChange(value, name) : null);
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles.checked]: checked,
        [styles.disabled]: disabled,
      })}
      onClick={handleOnChange}>
      <div data-element="header" className={styles.header}>
        <Label>{label}</Label>
        <div data-element="icon">
          <RoundIcon name="check" color={Color.GREEN} />
        </div>
      </div>
      {children}
    </div>
  );
};
