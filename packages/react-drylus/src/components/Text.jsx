import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

import { Categories, Sizes } from '../base';


const styles = {
  root: css`
    display: inline-block;
  `,
};


const Text = ({
  inversed,
  bold,
  size,
  tier,
  disabled,
  children,
}) => {
  return (
    <span className={styles.root}>

    </span>
  );
};


Text.propTypes = {
  inversed: PropTypes.bool,
  bold: PropTypes.bool,
  size: PropTypes.oneOf([ ]),
  tier: PropTypes.oneOf([ ]),
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
};


Text.defaultProps = {

};


export default Text;
