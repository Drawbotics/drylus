import sv from '@drawbotics/drylus-style-vars';
import { generateIconStyles } from '@drawbotics/icons/dist/drycons.js';
import packageJson from '@drawbotics/icons/package.json';
import { injectGlobal } from 'emotion';

import { normalize } from './normalize';

const env = require('../utils/get-static-env');

export const baseStyleProperties = `
  font-size: ${sv.defaultFontSize};
  line-height: ${sv.defaultLineHeight};
  letter-spacing: ${sv.defaultLetterSpacing};
  -webkit-font-smoothing: auto;
  -webkit-overflow-scrolling: touch;
`;

export const fonts = `
  @import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500');
`;

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

export const icons = generateIconStyles(env === "'development'" ? 'dev' : packageJson.version);

export function injectGlobalStyles(): void {
  injectGlobal(fonts);
  injectGlobal(globalStyles);
  injectGlobal(normalize);
  injectGlobal(icons);
  injectGlobal(`
    .Drylus-ThemeProvider__root {
      ${root}
    }
  `);
}
