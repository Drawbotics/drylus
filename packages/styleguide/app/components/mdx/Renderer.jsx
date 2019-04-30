/* eslint-disable react/display-name */
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';

import Code from './Code';


const styles = {
  content: css`
    margin: ${sv.baseMarginLarge} ${sv.baseMargin};
  `,
};


const components = {
  h1: (props) => <h1 {...props} />,
  pre: (props) => <div {...props} />,
  code: Code,
}


const Renderer = (props) => {
  return (
    <MDXProvider components={components}>
      <div {...props} className={styles.content}>
      </div>
    </MDXProvider>
  );
};


export default Renderer;
