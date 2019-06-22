/* eslint-disable react/display-name */
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';
import {
  Title,
  Paragraph,
  TextLink,
  LinkUnderlined,
  Panel,
  PanelSection,
  PanelBody,
} from '@drawbotics/react-drylus';
import { Link } from 'react-router-dom';

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
  a: (props) => {
    if (props.href.includes('http')) {
      return <a href={props.href} target="_blank" rel="noopener noreferrer"><TextLink {...props} /></a>;
    }
    return <Link to={props.href}><TextLink {...props} underlined={LinkUnderlined.ALWAYS} /></Link>;
  },
  code: Code,
  inlineCode: InlineCode,
  wrapper: ({ children, ...props }) => {
    if (React.Children.count(children) <= 1) {
      return children;
    }
    const [ title, ...rest ] = children;
    if (title?.props.mdxType === 'h1') {
      return (
        <>
          {title}
          <Panel body={
            <PanelBody>
              <PanelSection title="Description">
                {rest}
              </PanelSection>
            </PanelBody>} />
        </>
      );
    }
    return children;
  }
}


const Renderer = (props) => {
  return (
    <MDXProvider components={components}>
      <div {...props} className={styles.content} />
    </MDXProvider>
  );
};


export default Renderer;
