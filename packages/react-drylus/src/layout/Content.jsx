import React from 'react';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';


const styles = {
  base: css`
    background: ${sv.neutralLight};
  `,
};


const Content = ({ children }) => {
  return (
    <div className={styles.base}>
      {children}
    </div>
  );
};


export default Content;
