import React from 'react';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';
import { Button, ThemeProvider } from '@drawbotics/react-drylus';

// vanilla import, will be in head for link and script
// import drylus from  '@drawbotics/vanilla-drylus/dist/drylus.js';
// import '@drawbotics/vanilla-drylus/dist/drylus.css';


const styles = {
  app: css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
  `,
  component: css`
    margin-top: ${sv.baseMargin};
  `,
};


const App = () => {
  return (
    <ThemeProvider>
      <div className={styles.app}>
        <div className={styles.component}>
          <Button>Button Text</Button>
        </div>
        <div className={styles.component}>
          <Button type="danger">Button Text</Button>
        </div>
        <div className={styles.component}>
          <Button type="info">Button Text</Button>
        </div>
        <div className={styles.component}>
          <Button type="success">Button Text</Button>
        </div>
        <div className={styles.component}>
          <Button type="warning">Button Text</Button>
        </div>
        <div className={styles.component}>
          <Button disabled>Button Text</Button>
        </div>
      </div>
    </ThemeProvider>
  );
};


export default App;
