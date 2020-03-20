import { css } from 'emotion';
import React from 'react';

import { Style } from '../types';

const styles = {
  root: css`
    height: 100vh;
    width: 100vw;
  `,
};

interface PageProps {
  children: React.ReactNode;

  /** Used for style overrides */
  style?: Style;
}

export const Page = ({ children, style }: PageProps) => {
  return (
    <div className={styles.root} style={style}>
      {children}
    </div>
  );
};
