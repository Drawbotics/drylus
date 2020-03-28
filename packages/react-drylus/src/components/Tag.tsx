import sv, { fade } from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Category, Color } from '../enums';
import { OnClickCallback, Style } from '../types';
import { Deprecated, categoryEnumToColor, getEnumAsClass, run } from '../utils';
import { Icon } from './Icon';

const styles = {
  root: css`
    display: inline-flex;
    align-items: center;
    padding: 5px;
    background: ${sv.neutralLight};
    color: ${sv.colorPrimary};
    border-radius: ${sv.defaultBorderRadius};
    font-size: 0.85rem;

    > i {
      font-size: 0.85rem;
      margin-left: 5px;
      margin-bottom: -1px;
      color: ${sv.colorSecondary};

      &:hover {
        color: inherit;
      }
    }
  `,
  brand: css`
    background: ${sv.brandLight};
    color: ${sv.brandDark};
  `,
  red: css`
    background: ${sv.redLight};
    color: ${sv.redDark};
  `,
  green: css`
    background: ${sv.greenLight};
    color: ${sv.greenDark};
  `,
  orange: css`
    background: ${sv.orangeLight};
    color: ${sv.orangeDark};
  `,
  blue: css`
    background: ${sv.blueLight};
    color: ${sv.blueDark};
  `,
  inversed: css`
    color: ${sv.white};
    background: ${sv.neutralDarker};
  `,
  brandInversed: css`
    background: ${sv.brand};
  `,
  redInversed: css`
    background: ${sv.red};
  `,
  greenInversed: css`
    background: ${sv.green};
  `,
  orangeInversed: css`
    background: ${sv.orange};
  `,
  blueInversed: css`
    background: ${sv.blue};
  `,
};

export interface TagProps {
  children: string;

  /** @deprecated use color instead */
  category?: Exclude<Category, Category.PRIMARY>;

  color?: Exclude<Color, Color.PRIMARY> | string;

  /** If present, an X icon is shown on the right of the tag, and the function is called when that icon is clicked */
  onClickRemove?: OnClickCallback<HTMLElement>;

  /** Modifies the way the color is shown */
  inversed?: boolean;

  /** Used for style overrides */
  style?: Style;
}

function _getClassNameForColor(
  color: TagProps['color'],
  inversed: TagProps['inversed'],
): string | undefined {
  if (color != null && Object.values(Color).includes(color as Color)) {
    return inversed ? `${getEnumAsClass(color as Color)}Inversed` : getEnumAsClass(color as Color);
  }
  return color;
}

export const Tag = ({
  children,
  category,
  onClickRemove,
  inversed,
  style: _style = {},
  color: _color,
}: TagProps) => {
  const color = category ? categoryEnumToColor(category) : _color;
  const className = _getClassNameForColor(color, inversed);
  const style =
    color != null && !Object.values(Color).includes(color as Color)
      ? {
          ..._style,
          color: inversed ? undefined : color,
          background: inversed ? color : fade(color, 30),
        }
      : _style;
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles.inversed]: inversed,
        [styles[className as keyof typeof styles]]: color != null,
      })}>
      {children}
      {run(() => {
        if (onClickRemove != null) {
          return <Icon name="x" onClick={onClickRemove} />;
        }
      })}
    </div>
  );
};

Tag.propTypes = {
  category: Deprecated,
};
