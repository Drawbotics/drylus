import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';

import Icon from './Icon';


const styles = {
  base: css`
    background: ${sv.primary};
    color: ${sv.white};
    border-radius: ${sv.baseBorderRadius};
    padding: calc(${sv.paddingExtraSmall} * 1.5) ${sv.padding};
    outline: 0;
    border: 0;
    transition: ${sv.baseTransition};
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      cursor: pointer;
      background: ${sv.primaryDark};
    }

    &:active {
      box-shadow: ${sv.insetActive};
    }

    &:disabled {
      cursor: not-allowed;
      background: ${sv.neutralLight};
      color: ${sv.textDisabledDark};
      box-shadow: none;
    }
  `,
  danger: css`
    background: ${sv.red};

    &:hover {
      background: ${sv.redDark};
    }
  `,
  info: css`
    background: ${sv.blue};

    &:hover {
      background: ${sv.blueDark};
    }
  `,
  success: css`
    background: ${sv.green};

    &:hover {
      background: ${sv.greenDark};
    }
  `,
  warning: css`
    background: ${sv.orange};

    &:hover {
      background: ${sv.orangeDark};
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
    color: ${sv.textPrimaryDark};
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
      margin-left: 4px;
    }
  `,
  leftIcon: css`
    > i {
      margin-right: 4px;
    }
  `,
  iconOnly: css`
    border-radius: 1000px;
    padding: ${sv.paddingSmall};
    background: ${sv.neutralLight};
    color: ${sv.textPrimaryDark};

    &:hover {
      background: ${sv.neutral};
    }

    &:active {
      box-shadow: ${sv.insetActiveMedium};
    }
  `,
};


const Button = ({
  children,
  disabled,
  onClick,
  type,
  size,
  tier,
  withIcon,
  iconSide='left',
}) => {
  const iconOnly = ! children && withIcon;
  return (
    <button
      onClick={onClick}
      className={cx(styles.base, {
        [styles[type]]: type,
        [styles[size]]: size,
        [styles[tier]]: tier,
        [styles.rightIcon]: iconSide === 'right' && withIcon,
        [styles.leftIcon]: iconSide === 'left' && withIcon,
        [styles.iconOnly]: iconOnly,
      })}
      disabled={disabled}>
      {do{
        if (iconSide === 'left' && withIcon) {
          <Icon name={withIcon} />
        }
      }}
      {children}
      {do{
        if (iconSide === 'right' && withIcon) {
          <Icon name={withIcon} />
        }
      }}
    </button>
  );
}


Button.propTypes = {
  /** Normally just text for the button */
  children: PropTypes.string,

  /** Disables the button click */
  disabled: PropTypes.bool,

  /** Triggered after the button is clicked */
  onClick: PropTypes.func,

  /** Type of the button. Can be danger, success, info, warning */
  type: PropTypes.oneOf(['danger', 'success', 'info', 'warning']),

  /** Size of the button. Can be small, large */
  size: PropTypes.oneOf(['small', 'large']),

  /** Tier of the button. Can be secondary, tertiary */
  tier: PropTypes.oneOf(['secondary', 'tertiary']),

  /** Name of the icon to be displayed within the button. Shown on the left by default */
  withIcon: PropTypes.string,

  /** Side on which the icon is displayed */
  iconSide: PropTypes.oneOf(['left', 'right']),
};


Button.defaultProps = {
  iconSide: 'left',
};


export default Button;
