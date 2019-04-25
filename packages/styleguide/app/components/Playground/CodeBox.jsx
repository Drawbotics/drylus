import React from 'react';

import Code from '../mdx/Code';


const CodeBox = ({ children, mode='jsx' }) => {
  return (
    <Code className={mode}>
      {children}
    </Code>
  );
};


export default CodeBox;
