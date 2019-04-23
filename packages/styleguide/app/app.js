import React from 'react';
import { css } from 'emotion';

import { Button, ThemeProvider } from '@drawbotics/react-drylus';

// vanilla import, will be in head for link and script
// import drylus from  '@drawbotics/vanilla-drylus/dist/drylus.js';
// import '@drawbotics/vanilla-drylus/dist/drylus.css';


const styles = {
  app: css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  `,
};


const App = () => {
  return (
    <ThemeProvider>
      <div className={styles.app}>
        <div className={styles.code}>
          <Button disabled>Button Text</Button>
        </div>
      </div>
    </ThemeProvider>
  );
};


export default App;
