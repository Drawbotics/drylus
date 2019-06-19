import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactElementToString from 'react-element-to-jsx-string';
import omit from 'lodash/omit';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';

import CodeBox from './CodeBox';
import Preview from './Preview';
import PropsTable from './PropsTable';
import ModeSwitcher from './ModeSwitcher';
import { adaptForVanilla, recursiveMdxTransform } from './utils';


const styles = {
  playground: css`
  `,
  codeWrapper: css`
    border: 1px solid ${sv.neutralDark};
    border-radius: ${sv.defaultBorderRadius};
    position: relative;
    overflow: hidden;
  `,
  table: css`
    margin-top: ${sv.defaultMargin};
  `,
  code: css`
    position: relative;

    &:hover {
      & > [data-element="switcher"] {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  codeHidden: css`
    display: none;
  `,
  switcher: css`
    position: absolute;
    top: ${sv.defaultMargin};
    right: ${sv.defaultMargin};
    opacity: 0;
    transform: translateY(-5px);
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
  `,
  toggle: css`
    padding: ${sv.paddingExtraSmall} ${sv.paddingSmall};
    color: ${sv.colorPrimary};
    background: ${sv.neutralLight};

    &:hover {
      cursor: pointer;
      background: ${sv.neutral};
    }
  `,
};


function getMarkupForMode(mode, component) {
  if (component.length > 0) {
    console.error('More than 1 element at root level. If you want to do that, use fragments: <>...</>');
    return '';
  }
  const generatedHTMLString = ReactDOMServer.renderToStaticMarkup(component);
  const generatedJSXString = ReactElementToString(component, {
    showDefaultProps: false,
    showFunctions: true,
    functionValue: (v) => v.name,
  });
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


function replaceSymbol(value) {
  return value.replace(/Symbol\((.+)\)/gm, '$1');
}


const supportedModes = ['react', 'vanilla'];


const Playground = ({ component, children, mode, __code, enums }) => {
  const [props, setProps] = useState({});
  const [codeOpen, setCodeOpen] = useState(false);
  const [activeMode, setMode] = useState(supportedModes[0]);

  const generatedComponent = recursiveMdxTransform(children, { component, props });
  const generatedMarkup = getMarkupForMode(activeMode, generatedComponent);
  return (
    <div className={styles.playground}>
      <div className={styles.codeWrapper}>
        <Preview raw={activeMode === 'vanilla'}>
          {activeMode === 'vanilla' ? generatedMarkup : generatedComponent}
        </Preview>
        <div className={styles.toggle} onClick={() => setCodeOpen(! codeOpen)}>
          Toggle code
        </div>
        <div className={cx(styles.code, { [styles.codeHidden]: ! codeOpen })}>
          <div className={styles.switcher} data-element="switcher">
            <ModeSwitcher
              modes={supportedModes}
              activeMode={activeMode}
              onChange={setMode} />
          </div>
          <div className={styles.codeBox}>
            <CodeBox format mode={mode}>{activeMode === 'react' && ! component ? __code : replaceSymbol(generatedMarkup)}</CodeBox>
          </div>
        </div>
      </div>
      {do{
        if (component) {
          <div className={styles.table}>
            <PropsTable
              enums={enums}
              component={component}
              activeProps={props}
              onChange={(v, n) => v === '_empty' || v === '' ? setProps(omit(props, n)) : setProps({ ...props, [n]: v })} />
          </div>
        }
      }}
    </div>
  );
};


export default Playground;
