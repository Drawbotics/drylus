import sv, { fade } from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Category, Color, Size, Tier } from '../enums';
import { OnClickCallback, Responsive, Style } from '../types';
import { colorEnumToCategory, getEnumAsClass, run, useResponsiveProps } from '../utils';

const styles = {
  root: css`
    background: ${sv.neutralLight};
    color: ${sv.colorPrimary};
    border-radius: ${sv.defaultBorderRadius};
    padding: calc(${sv.paddingExtraSmall} * 1.5) ${sv.defaultPadding};
    outline: 0;
    border: 0;
    transition: ${sv.transitionShort};
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:hover {
      cursor: pointer;
      background: ${sv.neutral};
    }

    &:active {
      box-shadow: ${sv.insetActiveMedium};
    }

    &:disabled {
      cursor: not-allowed;
      background: ${sv.neutralLight};
      color: ${sv.colorDisabled};
      box-shadow: none;
    }
  `,
  brand: css`
    background: ${sv.brand};
    color: ${sv.white} !important;

    &:hover {
      background: ${sv.brandDark};
    }

    &:active {
      box-shadow: ${sv.insetActive};
    }

    &:disabled {
      background: ${fade(sv.brand, 40)};
    }
  `,
  danger: css`
    background: ${sv.red};
    color: ${sv.white} !important;

    &:hover {
      background: ${sv.redDark};
    }

    &:active {
      box-shadow: ${sv.insetActive};
    }

    &:disabled {
      background: ${fade(sv.red, 40)};
    }
  `,
  info: css`
    background: ${sv.blue};
    color: ${sv.white} !important;

    &:hover {
      background: ${sv.blueDark};
    }

    &:active {
      box-shadow: ${sv.insetActive};
    }

    &:disabled {
      background: ${fade(sv.blue, 40)};
    }
  `,
  success: css`
    background: ${sv.green};
    color: ${sv.white} !important;

    &:hover {
      background: ${sv.greenDark};
    }

    &:active {
      box-shadow: ${sv.insetActive};
    }

    &:disabled {
      background: ${fade(sv.green, 40)};
    }
  `,
  warning: css`
    background: ${sv.orange};
    color: ${sv.white} !important;

    &:hover {
      background: ${sv.orangeDark};
    }

    &:active {
      box-shadow: ${sv.insetActive};
    }

    &:disabled {
      background: ${fade(sv.orange, 40)};
    }
  `,
  brandAlt: css`
    color: ${sv.brand};

    &:hover {
      color: ${sv.brandDark};
    }

    &:disabled {
      color: ${fade(sv.brand, 40)};
    }
  `,
  dangerAlt: css`
    color: ${sv.red};

    &:hover {
      color: ${sv.redDark};
    }

    &:disabled {
      color: ${fade(sv.red, 40)};
    }
  `,
  warningAlt: css`
    color: ${sv.orange};

    &:hover {
      color: ${sv.orangeDark};
    }

    &:disabled {
      color: ${fade(sv.orange, 40)};
    }
  `,
  infoAlt: css`
    color: ${sv.blue};

    &:hover {
      color: ${sv.blueDark};
    }

    &:disabled {
      color: ${fade(sv.blue, 40)};
    }
  `,
  successAlt: css`
    color: ${sv.green};

    &:hover {
      color: ${sv.greenDark};
    }

    &:disabled {
      color: ${fade(sv.green, 40)};
    }
  `,
  primaryAlt: css`
    color: ${sv.colorPrimary};

    &:hover {
      color: ${sv.colorPrimary};
    }

    &:disabled {
      color: ${sv.colorDisabled};
    }
  `,
  small: css`
    padding: calc(${sv.paddingExtraSmall} - 1px) ${sv.paddingExtraSmall};
    /* font-size: 0.9rem; */
  `,
  large: css`
    padding: ${sv.paddingSmall} ${sv.paddingHuge};
  `,
  secondary: css`
    background: transparent;
    color: ${sv.colorPrimary};
    box-shadow: 0 0 0 1px ${sv.neutral} inset;

    &:hover {
      background: ${sv.neutralLight};
    }

    &:active {
      box-shadow: 0 0 0 1px ${sv.neutral} inset, ${sv.insetActiveLight};
    }

    &:disabled {
      box-shadow: 0 0 0 1px ${sv.neutralLight} inset;
      background: none;
    }
  `,
  tertiary: css`
    background: transparent;
    color: ${sv.blue};

    &:hover {
      background: ${fade(sv.neutral, 50)};
      color: ${sv.blueDark};
    }

    &:active {
      box-shadow: ${sv.insetActiveLight};
    }

    &:disabled {
      background: none;
      color: ${sv.colorDisabled};
    }
  `,
  round: css`
    border-radius: 1000px;
    height: ${sv.marginExtraLarge};
    width: ${sv.marginExtraLarge};
    padding: 0;

    i {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0;
      margin-left: -1px;
      margin-bottom: -1px;
    }
  `,
  roundSmall: css`
    height: ${sv.marginLarge};
    width: ${sv.marginLarge};

    i {
      font-size: 1rem;
      margin-bottom: -1px;
      margin-left: -1px;
    }
  `,
  fullWidth: css`
    width: 100%;
    flex: 1;
  `,
  leading: css`
    margin-right: ${sv.marginExtraSmall};
    height: 0;
    display: flex;
    align-items: center;
  `,
  trailing: css`
    margin-left: ${sv.marginExtraSmall};
    height: 0;
    display: flex;
    align-items: center;
  `,
};

