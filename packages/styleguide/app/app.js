import React from 'react';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';
import { ThemeProvider, Page } from '@drawbotics/react-drylus/base';
import { Layout, Content } from '@drawbotics/react-drylus/layout';
import { Navbar } from '@drawbotics/react-drylus/components';

// vanilla import, will be in head for link and script
// import drylus from  '@drawbotics/vanilla-drylus/dist/drylus.js';
// import '@drawbotics/vanilla-drylus/dist/drylus.css';

import Sidebar from './components/Sidebar';
import CustomFooter from './components/CustomFooter';


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
  table: css`
    margin-top: ${sv.baseMargin};
    box-shadow: ${sv.elevation1};
    flex: 1;
    background: pink;
    height: 700px;
  `,
};


const App = () => {
  return (
    <ThemeProvider>
      <Page>
        <Layout
          horizontalPreference
          top={<Navbar />}
          topFixed
          // topFloating
          bottom={<CustomFooter />}
          // bottomFixed
          // bottomFloating
          right={<Sidebar />}
          rightFixed
          // left={<Sidebar />}
          leftFixed>
          <Content fullHeight>
            <div className={styles.wrapper}>
              <div className={styles.fakeContent}>
                <div>
                  Hello im the tabs
                </div>
                <div className={styles.table}>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Page>
    </ThemeProvider>
  );
};


export default App;
