import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';


const styles = {
  base: css`
    background: ${sv.primary};
    color: ${sv.white};
    border-radius: ${sv.baseBorderRadius};
    padding: ${sv.basePaddingSmall} calc(${sv.basePadding} * 1.5);
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
    padding: calc(${sv.basePaddingSmall} / 2) ${sv.basePaddingSmall};
    font-size: 0.8rem;
  `,
  large: css`
    padding: calc(${sv.basePaddingSmall} * 1.5) calc(${sv.basePadding} * 2.5);
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
};


const Button = ({
  children,
  disabled,
  onClick,
  type,
  size,
  tier,
}) => {
  const iconSide = Array.isArray(children) && typeof children[0] === 'string' ? 'right' : 'left';
  return (
    <button
      onClick={onClick}
      className={cx(styles.base, {
        [styles[type]]: type,
        [styles[size]]: size,
        [styles[tier]]: tier,
        [styles.rightIcon]: iconSide === 'right',
        [styles.leftIcon]: iconSide === 'left',
      })}
      disabled={disabled}>
      {children}
    </button>
  );
}


Button.propTypes = {
  /** Normally just text for the button, you can also pass an Icon component to use an icon in the button */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
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
}


export default Button;
