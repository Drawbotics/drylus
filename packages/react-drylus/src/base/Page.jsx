import React from 'react';
import { css } from 'emotion';


const styles = {
  base: css`
    min-height: 100vh;
    display: flex;
  `,
};


const Page = ({ children }) => {
  return (
    <div className={styles.base}>
      {children}
    </div>
  );
};


export default Page;
