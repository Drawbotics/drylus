import React from 'react';
import { css, cx, injectGlobal } from 'emotion';
import PropTypes from 'prop-types';
import generateIconStyles from '@drawbotics/icons/dist/drycons.js';
import packageJson from '@drawbotics/icons/package.json';

import env from '../utils/get-static-env';


injectGlobal`
  ${generateIconStyles(env === 'development' ? 'dev' : packageJson.version)}
`;


const styles = {
  base: css`
    color: inherit;
  `,
  bold: css`
    font-weight: bold !important;
  `,
};


const Icon = ({ name, bold }) => {
  return (
    <i className={cx(styles.base, `Drycon Drycon-${name}`, {
      [styles.bold]: bold,
    })} />
  );
}


Icon.propTypes = {
  /** Name of the icon */
  name: PropTypes.string.isRequired,

  /** Makes icon T H I C C */
  bold: PropTypes.bool,
}


export default Icon;
