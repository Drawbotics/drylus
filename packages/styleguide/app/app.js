import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import {
  ThemeProvider,
  Page,
  Layout,
  LayoutPositions,
  Content,
} from '@drawbotics/react-drylus';

// vanilla import, will be in head for link and script
// import drylus from  '@drawbotics/vanilla-drylus/dist/drylus.js';
import '@drawbotics/vanilla-drylus/dist/drylus.css';

import Sidebar from './components/Sidebar';
import LinksNavigation from './components/LinksNavigation';
import RoutesRenderer from './components/RoutesRenderer';
import pages from './pages';


const App = () => {
  return (
    <BrowserRouter basename="drylus">
      <ThemeProvider>
        <Page>
          <Layout
            bar={
              <Layout
                bar={<Sidebar />}
                position={LayoutPositions.LEFT}>
                <LinksNavigation routes={pages} />
              </Layout>
            }
            position={LayoutPositions.LEFT}
            barScrollable
            fixed>
            <Content fullHeight>
              <RoutesRenderer routes={pages} />
            </Content>
          </Layout>
        </Page>
      </ThemeProvider>
    </BrowserRouter>
  );
};


export default hot(module)(App);
