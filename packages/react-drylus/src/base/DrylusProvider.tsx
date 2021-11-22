import React from 'react';

import { AlertsProvider } from '../components';
import { AlertsProviderProps } from '../components';
import { ThemeProviderProps } from './ThemeProvider';
import { ThemeProvider } from './ThemeProvider';

export interface DrylusProviderProps extends ThemeProviderProps, AlertsProviderProps {}

export const DrylusProvider = ({
  children,
  style,
  className,
  baseColor,
  injectGlobal,
}: DrylusProviderProps) => {
  return (
    <ThemeProvider
      injectGlobal={injectGlobal}
      baseColor={baseColor}
      style={style}
      className={className}>
      <AlertsProvider>{children}</AlertsProvider>
    </ThemeProvider>
  );
};
