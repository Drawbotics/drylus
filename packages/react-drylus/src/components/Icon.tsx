import sv from '@drawbotics/drylus-style-vars';
import { IconKeys, Icons as IconValues } from '@drawbotics/icons/dist/drycons';
import { generateIconStyles, mapping } from '@drawbotics/icons/dist/drycons.js';
import packageJson from '@drawbotics/icons/package.json';
import { css, cx, injectGlobal } from 'emotion';
import React from 'react';

import { Category, Color, Shade } from '../enums';
import { OnClickCallback, Style } from '../types';
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
  light: css`
    color: ${sv.colorTertiary};
  `,
  medium: css`
    color: ${sv.colorSecondary};
  `,
  dark: css`
    color: ${sv.colorPrimary};
  `,
  clickable: css`
    &:hover {
      cursor: pointer;
    }
  `,
};

export const Icons: Record<IconKeys, IconValues> = mapping;

export type IconType = IconValues;

export interface IconProps {
  /** Name of the icon */
  name: IconType;

  /** Makes icon bold */
  bold?: boolean;

  /** Triggered when the icon is clicked */
  onClick?: OnClickCallback<HTMLElement>;

  /** @deprecated Use color instead */
  category?: Category;

  color?: Color;

  /** @kind Shade */
  shade?: Shade.DARK | Shade.MEDIUM | Shade.LIGHT;

  /** Used for style overrides */
  style?: Style;
}

export const Icon = ({ name, bold, onClick, category, style, color: _color, shade }: IconProps) => {
  const color = category ? categoryEnumToColor(category) : _color;
  return (
    <i
      style={style}
      className={cx(styles.root, `Drycon Drycon-${name}`, {
        [styles.bold]: bold != null,
        [styles[getEnumAsClass<typeof styles>(color)]]: color != null,
        [styles[getEnumAsClass<typeof styles>(shade)]]: shade != null,
        [styles.clickable]: onClick != null,
      })}
      onClick={onClick}
    />
  );
};

Icon.propTypes = {
  category: Deprecated,
};
