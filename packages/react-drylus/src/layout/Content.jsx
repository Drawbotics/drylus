import React from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';


const styles = {
  base: css`
    background: ${sv.neutralLight};
  `,
  fullHeight: css`
    height: 100%;
  `,
};


const Content = ({ children, fullHeight }) => {
  return (
    <div className={cx(styles.base, {
      [styles.fullHeight]: fullHeight,
    })}>
      {children}
    </div>
  );
};


export default Content;
