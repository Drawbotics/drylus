import sv, { fade } from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Category, Color, Size, Tier } from '../enums';
import { OnClickCallback, Responsive, Style } from '../types';
import { colorEnumToCategory, getEnumAsClass, run, useResponsiveProps } from '../utils';

const defaultHeight = '40px';
const smallHeight = '30px';

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
      color: ${sv.colorDisabled} !important;
      background: ${sv.neutralLight};
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
      color: ${sv.colorDisabled} !important;
      background: ${sv.neutralLight};
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
      color: ${sv.colorDisabled} !important;
      background: ${sv.neutralLight};
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
      color: ${sv.colorDisabled} !important;
      background: ${sv.neutralLight};
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
      color: ${sv.colorDisabled} !important;
      background: ${sv.neutralLight};
    }
  `,
  brandAlt: css`
    color: ${sv.brand};

    &:hover {
      color: ${sv.brandDark};
    }

    &:disabled {
      color: ${sv.colorDisabled};
    }
  `,
  dangerAlt: css`
    color: ${sv.red};

    &:hover {
      color: ${sv.redDark};
    }

    &:disabled {
      color: ${sv.colorDisabled};
    }
  `,
  warningAlt: css`
    color: ${sv.orange};

    &:hover {
      color: ${sv.orangeDark};
    }

    &:disabled {
      color: ${sv.colorDisabled};
    }
  `,
  infoAlt: css`
    color: ${sv.blue};

    &:hover {
      color: ${sv.blueDark};
    }

    &:disabled {
      color: ${sv.colorDisabled};
    }
  `,
  successAlt: css`
    color: ${sv.green};

    &:hover {
      color: ${sv.greenDark};
    }

    &:disabled {
      color: ${sv.colorDisabled};
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
    padding: ${sv.paddingExtraSmall} ${sv.paddingExtraSmall};
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
    height: ${defaultHeight};
    width: ${defaultHeight};
    padding: 0;

    i {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0;
    }
  `,
  roundSmall: css`
    height: ${smallHeight};
    width: ${smallHeight};

    i {
      font-size: 1rem;
      margin-right: 0;
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
  inversed: css`
    color: ${sv.colorPrimaryInverse};
    background: rgba(255, 255, 255, 0.3);
    font-weight: 300;

    &:hover {
      background: rgba(255, 255, 255, 0.4);
    }

    &:active {
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.6) inset;
    }
  `,
  secondaryInversed: css`
    background: transparent;
    box-shadow: 0 0 0 1px ${sv.white} inset;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    &:active {
      box-shadow: 0 0 0 2px ${sv.white} inset;
    }
  `,
  tertiaryInversed: css`
    background: transparent;
    color: ${sv.colorPrimaryInverse};

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      color: ${sv.colorPrimaryInverse};
    }
  `,
  icon: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

export const buttonStyles = styles;

export interface ButtonProps {
  children?: React.ReactNode;

  /** Disables the button click */
  disabled?: boolean;

  /** Triggered after the button is clicked */
  onClick?: OnClickCallback<HTMLElement>;

  /** @kind Category */
  category?: Category.BRAND | Category.SUCCESS | Category.INFO | Category.WARNING | Category.DANGER;

  /** @kind Color */
  color?: Color.BRAND | Color.RED | Color.BLUE | Color.GREEN | Color.ORANGE | Color.PRIMARY;

  /**
   * @default Size.DEFAULT
   * @kind Size
   */
  size?: Size.SMALL | Size.DEFAULT | Size.LARGE;

  /** @default Tier.PRIMARY */
  tier?: Tier;

  /** Shown in front of the button text, can be a Spinner or Icon */
  leading?: React.ReactNode;

  /** Shown after the button text, can be a Spinner or Icon */
  trailing?: React.ReactNode;

  /** Makes button take the full width of the container */
  fullWidth?: boolean;

  /** Used when the button should be rendered on dark backgrounds. Will essentially make all visual elements of the button white for high contrast. Tiers are respected, but category/color is lost */
  inversed?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;

  /** @private */
  [x: string]: any;
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
    inversed,
    type = 'button',
    ...props
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
        [styles.inversed]: inversed === true,
        [styles.secondaryInversed]: inversed === true && tier === Tier.SECONDARY,
        [styles.tertiaryInversed]: inversed === true && tier === Tier.TERTIARY,
      })}
      disabled={disabled}
      type={type}
      {...props}>
      {run(() => {
        if (leading) {
          return <div className={cx(styles.icon, { [styles.leading]: !round })}>{leading}</div>;
        }
      })}
      {children}
      {run(() => {
        if (trailing) {
          return <div className={cx(styles.icon, { [styles.trailing]: !round })}>{trailing}</div>;
        }
      })}
    </button>
  );
};
