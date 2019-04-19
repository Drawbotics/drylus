import React from 'react';
import { css, cx, injectGlobal } from 'emotion';
import PropTypes from 'prop-types';
// import iconStyles from '@drawbotics/icons/dist/drycons.js';


injectGlobal`
  ${'' /* ${iconStyles} */}
`;


const styles = {
  base: css`
  `,
};


const Icon = ({ name }) => {
  return (
    <i className={cx(styles.base, `Drycon Drycon-${name}`)}></i>
  );
}


Icon.propTypes = {
  /** Name of the icon */
  name: PropTypes.string.isRequired,
}


export default Icon;
