import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import {
  DrylusProvider,
  Page,
  Layout,
  LayoutPositions,
} from '@drawbotics/react-drylus';

import drylus from  '@drawbotics/vanilla-drylus/dist/drylus.js';
import '@drawbotics/vanilla-drylus/dist/drylus.css';

import Sidebar from './components/Sidebar';
import Root from './routes/Root';


window._drylus = drylus;


const App = () => {
  return (
    <BrowserRouter basename="drylus">
      <DrylusProvider>
        <Page>
          <Layout
            bar={<Sidebar />}
            position={LayoutPositions.LEFT}
            fixed>
            <div style={{ height: '100%' }}>
              <Root />
            </div>
          </Layout>
        </Page>
      </DrylusProvider>
    </BrowserRouter>
  );
};


export default hot(module)(App);
