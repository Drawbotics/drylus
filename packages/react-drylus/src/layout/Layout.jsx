import React from 'react';
import { css } from 'emotion';


const styles = {
  verticalContent: css`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  `,
  horizontalContent: css`
    display: flex;
    flex: 1;
    min-height: 0;
  `,
  content: css`
    flex: 1;
    min-height: 0;
  `,
};


const Layout = ({
  children,
  top,
  bottom,
  left,
  right,
  altPriority,
}) => {
  if (altPriority) {
    return (
      <div className={styles.horizontalContent}>
        {left}
        <div className={styles.verticalContent}>
          {top}
          <div className={styles.content}>
            {children}
          </div>
          {bottom}
        </div>
        {right}
      </div>
    )
  }
  return (
    <div className={styles.verticalContent}>
      {top}
      <div className={styles.horizontalContent}>
        {left}
        <div className={styles.content}>
          {children}
        </div>
        {right}
      </div>
      {bottom}
    </div>
  );
};


export default Layout;
