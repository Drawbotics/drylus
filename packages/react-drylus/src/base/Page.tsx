import { css, cx } from 'emotion';
import React from 'react';

import { Style } from '../types';

const styles = {
  root: css`
    height: 100vh;
    width: 100vw;
  `,
};

export interface PageProps {
  children: React.ReactNode;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;
}

export const Page = ({ children, style, className }: PageProps) => {
  return (
    <div className={cx(styles.root, className)} style={style}>
      {children}
    </div>
  );
};
