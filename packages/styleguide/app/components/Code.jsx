import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { css, cx, injectGlobal } from 'emotion';
import sv from '@drawbotics/style-vars';

import theme from '../utils/code-theme';


injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono');
`;


const styles = {
  codeWrapper: css`
    overflow: scroll;
    display: flex;
  `,
  code: css`
    flex: 1;
    padding: ${sv.paddingSmall};
    margin: 0;
    box-shadow: inset 0px 6px 8px -6px ${sv.grey900},
                inset 0px -6px 8px -6px ${sv.grey900};

    * {
      font-family: 'Roboto Mono', monospace;
    }
  `,
};


const Code = ({ children, className }) => {
  const language = className?.replace(/language-/, '');

  return (
    <Highlight {...defaultProps} theme={theme} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className={styles.codeWrapper}>
          <pre className={cx(className, styles.code)} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({line, key: i})}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({token, key})} />
                ))}
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  );
};


export default Code;