export const buttonStyles = styles;

export interface ButtonProps {
  children?: React.ReactNode;

  /** Disables the button click */
  disabled?: boolean;

  /** Triggered after the button is clicked */
  onClick?: OnClickCallback<HTMLElement>;

  category?: Exclude<Category, Category.PRIMARY>;

  color?: Exclude<Color, Color.PRIMARY>;

  /** @default Size.DEFAULT */
  size?: Extract<Size, Size.SMALL | Size.DEFAULT | Size.LARGE>;

  /** @default Tier.PRIMARY */
  tier?: Tier;

  /** Shown in front of the button text, can be a Spinner or Icon */
  leading?: React.ReactNode;

  /** Shown after the button text, can be a Spinner or Icon */
  trailing?: React.ReactNode;

  /** Makes button take the full width of the container */
  fullWidth?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const Button = ({ responsive, ...rest }: ButtonProps) => {
  const {
    children,
    disabled,
    onClick,
    category: _category,
    size = Size.DEFAULT,
    tier = Tier.PRIMARY,
    leading,
    trailing,
    fullWidth,
    style,
    color,
  } = useResponsiveProps<ButtonProps>(rest, responsive);

  if (!children && trailing && leading) {
    throw new Error('If no children are given, only pass trailing or leading, but not both');
  }

  const round = children == null && (trailing != null || leading != null);

  const category = color ? colorEnumToCategory(color) : _category;

  return (
    <button
      style={style}
      onClick={onClick}
      className={cx(styles.root, {
        [styles[getEnumAsClass<typeof styles>(size)]]: size != null,
        [styles.round]: round === true,
        [styles.roundSmall]: round === true && size === Size.SMALL,
        [styles[getEnumAsClass<typeof styles>(category)]]:
          category != null && tier === Tier.PRIMARY,
        [styles[getEnumAsClass<typeof styles>(tier)]]: tier != null,
        [styles[`${category?.toLowerCase() ?? ''}Alt` as keyof typeof styles]]:
          category != null && tier !== Tier.PRIMARY,
        [styles.fullWidth]: fullWidth === true,
      })}
      disabled={disabled}>
      {run(() => {
        if (leading) {
          return <div className={cx({ [styles.leading]: !round })}>{leading}</div>;
        }
      })}
      {children}
      {run(() => {
        if (trailing) {
          return <div className={cx({ [styles.trailing]: !round })}>{trailing}</div>;
        }
      })}
    </button>
  );
};
