import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';


const styles = {
  root: css`
    color: ${sv.colorTertiary};
    text-transform: uppercase;
    font-weight: 500;
    font-size: 0.88rem;
  `,
};


const Label = ({ children }) => {
  return (
    <div className={styles.root}>
      {children}
    </div>
  );
};


Label.propTypes = {
  /** Just text for the label */
  children: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),
};


export default Label;
