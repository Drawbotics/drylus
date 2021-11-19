import { Global, css as globalCSS } from '@emotion/core';
import { css, cx } from 'emotion';
import React from 'react';

import { Color } from '../enums';
import { Style } from '../types';
import { baseStyleProperties, fonts, globalStyles, icons, normalize, root } from '../utils';

const styles = {
  global: globalCSS(globalStyles),
  local: css(baseStyleProperties),
  normalize: globalCSS(normalize),
  fonts: globalCSS(fonts),
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

  /**
   * Used to set the global styles for the whole website (body/html)
   * @default true
   */
  injectGlobal?: boolean;
}

export const ThemeProvider = ({
  children,
  style,
  className,
  baseColor = Color.BRAND,
  injectGlobal = true,
}: ThemeProviderProps) => {
  return (
    <Context.Provider value={{ themeColor: baseColor }}>
      <Global
        styles={[
          injectGlobal ? styles.global : undefined,
          injectGlobal ? styles.normalize : undefined,
          styles.fonts,
          styles.icons,
        ]}
      />
      <div
        className={cx(
          styles.root,
          injectGlobal ? undefined : styles.local,
          styles.wrapper,
          className,
        )}
        style={style}>
        {children}
      </div>
    </Context.Provider>
  );
};

export function useThemeColor(): Color {
  return React.useContext(Context).themeColor;
}
