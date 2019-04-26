/* eslint-disable react/display-name */
import React from 'react';
import { MDXProvider } from '@mdx-js/react';

import Code from './Code';


const components = {
  h1: (props) => <h1 style={{color: 'tomato'}} {...props} />,
  pre: (props) => <div {...props} />,
  code: Code,
}


const Renderer = (props) => {
  return (
    <MDXProvider components={components}>
      <main {...props}>
      </main>
    </MDXProvider>
  );
};


export default Renderer;
