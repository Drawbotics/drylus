import React, { lazy, Suspense } from 'react';

import { ThemeProviderProps } from './ThemeProvider';
import { ThemeProvider } from './ThemeProvider';

const LazyAlertsProvider = lazy(() =>
  import('../components/AlertsProvider').then((m) => ({ default: m.AlertsProvider })),
);

export interface DrylusProviderProps extends ThemeProviderProps {
  /**
   * If true, the AlertsProvider is included, enabling the useAlert() hook.
   * When false (default), AlertsProvider and its dependencies are excluded from the bundle.
   * @default false
   */
  enableAlerts?: boolean;
}

export const DrylusProvider = ({
  children,
  style,
  className,
  baseColor,
  injectGlobal,
  enableAlerts = false,
}: DrylusProviderProps) => {
  return (
    <ThemeProvider
      injectGlobal={injectGlobal}
      baseColor={baseColor}
      style={style}
      className={className}>
      {enableAlerts ? (
        <Suspense fallback={children}>
          <LazyAlertsProvider>{children}</LazyAlertsProvider>
        </Suspense>
      ) : (
        children
      )}
    </ThemeProvider>
  );
};
