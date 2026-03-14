import { css, cx, injectGlobal } from '@emotion/css';
import React, { useRef } from 'react';

import { Color } from '../enums';
import { Style } from '../types';
import { baseStyleProperties, globalStyles, icons, injectFontLink, normalize, root } from '../utils';

const styles = {
  local: css(baseStyleProperties),
  root: css(root),
  wrapper: css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
  `,
};

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

let globalStylesInjected = false;
let iconsInjected = false;

export const ThemeProvider = ({
  children,
  style,
  className,
  baseColor = Color.BRAND,
  injectGlobal: shouldInjectGlobal = true,
}: ThemeProviderProps) => {
  const hasInjected = useRef(false);

  if (!hasInjected.current) {
    if (shouldInjectGlobal && !globalStylesInjected) {
      injectGlobal(globalStyles);
      injectGlobal(normalize);
      globalStylesInjected = true;
    }
    if (!iconsInjected) {
      injectGlobal(icons);
      iconsInjected = true;
    }
    hasInjected.current = true;
  }

  injectFontLink();
  return (
    <Context.Provider value={{ themeColor: baseColor }}>
      <div
        className={cx(
          styles.root,
          shouldInjectGlobal ? undefined : styles.local,
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
