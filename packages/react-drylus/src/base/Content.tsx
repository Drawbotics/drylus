import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Style } from '../types';

const styles = {
  root: css`
    background: ${sv.backgroundColor};
  `,
  fullHeight: css`
    flex: 1;
  `,
  children: css`
    max-width: ${sv.maxWidthLarge};
    margin: auto;
  `,
  fullWidth: css`
    max-width: none;
    height: 100%;
  `,
};

interface ContentProps {
  children: React.ReactNode;

  /** If true, the content will take all the height available */
  fullHeight?: boolean;

  /** If true, the content will not be limited to 1200px */
  fullWidth?: boolean;

  /** Used for style overrides */
  style?: Style;
}

export const Content = ({ children, fullHeight, fullWidth, style }: ContentProps) => {
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles.fullHeight]: fullHeight,
      })}>
      <div className={cx(styles.children, { [styles.fullWidth]: fullWidth })}>{children}</div>
    </div>
  );
};
