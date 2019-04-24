import React from 'react';
// import { css } from 'emotion';
// import sv from '@drawbotics/style-vars';
import { ThemeProvider } from '@drawbotics/react-drylus/base';
import { Layout, Content } from '@drawbotics/react-drylus/layout';

// vanilla import, will be in head for link and script
// import drylus from  '@drawbotics/vanilla-drylus/dist/drylus.js';
// import '@drawbotics/vanilla-drylus/dist/drylus.css';

// import Buttons from 'showcase/buttons';


// const styles = {
//   app: css`
//   `,
// };


const App = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Content>
          Hello
        </Content>
      </Layout>
    </ThemeProvider>
  );
};


export default App;
