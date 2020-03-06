import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Category, Color } from '../enums';
import { categoryEnumToColor, getEnumAsClass } from '../utils';

const styles = {
  root: css`
    display: inline-block;
    border-radius: 1000px;
    height: ${sv.marginExtraSmall};
    width: ${sv.marginExtraSmall};
    background: ${sv.neutral};
  `,
  brand: css`
    background: ${sv.brand};
  `,
  green: css`
    background: ${sv.green};
  `,
  red: css`
    background: ${sv.red};
  `,
  orange: css`
    background: ${sv.orange};
  `,
  blue: css`
    background: ${sv.blue};
  `,
  primary: css`
    background: ${sv.colorPrimary};
  `,
};

interface DotProps {
  /**
   * @deprecated use color instead
   */
  category?: Category;

  /**
   * Used for style overrides
   * @default {}
   */
  style?: Record<string, any>;

  color?: Color;
}

export const Dot = ({ category, style, color: _color }: DotProps) => {
  const color = category ? categoryEnumToColor(category) : _color;
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles[getEnumAsClass<typeof styles>(color)]]: color != null,
      })}
    />
  );
};
