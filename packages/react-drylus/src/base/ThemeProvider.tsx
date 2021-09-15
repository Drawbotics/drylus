import { Global, css as globalCSS } from '@emotion/core';
import { css, cx } from 'emotion';
import React from 'react';

import { Color } from '../enums';
import { Style } from '../types';
import { globalStyles, icons, normalize, root } from '../utils';

const styles = {
  global: globalCSS(globalStyles),
  normalize: globalCSS(normalize),
  icons: globalCSS(icons),
  root: css(root),
  wrapper: css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
  `,
};

export const themeStyles = styles;

export interface ThemeContext {
  themeColor: Color;
}

const Context = React.createContext<ThemeContext>({} as ThemeContext);

export interface ThemeProviderProps {
  children: React.ReactNode;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /**
   * Used to override the library color used in its components
   * @default Color.BRAND
   */
  baseColor?: Color;
}

export const ThemeProvider = ({
  children,
  style,
  className,
  baseColor = Color.BRAND,
}: ThemeProviderProps) => {
  return (
    <Context.Provider value={{ themeColor: baseColor }}>
      <Global styles={[styles.global, styles.normalize, styles.icons]} />
      <div className={cx(styles.root, styles.wrapper, className)} style={style}>
        {children}
      </div>
    </Context.Provider>
  );
};

export function useThemeColor(): Color {
  return React.useContext(Context).themeColor;
}
