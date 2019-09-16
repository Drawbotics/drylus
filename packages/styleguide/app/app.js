import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import {
  DrylusProvider,
  Page,
  Layout,
  LayoutPositions,
  Content,
} from '@drawbotics/react-drylus';

import drylus from  '@drawbotics/vanilla-drylus/dist/drylus.js';
// import '@drawbotics/vanilla-drylus/dist/drylus.css';

import Sidebar from './components/Sidebar';
import LinksNavigation from './components/LinksNavigation';
import RoutesRenderer from './components/RoutesRenderer';
import pages from './pages';


window._drylus = drylus;


const App = () => {
  return (
    <BrowserRouter basename="drylus">
      <DrylusProvider>
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
            fixed>
            <Content fullHeight>
              <RoutesRenderer routes={pages} />
            </Content>
          </Layout>
        </Page>
      </DrylusProvider>
    </BrowserRouter>
  );
};


export default hot(module)(App);
