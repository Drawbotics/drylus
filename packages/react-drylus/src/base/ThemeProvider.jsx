import React from 'react';
import { css, injectGlobal } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';

import '../utils/normalize';


injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500');

  html {
    font-size: ${sv.defaultFontSize};
    line-height: ${sv.defaultLineHeight};
    letter-spacing: ${sv.defaultLetterSpacing};
  }
`;


const styles = {
  base: css`
    * {
      font-family: ${sv.defaultFontFamily};
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


ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export default ThemeProvider;
