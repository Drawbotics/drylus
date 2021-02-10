import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Style } from '../types';
import { run } from '../utils';

const styles = {
  root: css`
    background: ${sv.white};
    box-shadow: ${sv.elevation1};
    padding: ${sv.defaultPadding};

    @media ${sv.screenL} {
      padding: ${sv.paddingSmall};
    }
  `,
  title: css`
    color: ${sv.colorSecondary};
    text-transform: uppercase;
    font-weight: 500;
    font-size: 0.9rem;
    margin-bottom: ${sv.marginSmall};

    @media ${sv.screenL} {
      margin-bottom: ${sv.marginExtraSmall};
    }
  `,
  noPadding: css`
    padding: 0px !important;
  `,
};

export interface TileProps {
  /** Displayed at the top of the tile, looks like a label */
  title?: string;

  /** Content displayed within the tile */
  children: React.ReactNode;

  /** Removes the space between the content and the borders (good for full size images in the tile) */
  noPadding?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;
}

export const Tile = ({ style, title, children, noPadding, className }: TileProps) => {
  return (
    <div
      style={style}
      className={cx(
        styles.root,
        {
          [styles.noPadding]: noPadding === true,
        },
        className,
      )}>
      {run(() => {
        if (title != null) {
          return <div className={styles.title}>{title}</div>;
        }
      })}
      {children}
    </div>
  );
};
