import React from 'react';
import { css, injectGlobal } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';

import '../utils/normalize';


// NOTE: here we also include the custom fonts
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500');

  html {
    font-size: ${sv.baseFontSize};
    line-height: ${sv.baseLineHeight};
    letter-spacing: ${sv.baseLetterSpacing};
  }
`;


const styles = {
  base: css`
    * {
      font-family: ${sv.baseFontFamily};
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
