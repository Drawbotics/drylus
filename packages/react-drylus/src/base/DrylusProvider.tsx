import React from 'react';

import { AlertsProvider } from '../components';
import { Style } from '../types';
import { ThemeProvider } from './ThemeProvider';

interface DrylusProviderProps {
  children: React.ReactNode;

  /** Used for style overrides */
  style?: Style;
}

export const DrylusProvider = ({ children, style }: DrylusProviderProps) => {
  return (
    <ThemeProvider style={style}>
      <AlertsProvider>{children}</AlertsProvider>
    </ThemeProvider>
  );
};
