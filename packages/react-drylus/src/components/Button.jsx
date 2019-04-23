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

    &:hover {
      cursor: pointer;
      background: ${sv.primaryDark};
    }

    &:active {
      box-shadow: ${sv.inset1};
    }

    &:disabled {
      cursor: not-allowed;
      background: ${sv.neutralLight};
      color: ${sv.textDisabledDark};
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
};


const Button = ({
  children,
  disabled,
  onClick,
  type,
}) => {
  return (
    <button
      onClick={onClick}
      className={cx(styles.base, {
        [styles[type]]: type,
      })}
      disabled={disabled}>
      {children}
    </button>
  );
}


Button.propTypes = {
  /** Normally just text for the button */
  children: PropTypes.string.isRequired,
  /** Disables the button click */
  disabled: PropTypes.bool,
  /** Triggered after the button is clicked */
  onClick: PropTypes.func,
  /** Type of the button. Can be danger, success, info, warning */
  type: PropTypes.oneOf(['danger', 'success', 'info', 'warning']),
}


export default Button;
