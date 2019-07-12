import React from 'react';
import PropTypes from 'prop-types';

import ThemeProvider from './ThemeProvider';
import { AlertsProvider, SplashScreenProvider } from '../components';


const DrylusProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <AlertsProvider>
        <SplashScreenProvider>
          {children}
        </SplashScreenProvider>
      </AlertsProvider>
    </ThemeProvider>
  );
};


DrylusProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export default DrylusProvider;
