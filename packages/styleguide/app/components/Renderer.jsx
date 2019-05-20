/* eslint-disable react/display-name */
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';
import { Title, Paragraph } from '@drawbotics/react-drylus';

import Code from './Code';
import InlineCode from './InlineCode';


const styles = {
  content: css`
    margin: ${sv.marginLarge} ${sv.defaultMargin};
  `,
};


const components = {
  h1: (props) => <Title {...props} size={1} />,
  h2: (props) => <Title {...props} size={2} />,
  h3: (props) => <Title {...props} size={3} />,
  h4: (props) => <Title {...props} size={4} />,
  pre: (props) => <div {...props} />,
  p: (props) => <Paragraph {...props} />,
  code: Code,
  inlineCode: InlineCode,
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
