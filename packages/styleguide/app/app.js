import React from 'react';
import { css } from 'emotion';
// import sv from '@drawbotics/style-vars';
import { ThemeProvider, Page } from '@drawbotics/react-drylus/base';
import { Layout, Content } from '@drawbotics/react-drylus/layout';
import { Footer, Navbar } from '@drawbotics/react-drylus/components';

// vanilla import, will be in head for link and script
// import drylus from  '@drawbotics/vanilla-drylus/dist/drylus.js';
// import '@drawbotics/vanilla-drylus/dist/drylus.css';

// import Buttons from 'showcase/buttons';


const styles = {
  app: css`
  `,
  fakeContent: css`
    height: 700px;
    border: 4px solid black;
  `,
};


const App = () => {
  return (
    <ThemeProvider>
      <Page>
        <Layout
          top={<Navbar />}
          bottom={<Footer />}>
          <Content fullHeight>
            <div className={styles.fakeContent}>
              Hello
            </div>
          </Content>
        </Layout>
      </Page>
    </ThemeProvider>
  );
};


export default App;
