import sv from '@drawbotics/drylus-style-vars';
import { css } from 'emotion';
import React from 'react';

const styles = {
  code: css`
    background: ${sv.neutral};
    font-family: 'Roboto Mono', monospace !important;
    padding-left: 5px;
    padding-right: 5px;
    color: ${sv.blue};
    border-radius: ${sv.borderRadiusSmall};
  `,
};

const InlineCode = ({ children }) => {
  return <span className={styles.code}>{children}</span>;
};

export default InlineCode;
