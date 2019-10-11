import React from 'react';
import PropTypes from 'prop-types';

import ThemeProvider from './ThemeProvider';
import { AlertsProvider } from '../components';


const DrylusProvider = ({ children, style }) => {
  return (
    <ThemeProvider style={style}>
      <AlertsProvider>
        {children}
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
