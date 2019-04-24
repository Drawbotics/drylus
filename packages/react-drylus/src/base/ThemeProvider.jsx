import React from 'react';
import { css, injectGlobal } from 'emotion';
import sv from '@drawbotics/style-vars';

import '../utils/normalize';


// NOTE: here we also include the custom fonts
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500');
`;


const styles = {
  base: css`
    * {
      font-family: ${sv.baseFontFamily};
      font-size: ${sv.baseFontSize};
      line-height: ${sv.baseLineHeight};
      letter-spacing: ${sv.baseLetterSpacing};
    }
    html {
      font-size: ${sv.baseFontSize};
    }
  `,
};


const ThemeProvider = ({ children }) => {
  return (
    <div className={styles.base}>
      {children}
    </div>
  );
};


export default ThemeProvider;
