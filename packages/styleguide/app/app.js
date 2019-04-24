import React from 'react';
import { css } from 'emotion';
// import sv from '@drawbotics/style-vars';
import { ThemeProvider } from '@drawbotics/react-drylus';

// vanilla import, will be in head for link and script
// import drylus from  '@drawbotics/vanilla-drylus/dist/drylus.js';
// import '@drawbotics/vanilla-drylus/dist/drylus.css';

import Buttons from 'showcase/buttons';


const styles = {
  app: css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
  `,
};


const App = () => {
  return (
    <ThemeProvider>
      <div className={styles.app}>
        <Buttons />
      </div>
    </ThemeProvider>
  );
};


export default App;
