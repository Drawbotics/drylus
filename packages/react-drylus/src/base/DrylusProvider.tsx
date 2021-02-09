import React from 'react';

import { AlertsProvider } from '../components';
import { Style } from '../types';
import { ThemeProvider } from './ThemeProvider';

export interface DrylusProviderProps {
  children: React.ReactNode;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;
}

export const DrylusProvider = ({ children, style, className }: DrylusProviderProps) => {
  return (
    <ThemeProvider style={style} className={className}>
      <AlertsProvider>{children}</AlertsProvider>
    </ThemeProvider>
  );
};
