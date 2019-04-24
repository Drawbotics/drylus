import React from 'react';
import { css } from 'emotion';


const styles = {
  base: css`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  `,
  content: css`
    flex: 1;
    min-height: 0;
  `,
};


const Layout = ({ children, top, bottom, left, right }) => {
  return (
    <div className={styles.base}>
      {top}
      <div className={styles.content}>
        {children}
      </div>
      {bottom}
    </div>
  );
};


export default Layout;
