import React from 'react';
import { css } from 'emotion';
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
};


const Button = ({ children, disabled }) => {
  return (
    <button className={styles.base} disabled={disabled}>{children}</button>
  );
}


Button.propTypes = {
  /** Normally just text for the button */
  children: PropTypes.string.isRequired,
  /** Disables the button click */
  disabled: PropTypes.bool,
}


export default Button;
