import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  ThemeProvider,
  Page,
  Layout,
  LayoutPositions,
  Content,
  // Navbar,
} from '@drawbotics/react-drylus';

// vanilla import, will be in head for link and script
// import drylus from  '@drawbotics/vanilla-drylus/dist/drylus.js';
import '@drawbotics/vanilla-drylus/dist/drylus.css';

import Sidebar from './components/Sidebar';
import RoutesRenderer from './components/RoutesRenderer';
import pages from './pages';


const App = () => {
  return (
    <BrowserRouter basename="drylus">
      <ThemeProvider>
        <Page>
          <Layout
            // bar={<Navbar />}
            bar={<Sidebar routes={pages} />}
            position={LayoutPositions.LEFT}
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


export default App;
