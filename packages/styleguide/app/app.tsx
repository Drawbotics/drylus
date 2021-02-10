import '@drawbotics/vanilla-drylus/dist/drylus.css';

import { DrylusProvider, Layout, Page, Position } from '@drawbotics/react-drylus';
import { useScreenSize } from '@drawbotics/use-screen-size';
// @ts-ignore
import drylus from '@drawbotics/vanilla-drylus/dist/drylus.js';
import { css } from 'emotion';
import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import MobileSidebar from './components/MobileSidebar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Root } from './routes/Root';

window._drylus = drylus;

const styles = {
  app: css`
    [data-element='layout-bar'] {
      z-index: 11;
    }
  `,
};

const App = () => {
  const { screenSize, ScreenSizes } = useScreenSize();
  return (
    <div className={styles.app}>
      <BrowserRouter basename="drylus">
        <DrylusProvider>
          <Page>
            <Layout
              bar={<Sidebar />}
              position={Position.LEFT}
              fixed
              responsive={{
                L: {
                  bar: <MobileSidebar />,
                  position: Position.TOP,
                  fixed: false,
                },
              }}>
              <div
                style={{
                  height: '100%',
                  width: screenSize <= ScreenSizes.L ? '100vw' : undefined,
                }}>
                <Root />
              </div>
            </Layout>
          </Page>
        </DrylusProvider>
      </BrowserRouter>
    </div>
  );
};

export default hot(module)(App);