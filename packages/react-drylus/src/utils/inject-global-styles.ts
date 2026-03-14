import sv from '@drawbotics/drylus-style-vars';
import { generateIconStyles } from '@drawbotics/icons/dist/drycons.js';
import packageJson from '@drawbotics/icons/package.json';
import { injectGlobal } from '@emotion/css';

import { normalize } from './normalize';

export const baseStyleProperties = `
  font-size: ${sv.defaultFontSize};
  line-height: ${sv.defaultLineHeight};
  letter-spacing: ${sv.defaultLetterSpacing};
  -webkit-font-smoothing: auto;
  -webkit-overflow-scrolling: touch;
`;

export const GOOGLE_FONTS_URL = 'https://fonts.googleapis.com/css?family=Rubik:300,400,500';

export function injectFontLink(): void {
  if (typeof document === 'undefined') return;
  if (document.querySelector(`link[href="${GOOGLE_FONTS_URL}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = GOOGLE_FONTS_URL;
  document.head.appendChild(link);
}

export const globalStyles = `
  html, body {
    ${baseStyleProperties}
  }
`;

export const root = `
  * {
    font-family: ${sv.defaultFontFamily};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  b,
  strong {
    font-weight: 500;
  }
`;

export const icons = generateIconStyles(process.env.NODE_ENV === 'development' ? 'dev' : packageJson.version);

export function injectGlobalStyles(): void {
  injectFontLink();
  injectGlobal(globalStyles);
  injectGlobal(normalize);
  injectGlobal(icons);
  injectGlobal(`
    .Drylus-ThemeProvider__root {
      ${root}
    }
  `);
}
