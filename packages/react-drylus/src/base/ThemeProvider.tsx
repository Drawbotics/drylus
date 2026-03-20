import { Global, css as globalCSS } from '@emotion/react';
import { css, cx } from '@emotion/css';
import { LazyMotion, domAnimation } from 'framer-motion';
import React, { use } from 'react';

import { Color } from '../enums';
import { Style } from '../types';
import { baseStyleProperties, globalStyles, icons, injectFontLink, normalize, root } from '../utils';

const styles = {
  global: globalCSS(globalStyles),
  local: css(baseStyleProperties),
  normalize: globalCSS(normalize),
  icons: globalCSS(icons),
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

export const ThemeProvider = ({
  children,
  style,
  className,
  baseColor = Color.BRAND,
  injectGlobal = true,
}: ThemeProviderProps) => {
  injectFontLink();

  const contextValue = React.useMemo(() => ({ themeColor: baseColor }), [baseColor]);

  const globalStylesArray = React.useMemo(
    () => [
      injectGlobal ? styles.global : undefined,
      injectGlobal ? styles.normalize : undefined,
      styles.icons,
    ],
    [injectGlobal],
  );

  return (
    <Context value={contextValue}>
      <LazyMotion features={domAnimation} strict>
        <Global styles={globalStylesArray} />
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
      </LazyMotion>
    </Context>
  );
};

export function useThemeColor(): Color {
  return use(Context).themeColor;
}
