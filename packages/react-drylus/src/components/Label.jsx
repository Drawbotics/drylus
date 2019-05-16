import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';


const styles = {
  base: css`
    color: ${sv.colorTertiary};
    text-transform: uppercase;
    font-weight: 500;
    font-size: 0.88rem;
  `,
};


const Label = ({ children }) => {
  return (
    <div className={styles.base}>
      {children}
    </div>
  );
};


Label.propTypes = {
  /** Just text for the label */
  children: PropTypes.string,
};


export default Label;
