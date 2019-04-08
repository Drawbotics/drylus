import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';


const width = '700px';


const styles = {
  base: css`
    background: blue;
    color: red;

    @media (min-width: ${width}) {
      color: red;
    }
  `,
  hover: css`
    background: orange;
  `,
};


const Button = ({ children }) => {
  return (
    <button className={cx(styles.base, styles.hover)}>{children}</button>
  );
}


Button.propTypes = {
  /** Normally just text for the button */
  children: PropTypes.string.isRequired,
}


export default Button;
