import React from 'react';

import { Button, StyleProvider } from '@drawbotics/react-drylus';


const App = () => {
  return (
    <StyleProvider>
      <div>
        <h1>
          Docs
        </h1>
        <Button>click me</Button>
      </div>
    </StyleProvider>
  );
};


export default App;
