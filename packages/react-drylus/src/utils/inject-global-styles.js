import { injectGlobal } from 'emotion';
import sv from '@drawbotics/drylus-style-vars';

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


export function injectGlobalStyles() {
  injectGlobal(globalStyles);
  injectGlobal(normalize);
}

