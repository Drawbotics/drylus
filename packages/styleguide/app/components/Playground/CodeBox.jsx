import React from 'react';
import prettier from 'prettier/standalone';
import babelParser from 'prettier/parser-babylon';

import Code from '../Code';


function beautifyString(string, mode) {
  return prettier.format(string, mode === 'jsx' ? {
    semi: false,
    parser: 'babel',
    plugins: [babelParser],
    singleQuote: true,
    jsxBracketSameLine: true,
    trailingComma: 'all',
  } : {}).substring(1);
}


const CodeBox = ({ children, mode='jsx', format }) => {
  const beautified = format ? beautifyString(children, mode) : children;
  return (
    <Code className={mode} style={{ minHeight: '100px' }}>
      {beautified}
    </Code>
  );
};


export default CodeBox;
