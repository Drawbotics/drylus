import React from 'react';
import { css, cx, injectGlobal } from 'emotion';
import PropTypes from 'prop-types';
import { generateIconStyles, mapping } from '@drawbotics/icons/dist/drycons.js';
import packageJson from '@drawbotics/icons/package.json';
import sv from '@drawbotics/drylus-style-vars';

import { Categories } from '../enums';
import { getEnumAsClass } from '../utils';
import env from '../utils/get-static-env';


injectGlobal`
  ${generateIconStyles(env === "'development'" ? 'dev' : packageJson.version)}
`;


const styles = {
  root: css`
    color: inherit;
  `,
  bold: css`
    font-weight: bold !important;
  `,
  danger: css`
    color: ${sv.red};
  `,
  info: css`
    color: ${sv.blue};
  `,
  success: css`
    color: ${sv.green};
  `,
  warning: css`
    color: ${sv.orange};
  `,
  brand: css`
    color: ${sv.brand};
  `,
  clickable: css`
    &:hover {
      cursor: pointer;
    }
  `,
};


export const Icons = mapping;


const Icon = ({ name, bold, onClick, category, style }) => {
  return (
    <i
      style={style}
      className={cx(styles.root, `Drycon Drycon-${name}`, {
        [styles.bold]: bold,
        [styles[getEnumAsClass(category)]]: category,
        [styles.clickable]: onClick,
      })}
      onClick={onClick} />
  );
};


Icon.propTypes = {
  /** Name of the icon */
  name: PropTypes.string.isRequired,

  /** Makes icon T H I C C */
  bold: PropTypes.bool,

  /** Triggered when the icon is clicked */
  onClick: PropTypes.func,

  /** Category of the icon */
  category: PropTypes.oneOf([
    Categories.DANGER,
    Categories.INFO,
    Categories.SUCCESS,
    Categories.WARNING,
    Categories.BRAND,
  ]),

  /** Used for style overrides */
  style: PropTypes.object,
}


export default Icon;
