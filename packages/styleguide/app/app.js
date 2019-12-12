import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import {
  DrylusProvider,
  Page,
  Layout,
  Position,
} from '@drawbotics/react-drylus';
import { useScreenSize } from '@drawbotics/use-screen-size';

import drylus from  '@drawbotics/vanilla-drylus/dist/drylus.js';
import '@drawbotics/vanilla-drylus/dist/drylus.css';

import Sidebar from './components/Sidebar';
import MobileSidebar from './components/MobileSidebar';
import Root from './routes/Root';


window._drylus = drylus;


const App = () => {
  const { screenSize, ScreenSizes } = useScreenSize();
  return (
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
              }
            }}>
            <div
              style={{
                height: '100%',
                width: screenSize <= ScreenSizes.L ? '100vw' : null,
              }}>
              <Root />
            </div>
          </Layout>
        </Page>
      </DrylusProvider>
    </BrowserRouter>
  );
};


export default hot(module)(App);
