import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';

import { Categories, Sizes } from '../base';
import Icon from './Icon';


const styles = {
  root: css`
    background: ${sv.neutralLight};
    color: ${sv.colorPrimary};
    border-radius: ${sv.defaultBorderRadius};
    padding: calc(${sv.paddingExtraSmall} * 1.5) ${sv.defaultPadding};
    outline: 0;
    border: 0;
    transition: ${sv.defaultTransition};
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
      background: ${sv.neutralLight} !important;
      color: ${sv.colorDisabled} !important;
      box-shadow: none;
    }
  `,
  brand: css`
    background: ${sv.brand};
    color: ${sv.white};

    &:hover {
      background: ${sv.brandDark};
    }

    &:active {
      box-shadow: ${sv.insetActive};
    }
  `,
  danger: css`
    background: ${sv.red};
    color: ${sv.white};

    &:hover {
      background: ${sv.redDark};
    }

    &:active {
      box-shadow: ${sv.insetActive};
    }
  `,
  info: css`
    background: ${sv.blue};
    color: ${sv.white};

    &:hover {
      background: ${sv.blueDark};
    }

    &:active {
      box-shadow: ${sv.insetActive};
    }
  `,
  success: css`
    background: ${sv.green};
    color: ${sv.white};

    &:hover {
      background: ${sv.greenDark};
    }

    &:active {
      box-shadow: ${sv.insetActive};
    }
  `,
  warning: css`
    background: ${sv.orange};
    color: ${sv.white};

    &:hover {
      background: ${sv.orangeDark};
    }

    &:active {
      box-shadow: ${sv.insetActive};
    }
  `,
  small: css`
    padding: ${sv.paddingExtraSmall} ${sv.paddingExtraSmall};
    font-size: 0.9rem;
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
      box-shadow: ${sv.insetActiveLight};
    }
  `,
  tertiary: css`
    background: transparent;
    color: ${sv.blue};

    &:hover {
      background: ${sv.neutralLight};
      color: ${sv.blueDark};
    }

    &:active {
      box-shadow: ${sv.insetActiveLight};
    }
  `,
  rightIcon: css`
    > i {
      margin-top: -2px;
      margin-left: 4px;
    }
  `,
  leftIcon: css`
    > i {
      margin-top: -2px;
      margin-right: 4px;
    }
  `,
  iconOnly: css`
    border-radius: 1000px;
    height: ${sv.marginExtraLarge};
    width: ${sv.marginExtraLarge};
    padding: 0;

    > i {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0;
      margin-left: 0;
      margin-bottom: -3px;
    }
  `,
  smallIcon: css`
    height: ${sv.marginLarge};
    width: ${sv.marginLarge};

    > i {
      font-size: 1rem;
      margin-bottom: -3px;
    }
  `,
};


export const ButtonTiers = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
  TERTIARY: 'TERTIARY',
};


const Button = ({
  children,
  disabled,
  onClick,
  category,
  size,
  tier=ButtonTiers.PRIMARY,
  icon,
  iconSide='left',
}) => {
  const iconOnly = ! children && icon;
  return (
    <button
      onClick={onClick}
      className={cx(styles.root, {
        [styles[size?.toLowerCase()]]: size,
        [styles[tier?.toLowerCase()]]: tier,
        [styles.rightIcon]: iconSide === 'right' && icon,
        [styles.leftIcon]: iconSide === 'left' && icon,
        [styles.iconOnly]: iconOnly,
        [styles.smallIcon]: iconOnly && size === 'SMALL',
        [styles[category?.toLowerCase()]]: category && tier === ButtonTiers.PRIMARY,
      })}
      disabled={disabled}>
      {do{
        if (iconSide === 'left' && icon) {
          <Icon name={icon} />
        }
      }}
      {children}
      {do{
        if (iconSide === 'right' && icon) {
          <Icon name={icon} />
        }
      }}
    </button>
  );
}


Button.propTypes = {
  /** Just text for the button */
  children: PropTypes.string,

  /** Disables the button click */
  disabled: PropTypes.bool,

  /** Triggered after the button is clicked */
  onClick: PropTypes.func,

  /** Category of the button. Can be danger, success, info, warning */
  category: PropTypes.oneOf([Categories.BRAND, Categories.DANGER, Categories.SUCCESS, Categories.INFO, Categories.WARNING]),

  /** Size of the button. Can be small, large, default */
  size: PropTypes.oneOf([Sizes.SMALL, Sizes.DEFAULT, Sizes.LARGE]),

  /** Tier of the button */
  tier: PropTypes.oneOf([ButtonTiers.PRIMARY, ButtonTiers.SECONDARY, ButtonTiers.TERTIARY]),

  /** Name of the icon to be displayed within the button. Shown on the left by default */
  icon: PropTypes.string,

  /** Side on which the icon is displayed */
  iconSide: PropTypes.oneOf(['left', 'right']),
};


Button.defaultProps = {
  iconSide: 'left',
  size: Sizes.DEFAULT,
  tier: ButtonTiers.PRIMARY,
};


export default Button;
