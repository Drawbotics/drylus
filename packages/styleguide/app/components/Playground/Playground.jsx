import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactElementToString from 'react-element-to-jsx-string';
import omit from 'lodash/omit';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';

import CodeBox from './CodeBox';
import Preview from './Preview';
import PropsTable from './PropsTable';
import ModeSwitcher from './ModeSwitcher';


const styles = {
  playground: css`
    padding: ${sv.basePadding};
    border: 1px solid ${sv.neutralDark};
    position: relative;
  `,
};


function getMarkupForMode(mode, component) {
  const generatedHTMLString = ReactDOMServer.renderToStaticMarkup(component);
  const generatedJSXString = ReactElementToString(component);
  switch (mode) {
    case 'vanilla':
      return generatedHTMLString;
    case 'react':
      return generatedJSXString;
    default:
      console.warn('Render mode not supported');
      return '';
  }
}


const Playground = ({ component: Component, initialProps }) => {
  const [props, setProps] = useState({});
  const [activeMode, setMode] = useState('react');

  const generatedComponent = <Component {...initialProps} {...props} />;
  const generatedMarkup = getMarkupForMode(activeMode, generatedComponent);
  return (
    <div className={styles.playground}>
      <h3>You are currently within the playground</h3>
      <ModeSwitcher modes={['react', 'vanilla']} activeMode={activeMode} onChange={setMode} />
      <Preview component={Component}>
        {generatedComponent}
      </Preview>
      <CodeBox>{generatedMarkup}</CodeBox>
      <PropsTable component={Component} activeProps={props} onChange={(v, n) => v === '_empty' ? setProps(omit(props, n)) : setProps({ ...props, [n]: v })} />
    </div>
  );
};


export default Playground;
