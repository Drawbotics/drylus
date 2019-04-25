import React, { useState } from 'react';
// import ReactDOMServer from 'react-dom/server';
import ReactElementToString from 'react-element-to-jsx-string';
import omit from 'lodash/omit';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';

import CodeBox from './CodeBox';
import Preview from './Preview';
import PropsTable from './PropsTable';


const styles = {
  playground: css`
    padding: ${sv.basePadding};
    border: 1px solid ${sv.neutralDark};
  `,
};


const Playground = ({ component: Component, initialProps }) => {
  const [props, setProps] = useState({});

  const generatedComponent = <Component {...initialProps} {...props} />;
  // const generatedHTMLString = ReactDOMServer.renderToStaticMarkup(generatedComponent);
  const generatedJSXString = ReactElementToString(generatedComponent);
  return (
    <div className={styles.playground}>
      <h3>You are currently within the playground</h3>
      <Preview component={Component}>
        {generatedComponent}
      </Preview>
      <CodeBox>{generatedJSXString}</CodeBox>
      <PropsTable component={Component} activeProps={props} onChange={(v, n) => v === '_empty' ? setProps(omit(props, n)) : setProps({ ...props, [n]: v })} />
    </div>
  );
};


export default Playground;
