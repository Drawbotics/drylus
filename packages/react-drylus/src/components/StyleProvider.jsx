import React from 'react';
import { css, injectGlobal } from 'emotion';

import '../utils/normalize';


// NOTE: here we also include the custom fonts
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500');
`;

const styles = {
  base: css`
    font-family: Rubik;
    font-size: 14px;
  `,
};


const StyleProvider = ({ children }) => {
  return (
    <div className={styles.base}>
      {children}
    </div>
  );
};


export default StyleProvider;
