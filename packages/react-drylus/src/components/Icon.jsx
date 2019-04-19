import React from 'react';
import { css, cx, injectGlobal } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';
import generateIconStyles from '@drawbotics/icons/dist/drycons.js';
import packageJson from '@drawbotics/icons/package.json';


injectGlobal`
  ${generateIconStyles(process.env.NODE_ENV !== 'production' ? 'dev' : packageJson.version)}
`;


const styles = {
  base: css`
    color: ${sv.brandRed};
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
