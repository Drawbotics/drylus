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
import { adaptForVanilla, recursiveMdxTransform } from './utils';


const styles = {
  playground: css`
    padding: ${sv.defaultPadding};
    border: 1px solid ${sv.neutralDark};
    position: relative;
  `,
};


function getMarkupForMode(mode, component) {
  if (component.length > 0) {
    console.error('More than 1 element at root level. If you want to do that, use fragments: <>...</>');
    return '';
  }
  const generatedHTMLString = ReactDOMServer.renderToStaticMarkup(component);
  const generatedJSXString = ReactElementToString(component, { showDefaultProps: false });
  switch (mode) {
    case 'vanilla':
      return adaptForVanilla(generatedHTMLString);
    case 'react':
      return generatedJSXString;
    default:
      console.warn('Render mode not supported');
      return '';
  }
}


const supportedModes = ['react', 'vanilla'];


const Playground = ({ component, children }) => {
  const [props, setProps] = useState({});
  const [activeMode, setMode] = useState(supportedModes[0]);

  const generatedComponent = recursiveMdxTransform(children, { component, props });
  const generatedMarkup = getMarkupForMode(activeMode, generatedComponent);
  return (
    <div className={styles.playground}>
      <h3>You are currently within the playground</h3>
      <ModeSwitcher
        modes={supportedModes}
        activeMode={activeMode}
        onChange={setMode} />
      <Preview raw={activeMode === 'vanilla'}>
        {activeMode === 'vanilla' ? generatedMarkup : generatedComponent}
      </Preview>
      <CodeBox format={activeMode === 'vanilla'}>{generatedMarkup}</CodeBox>
      <PropsTable
        component={component}
        activeProps={props}
        onChange={(v, n) => v === '_empty' ? setProps(omit(props, n)) : setProps({ ...props, [n]: v })} />
    </div>
  );
};


export default Playground;
