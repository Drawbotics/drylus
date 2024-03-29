import babelParser from 'prettier/parser-babylon';
import htmlParser from 'prettier/parser-html';
import prettier from 'prettier/standalone';
import React from 'react';

import Code from '../Code';

function beautifyString(string, mode, type) {
  if (type === 'vanilla') {
    return prettier.format(string, { parser: 'html', plugins: [htmlParser] });
  }
  if (mode === 'jsx') {
    return prettier
      .format(string, {
        semi: false,
        parser: 'babel',
        plugins: [babelParser],
        singleQuote: true,
        jsxBracketSameLine: true,
        trailingComma: 'all',
      })
      .substring(1);
  }
  return string;
}

const CodeBox = ({ children, mode = 'jsx', format, type, style = {} }) => {
  const beautified = format ? beautifyString(children, mode, type) : children;
  return (
    <Code className={mode} style={{ minHeight: '100px', ...style }}>
      {beautified}
    </Code>
  );
};

export default CodeBox;
