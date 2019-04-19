import React from 'react';
import { css, injectGlobal } from 'emotion';
import iconStyles from '@drawbotics/icons/dist/drycons.js';

import '../utils/normalize';


// NOTE: here we also include the custom fonts

injectGlobal`
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  ${iconStyles}
`;

const styles = {
  styleProvider: css`
    font-family: Open Sans;
    font-size: 14px;
  `,
};


const StyleProvider = ({ children }) => {
  return (
    <div className={styles.styleProvider}>
      {children}
    </div>
  );
};


export default StyleProvider;
