import React from 'react';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';


const styles = {
  code: css`
    background: ${sv.neutral};
    font-family: 'Roboto Mono', monospace;
    padding-left: 5px;
    padding-right: 5px;
    color: ${sv.blue};
    font-weight: 600;
    border-radius: ${sv.borderRadiusSmall};
  `,
};


const InlineCode = ({ children }) => {
  return (
    <span className={styles.code}>
      {children}
    </span>
  );
}


export default InlineCode;
