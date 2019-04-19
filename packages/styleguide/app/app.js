import React from 'react';
import { css } from 'emotion';

import { Button, StyleProvider } from '@drawbotics/react-drylus';

// vanilla import, will be in head for link and script
import '@drawbotics/vanilla-drylus/dist/drylus.js';
import '@drawbotics/vanilla-drylus/dist/drylus.css';


drylus.default.all();


const styles = {
  app: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  code: css`
    flex: 1;
    padding: 5px;
  `,
};


const App = () => {
  return (
    <StyleProvider>
      <div className={styles.app}>
        <div className={styles.code}>
          <h1>
            React
          </h1>
          <Button>click me</Button>
        </div>
        <div className={styles.code}>
          <h1>
            Vanilla
          </h1>
          <button className="Drylus-Button__base Drylus-Button__hover">click me</button>
          <div>
            <i className="Drycon Drycon-activity" />
          </div>
        </div>
      </div>
    </StyleProvider>
  );
};


export default App;
