import sv from '@drawbotics/drylus-style-vars';
import { generateIconStyles, mapping } from '@drawbotics/icons/dist/drycons.js';
import packageJson from '@drawbotics/icons/package.json';
import { css, cx, injectGlobal } from 'emotion';
import React from 'react';

import { Category, Color } from '../enums';
import { Style } from '../types';
import { Deprecated, categoryEnumToColor, getEnumAsClass } from '../utils';

const env = require('../utils/get-static-env');

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

export const Icons: Record<string, string> = mapping;

interface IconProps {
  /** Name of the icon */
  name: keyof typeof Icons;

  /** Makes icon T H I C C */
  bold?: boolean;

  /** Triggered when the icon is clicked */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;

  /** @deprecated use color instead */
  category?: Category;

  color?: Color;

  /** Used for style overrides */
  style?: Style;
}

export const Icon = ({ name, bold, onClick, category, style, color: _color }: IconProps) => {
  const color = category ? categoryEnumToColor(category) : _color;
  return (
    <i
      style={style}
      className={cx(styles.root, `Drycon Drycon-${name}`, {
        [styles.bold]: bold != null,
        [styles[getEnumAsClass<typeof styles>(color)]]: color != null,
        [styles.clickable]: onClick != null,
      })}
      onClick={onClick}
    />
  );
};

Icon.propTypes = {
  category: Deprecated,
};
