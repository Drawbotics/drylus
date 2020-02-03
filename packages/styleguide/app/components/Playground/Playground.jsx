import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import flow from 'lodash/flow';
import omit from 'lodash/omit';
import React, { useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactElementToString from 'react-element-to-jsx-string';

import CodeBox from './CodeBox';
import ModeSwitcher from './ModeSwitcher';
import Preview from './Preview';
import PropsTable from './PropsTable';
import { adaptForVanilla, hideSecrets, recursiveMdxTransform, replaceSymbol } from './utils';

const styles = {
  playground: css``,
  codeWrapper: css`
    padding: ${sv.paddingExtraSmall};
    background: ${sv.neutralLight};
    border-radius: ${sv.defaultBorderRadius};
    position: relative;

    &:hover {
      cursor: pointer;
      background: ${sv.neutral};

      & > * {
        cursor: auto;
      }
    }
  `,
  table: css`
    margin-top: ${sv.defaultMargin};
  `,
  code: css`
    position: relative;
    margin-top: ${sv.marginExtraSmall};

    &:hover {
      & > [data-element='switcher'] {
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
    z-index: 10;
  `,
  toggle: css`
    padding: ${sv.paddingSmall};
    padding-top: ${sv.paddingExtraSmall};
    padding-bottom: 0;
    color: ${sv.blue};

    &:hover {
      cursor: pointer;
    }
  `,
};

function getMarkupForMode(mode, component) {
  if (component.length > 0) {
    console.error(
      'More than 1 element at root level. If you want to do that, use fragments: <>...</>',
    );
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

const supportedModes = ['react', 'vanilla'];

const Playground = ({ component, children, mode, __code, enums }) => {
  const [props, setProps] = useState({});
  const [codeOpen, setCodeOpen] = useState(false);
  const [activeMode, setMode] = useState(supportedModes[0]);
  const childrenRef = useRef();
  const parentRef = useRef();

  const staticReact = mode === 'jsx';

  const generatedComponent = recursiveMdxTransform(children, { component, props });
  const generatedMarkup = staticReact ? null : getMarkupForMode(activeMode, generatedComponent);

  return (
    <div className={styles.playground}>
      <div
        ref={parentRef}
        className={styles.codeWrapper}
        onClick={(e) =>
          !childrenRef.current.contains(e.target) && parentRef.current.contains(e.target)
            ? setCodeOpen(!codeOpen)
            : null
        }>
        <div ref={childrenRef}>
          <Preview raw={activeMode === 'vanilla'}>
            {activeMode === 'vanilla' ? generatedMarkup : generatedComponent}
          </Preview>
          <div className={cx(styles.code, { [styles.codeHidden]: !codeOpen })}>
            {do {
              if (!staticReact) {
                <div className={styles.switcher} data-element="switcher">
                  <ModeSwitcher modes={supportedModes} activeMode={activeMode} onChange={setMode} />
                </div>;
              }
            }}
            <div className={styles.codeBox}>
              <CodeBox format mode={mode} type={activeMode} style={{ margin: 0 }}>
                {staticReact ? __code : flow(replaceSymbol, hideSecrets)(generatedMarkup)}
              </CodeBox>
            </div>
          </div>
        </div>
        <div className={styles.toggle}>Toggle code</div>
      </div>
      {do {
        if (component) {
          <div className={styles.table}>
            <PropsTable
              enums={enums}
              component={component}
              activeProps={props}
              onChange={(v, n) =>
                v === '_empty' || v === ''
                  ? setProps(omit(props, n))
                  : setProps({ ...props, [n]: v })
              }
            />
          </div>;
        }
      }}
    </div>
  );
};

export default Playground;
