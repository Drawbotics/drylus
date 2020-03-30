import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Category, Color } from '../enums';
import { Style } from '../types';
import { categoryEnumToColor, getEnumAsClass } from '../utils';

const styles = {
  root: css`
    min-width: ${sv.marginSmall};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 2px 5px 1px 5px;
    border-radius: 1000px;
    font-size: 0.8rem;
    background: ${sv.neutral};
    color: ${sv.colorPrimary};
    letter-spacing: 0px;
  `,
  brand: css`
    background: ${sv.brand};
    color: ${sv.white};
  `,
  green: css`
    background: ${sv.green};
    color: ${sv.white};
  `,
  red: css`
    background: ${sv.red};
    color: ${sv.white};
  `,
  orange: css`
    background: ${sv.orange};
    color: ${sv.white};
  `,
  blue: css`
    background: ${sv.blue};
    color: ${sv.white};
  `,
};

interface BadgeProps {
  /** Value displayed by the badge */
  value: number;

  /** If the value is higher than the max, then a + is displayed with the max */
  max?: number;

  /** @enum Category */
  category?: Category.BRAND | Category.SUCCESS | Category.INFO | Category.WARNING | Category.DANGER;

  /** @enum Color */
  color?: Color.BRAND | Color.RED | Color.BLUE | Color.GREEN | Color.ORANGE;

  /** Used for style overrides */
  style?: Style;
}

export const Badge = ({ value, max, category, style, color: _color }: BadgeProps) => {
  const color = category ? categoryEnumToColor(category) : _color;
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles[getEnumAsClass<typeof styles>(color)]]: color != null,
      })}>
      {max != null && value > max ? `${max}+` : value}
    </div>
  );
};
