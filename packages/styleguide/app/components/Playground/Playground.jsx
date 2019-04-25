import React from 'react';
import { css } from 'emotion';

import CodeBox from './CodeBox';
import Preview from './Preview';


const styles = {
  playground: css`

  `,
};


const Playground = ({ component }) => {
  const generatedCode = `<Button>Hello</Button>`;
  return (
    <div className={styles.playground}>
      <Preview component={component}>
        {generatedCode}
      </Preview>
      <CodeBox>{generatedCode}</CodeBox>
    </div>
  );
};


export default Playground;
