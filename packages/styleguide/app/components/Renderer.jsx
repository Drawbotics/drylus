/* eslint-disable react/display-name */
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';
import { Title, Paragraph, TextLink } from '@drawbotics/react-drylus';
import { Link as RouterLink } from 'react-router-dom';

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
  a: (props) => <TextLink {...props} to={props.href} component={RouterLink} />,
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
