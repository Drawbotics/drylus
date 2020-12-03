import sv, { fade } from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Color } from '../enums';
import { OnClickCallback, Style } from '../types';
import { Deprecated, getEnumAsClass, run } from '../utils';
import { Icon } from './Icon';

const styles = {
  root: css`
    display: inline-flex;
    align-items: center;
    padding: 5px;
    background: ${sv.neutral};
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

  /** @kind Color */
  color?: Color.BRAND | Color.RED | Color.BLUE | Color.GREEN | Color.ORANGE | string;

  /** If present, an X icon is shown on the right of the tag, and the function is called when that icon is clicked */
  onClickRemove?: OnClickCallback<HTMLElement>;

  /** Modifies the way the color is shown */
  inversed?: boolean;

  /** Used for style overrides */
  style?: Style;
}

function _getClassNameForColor(color: Color, inversed?: boolean): string {
  return inversed ? `${getEnumAsClass(color)}Inversed` : getEnumAsClass(color);
}

export const Tag = ({ children, onClickRemove, inversed, style: _style = {}, color }: TagProps) => {
  const enumColor = color != null && color in Color ? (color as Color) : null;
  const className = enumColor != null ? _getClassNameForColor(enumColor, inversed) : null;
  const style =
    color != null && enumColor == null
      ? {
          ..._style,
          color: inversed ? undefined : color,
          background: inversed ? color : fade(color, 15),
        }
      : _style;
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles.inversed]: inversed === true,
        [styles[className as keyof typeof styles]]: enumColor != null,
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
