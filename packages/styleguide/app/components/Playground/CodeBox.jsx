import babelParser from 'prettier/plugins/babel';
import * as estreePlugin from 'prettier/plugins/estree';
import htmlParser from 'prettier/plugins/html';
import prettier from 'prettier/standalone';
import React, { useEffect, useState } from 'react';

import Code from '../Code';

async function beautifyString(string, mode, type) {
  if (type === 'vanilla') {
    return prettier.format(string, { parser: 'html', plugins: [htmlParser] });
  }
  if (mode === 'jsx') {
    const formatted = await prettier.format(string, {
      semi: false,
      parser: 'babel',
      plugins: [babelParser, estreePlugin],
      singleQuote: true,
      bracketSameLine: true,
      trailingComma: 'all',
    });
    return formatted.substring(1);
  }
  return string;
}

const CodeBox = ({ children, mode = 'jsx', format, type, style = {} }) => {
  const [beautified, setBeautified] = useState(children);

  useEffect(() => {
    if (format) {
      beautifyString(children, mode, type).then(setBeautified);
    } else {
      setBeautified(children);
    }
  }, [children, mode, format, type]);

  return (
    <Code className={mode} style={{ minHeight: '100px', ...style }}>
      {beautified}
    </Code>
  );
};

export default CodeBox;
