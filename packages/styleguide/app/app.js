import React from 'react';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';
import { ThemeProvider, Page } from '@drawbotics/react-drylus/base';
import { Layout, Content } from '@drawbotics/react-drylus/layout';

// vanilla import, will be in head for link and script
// import drylus from  '@drawbotics/vanilla-drylus/dist/drylus.js';
// import '@drawbotics/vanilla-drylus/dist/drylus.css';

import Sidebar from './components/Sidebar';
import Renderer from './components/Renderer';

import Button from './showcase/Button.mdx';


const styles = {
  app: css`
  `,
  wrapper: css`
    height: 100%;
    padding: ${sv.basePadding};
    display: flex;
    flex-direction: column;
  `,
  fakeContent: css`
    flex: 1;
  `,
};


const App = () => {
  return (
    <ThemeProvider>
      <Page>
        <Layout left={<Sidebar />}>
          <Content fullHeight>
            <div className={styles.wrapper}>
              <div className={styles.fakeContent}>
                <div>
                  The code will go below
                </div>
                <Renderer>
                  <Button />
                </Renderer>
              </div>
            </div>
          </Content>
        </Layout>
      </Page>
    </ThemeProvider>
  );
};


export default App;
