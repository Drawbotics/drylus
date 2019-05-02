import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  ThemeProvider,
  Page,
  Layout,
  Content,
  Navbar,
} from '@drawbotics/react-drylus';

// vanilla import, will be in head for link and script
// import drylus from  '@drawbotics/vanilla-drylus/dist/drylus.js';
import '@drawbotics/vanilla-drylus/dist/drylus.css';

import Sidebar from './components/Sidebar';
import RoutesRenderer from './components/RoutesRenderer';
import routes from './routes';


const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Page>
          <Layout
            horizontalPreference
            top={<Navbar />}
            bottom={<Navbar />}
            left={<Sidebar routes={routes} />}
            right={<Sidebar routes={routes} />}
            leftFixed>
            <Content fullHeight>
              <RoutesRenderer routes={routes} />
            </Content>
          </Layout>
        </Page>
      </ThemeProvider>
    </BrowserRouter>
  );
};


export default App;
