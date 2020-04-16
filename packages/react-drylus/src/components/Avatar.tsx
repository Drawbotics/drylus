import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Category, Color, Size } from '../enums';
import { Responsive, Style } from '../types';
import { Deprecated, categoryEnumToColor, getEnumAsClass, run, useResponsiveProps } from '../utils';
import { Tooltip } from './Tooltip';

const styles = {
  root: css`
    border-radius: 1000px;
    height: ${sv.marginLarge};
    width: ${sv.marginLarge};
    color: ${sv.colorPrimary};
    background: ${sv.neutral};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-top: 2px;
    text-transform: uppercase;
    overflow: hidden;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
  small: css`
    height: ${sv.defaultMargin};
    width: ${sv.defaultMargin};
    font-size: 0.8rem;
    padding-top: 1px;
  `,
  large: css`
    height: ${sv.marginExtraLarge};
    width: ${sv.marginExtraLarge};
    font-size: 1.1rem;
    padding-top: 0;
  `,
  red: css`
    color: ${sv.white};
    background: ${sv.red};
  `,
  blue: css`
    color: ${sv.white};
    background: ${sv.blue};
  `,
  green: css`
    color: ${sv.white};
    background: ${sv.green};
  `,
  orange: css`
    color: ${sv.white};
    background: ${sv.orange};
  `,
  brand: css`
    color: ${sv.white};
    background: ${sv.brand};
  `,
  customBackground: css`
    color: ${sv.white};
  `,
};

export interface AvatarProps {
  /** Image url. Takes the full background of the avatar if given, will be fit to cover surface. Takes precedence over text */
  image?: string;

  /** Text to be displayed within the avatar. It scales with the size, and will be limited to 2 characters max. */
  text?: string;

  /** Text shown when the avatar is hovered */
  hint?: string;

  /**
   * Size of the avatar
   * @kind Size */
  size?: number | Size.DEFAULT | Size.SMALL | Size.LARGE;

  /**
   * @deprecated Use color instead
   * @kind Category
   */
  category?: Category.BRAND | Category.SUCCESS | Category.INFO | Category.WARNING | Category.DANGER;

  /** @kind Color */
  color?: Color.BRAND | Color.RED | Color.BLUE | Color.GREEN | Color.ORANGE;

  /** Custom override for the background color, useful for profiles */
  backgroundColor?: string;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const Avatar = ({ responsive, ...rest }: AvatarProps) => {
  const {
    image,
    text,
    size,
    category,
    backgroundColor,
    hint,
    style = {},
    color: _color,
  } = useResponsiveProps<AvatarProps>(rest, responsive);

  const customSize = typeof size === 'number';
  const color = category ? categoryEnumToColor(category) : _color;

  const avatar = (
    <div
      className={cx(styles.root, {
        [styles[getEnumAsClass<typeof styles>(color)]]: color != null,
        [styles[customSize ? 'root' : getEnumAsClass<typeof styles>(size as Size)]]:
          size != null && !customSize,
        [styles.customBackground]: backgroundColor != null,
      })}
      style={{
        backgroundColor,
        height: customSize ? size : undefined,
        width: customSize ? size : undefined,
        fontSize: customSize ? (size as number) * 0.5 : undefined,
        ...style,
      }}>
      {run(() => {
        if (image) {
          return <img src={image} />;
        } else if (text) {
          return text.substring(0, 2);
        }
      })}
    </div>
  );
  if (hint != null) {
    return <Tooltip content={hint}>{avatar}</Tooltip>;
  } else {
    return avatar;
  }
};

Avatar.propTypes = {
  category: Deprecated,
};
