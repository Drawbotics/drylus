import sv from '@drawbotics/drylus-style-vars';
import {
  Callout,
  Category,
  LinkUnderlined,
  List,
  ListItem,
  Margin,
  Panel,
  PanelBody,
  PanelSection,
  Paragraph,
  Size,
  TBody,
  TCell,
  THead,
  TRow,
  Table,
  TextLink,
  Title,
} from '@drawbotics/react-drylus';
import { MDXProvider } from '@mdx-js/react';
import { css } from 'emotion';
/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Code from './Code';
import InlineCode from './InlineCode';

const styles = {
  content: css`
    padding: ${sv.paddingLarge} ${sv.defaultPadding};

    @media ${sv.screenL} {
      padding: ${sv.defaultPadding} ${sv.paddingSmall};
      padding-top: ${sv.paddingHuge};
      margin-top: calc(${sv.marginHuge} * -1);
    }
  `,
  blockquote: css`
    position: relative;

    p {
      color: ${sv.colorSecondary} !important;
    }

    &::before {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background: ${sv.colorPrimary};
    }
  `,
};

const components = {
  h1: (props) => <Title {...props} size={1} />,
  h2: (props) => <Title {...props} size={2} />,
  h3: (props) => <Title {...props} size={3} />,
  h4: (props) => <Title {...props} size={4} />,
  h5: (props) => <Callout {...props} category={Category.WARNING} />,
  pre: (props) => <div {...props} />,
  p: (props) => <Paragraph {...props} />,
  a: (props) => {
    if (props.href.includes('http')) {
      return (
        <a href={props.href} target="_blank" rel="noopener noreferrer">
          <TextLink {...props} />
        </a>
      );
    }
    return (
      <Link to={props.href}>
        <TextLink {...props} underlined={LinkUnderlined.ALWAYS} />
      </Link>
    );
  },
  li: (props) => <ListItem {...props} />,
  ol: (props) => (
    <Margin size={{ bottom: Size.SMALL, top: Size.DEFAULT }}>
      <List {...props} ordered />
    </Margin>
  ),
  ul: (props) => (
    <Margin size={{ bottom: Size.SMALL, top: Size.DEFAULT }}>
      <List {...props} />
    </Margin>
  ),
  code: (props) => <Code className="language-js" {...props} />,
  inlineCode: InlineCode,
  table: (props) => <Table {...props} />,
  tr: (props) => <TRow {...props} />,
  td: (props) => <TCell {...props} />,
  th: (props) => <TCell {...props} />,
  thead: (props) => <THead>{props.children.props.children}</THead>,
  tbody: (props) => <TBody {...props} />,
  blockquote: (props) => (
    <div className={styles.blockquote}>
      <Margin size={{ left: Size.DEFAULT }} {...props} />
    </div>
  ),
  wrapper: ({ children, ...props }) => {
    if (React.Children.count(children) <= 1) {
      return children;
    }
    const [title, ...rest] = children;
    if (title?.props.mdxType === 'h1') {
      return (
        <Fragment>
          {title}
          <Panel
            body={
              <PanelBody>
                <PanelSection title="Description">{rest}</PanelSection>
              </PanelBody>
            }
          />
        </Fragment>
      );
    }
    return children;
  },
};

const Renderer = (props) => {
  return (
    <MDXProvider components={components}>
      <div {...props} className={styles.content} />
    </MDXProvider>
  );
};

export default Renderer;
