import React from 'react';
import { css } from '../temp';

import { Button, StyleProvider } from '@drawbotics/react-drylus';


const styles = {
  app: css`
    background: pink;
  `,
};


const App = () => {
  return (
    <StyleProvider>
      <div className={styles.app}>
        <h1>
          Docs
        </h1>
        <Button>click me</Button>
      </div>
    </StyleProvider>
  );
};


export default App;
