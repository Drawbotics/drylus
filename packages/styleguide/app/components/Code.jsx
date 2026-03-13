import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import Highlight, { defaultProps } from 'prism-react-renderer';
import React from 'react';

import theme from '../utils/code-theme';

const ROBOTO_MONO_URL = 'https://fonts.googleapis.com/css?family=Roboto+Mono';
if (typeof document !== 'undefined' && !document.querySelector(`link[href="${ROBOTO_MONO_URL}"]`)) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = ROBOTO_MONO_URL;
  document.head.appendChild(link);
}

const styles = {
  codeWrapper: css`
    overflow: hidden;
    display: flex;
    border-radius: ${sv.defaultBorderRadius};
    margin: ${sv.defaultMargin} 0;
    -webkit-transform: translateZ(0);
  `,
  code: css`
    overflow: scroll;
    flex: 1;
    padding: ${sv.paddingSmall};
    margin: 0;
    box-shadow: inset 0px 6px 8px -6px ${sv.grey900}, inset 0px -6px 8px -6px ${sv.grey900};

    * {
      font-family: 'Roboto Mono', monospace !important;
    }
  `,
};

const Code = ({ children, className, style: styleProp }) => {
  const language = className?.replace(/language-/, '');

  return (
    <Highlight {...defaultProps} theme={theme} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className={styles.codeWrapper} style={styleProp}>
          <pre className={cx(className, styles.code)} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
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
