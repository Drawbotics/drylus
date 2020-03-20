import { Global, css as globalCSS } from '@emotion/core';
import { css, cx } from 'emotion';
import React, { Fragment } from 'react';

import { Style } from '../types';
import { globalStyles, normalize, root } from '../utils';

const styles = {
  global: globalCSS(globalStyles),
  normalize: globalCSS(normalize),
  root: css(root),
  wrapper: css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
  `,
};

export const themeStyles = styles;

interface ThemeProviderProps {
  children: React.ReactNode;

  /** Used for style overrides */
  style?: Style;
}

export const ThemeProvider = ({ children, style }: ThemeProviderProps) => {
  return (
    <Fragment>
      <Global styles={[styles.global, styles.normalize]} />
      <div className={cx(styles.root, styles.wrapper)} style={style}>
        {children}
      </div>
    </Fragment>
  );
};
