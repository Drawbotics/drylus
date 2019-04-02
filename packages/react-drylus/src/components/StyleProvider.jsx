import React from 'react';
import { css } from 'emotion';

import '../utils/normalize';


// NOTE: here we also include the custom fonts

const styles = {
  styleProvider: css`
    font-family: Helvetica;
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
