const { css, injectGlobal } = require('emotion');
const sv = require('@drawbotics/drylus-style-vars');
const { generateIconStyles } = require('@drawbotics/icons/dist/drycons.js');
const packageJson = require('@drawbotics/icons/package.json');

global._css = css;
global._injectGlobal2 = injectGlobal;

// Inject global styles directly here instead of using injectGlobalStyles
const env = process.env.NODE_ENV === 'development' ? 'dev' : packageJson.version;

const baseStyleProperties = `
  font-size: ${sv.defaultFontSize};
  line-height: ${sv.defaultLineHeight};
  letter-spacing: ${sv.defaultLetterSpacing};
  -webkit-font-smoothing: auto;
  -webkit-overflow-scrolling: touch;
`;

const fonts = `
  @import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500');
`;

const globalStyles = `
  html, body {
    ${baseStyleProperties}
  }
`;

const root = `
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

const icons = generateIconStyles(env);

// Inject all styles
injectGlobal(fonts);
injectGlobal(globalStyles);
injectGlobal(root);
injectGlobal(icons);

require('@drawbotics/react-drylus');
