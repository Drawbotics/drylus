import React from 'react';
import { css } from 'emotion';


const styles = {
  base: css`
    display: flex;
  `,
  content: css`
    flex: 1;
    min-height: 0;
  `,
};


const Layout = ({ children }) => {
  return (
    <div className={styles.base}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};


export default Layout;
