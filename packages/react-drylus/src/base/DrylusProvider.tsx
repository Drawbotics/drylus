import React from 'react';
import { Style } from 'src/types';

import { AlertsProvider } from '../components';
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
