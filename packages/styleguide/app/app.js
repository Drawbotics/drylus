import React from 'react';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';
import { ThemeProvider, Page } from '@drawbotics/react-drylus/base';
import { Layout, Content } from '@drawbotics/react-drylus/layout';
import { Button as MyButton } from '@drawbotics/react-drylus/components';

// vanilla import, will be in head for link and script
// import drylus from  '@drawbotics/vanilla-drylus/dist/drylus.js';
import '@drawbotics/vanilla-drylus/dist/drylus.css';

import Sidebar from './components/Sidebar';
import Renderer from './components/mdx/Renderer';

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
                <MyButton>Hey</MyButton>
                <h1>
                  The code will go below
                </h1>
                <h2>
                  A bit lower
                </h2>
                <p>
                  This is a paragraph sef sdfs dfs df s dsf
                </p>
                <p>
                  This is a paragraph
                </p>
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
