import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';


const styles = {
  root: css`
    color: ${sv.colorTertiary};
    text-transform: uppercase;
    font-weight: 500;
    font-size: 0.88rem;
  `,
  ellipsized: css`
    overflow: hidden;
    text-overflow: ellipsis;
  `,
};


const Label = ({ children, ellipsized }) => {
  return (
    <div className={cx(styles.root, { [styles.ellipsized]: ellipsized })}>
      {children}
    </div>
  );
};


Label.propTypes = {
  /** Just text for the label */
  children: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),

  /** Cuts the text to stop at the max size of the container */
  ellipsized: PropTypes.bool,
};


export default Label;
