import sv from '@drawbotics/drylus-style-vars';
import { generateIconStyles, mapping } from '@drawbotics/icons/dist/drycons.js';
import packageJson from '@drawbotics/icons/package.json';
import { css, cx, injectGlobal } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';

import { Category, Color } from '../enums';
import { CustomPropTypes, categoryEnumToColor, getEnumAsClass } from '../utils';
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
  red: css`
    color: ${sv.red};
  `,
  blue: css`
    color: ${sv.blue};
  `,
  green: css`
    color: ${sv.green};
  `,
  orange: css`
    color: ${sv.orange};
  `,
  brand: css`
    color: ${sv.brand};
  `,
  primary: css`
    color: ${sv.colorPrimary};
  `,
  clickable: css`
    &:hover {
      cursor: pointer;
    }
  `,
};

export const Icons = mapping;

const Icon = ({ name, bold, onClick, category, style, color: _color }) => {
  const color = category ? categoryEnumToColor(category) : _color;
  return (
    <i
      style={style}
      className={cx(styles.root, `Drycon Drycon-${name}`, {
        [styles.bold]: bold,
        [styles[getEnumAsClass(color)]]: color,
        [styles.clickable]: onClick,
      })}
      onClick={onClick}
    />
  );
};

Icon.propTypes = {
  /** Name of the icon */
  name: PropTypes.string.isRequired,

  /** Makes icon T H I C C */
  bold: PropTypes.bool,

  /** Triggered when the icon is clicked */
  onClick: PropTypes.func,

  /** DEPRECATED */
  category: CustomPropTypes.deprecated(
    PropTypes.oneOf([
      Category.DANGER,
      Category.INFO,
      Category.SUCCESS,
      Category.WARNING,
      Category.BRAND,
    ]),
  ),

  color: PropTypes.oneOf([
    Color.BRAND,
    Color.RED,
    Color.BLUE,
    Color.GREEN,
    Color.ORANGE,
    Color.PRIMARY,
  ]),

  /** Used for style overrides */
  style: PropTypes.object,
};

export default Icon;
