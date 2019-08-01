import React from 'react';
import PropTypes from 'prop-types';

import ThemeProvider from './ThemeProvider';
import { AlertsProvider, SplashScreenProvider } from '../components';


const DrylusProvider = ({ children, style }) => {
  return (
    <ThemeProvider style={style}>
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

  /** This prop will be passed down to ThemeProvider */
  style: PropTypes.object,
};


export default DrylusProvider;
