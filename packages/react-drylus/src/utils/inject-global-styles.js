import sv from '@drawbotics/drylus-style-vars';
import { injectGlobal } from 'emotion';

import normalize from './normalize';

export const globalStyles = `
  @import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500');

  html, body {
    font-size: ${sv.defaultFontSize};
    line-height: ${sv.defaultLineHeight};
    letter-spacing: ${sv.defaultLetterSpacing};
    -webkit-font-smoothing: auto;
    -webkit-overflow-scrolling: touch;
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

export function injectGlobalStyles() {
  injectGlobal(globalStyles);
  injectGlobal(normalize);
  injectGlobal(`
    .Drylus-ThemeProvider__root {
      ${root}
    }
  `);
}
