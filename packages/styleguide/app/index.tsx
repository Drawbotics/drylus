import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';

// Suppress known dev-only warnings from third-party libraries
const originalWarn = console.warn;
const originalError = console.error;
const suppressedPatterns = [
  'React Router Future Flag Warning',
  'A props object containing a "key" prop is being spread into JSX',
];
const shouldSuppress = (args: any[]) =>
  args.some((arg) => typeof arg === 'string' && suppressedPatterns.some((p) => arg.includes(p)));
console.warn = (...args: any[]) => { if (!shouldSuppress(args)) originalWarn.apply(console, args); };
console.error = (...args: any[]) => { if (!shouldSuppress(args)) originalError.apply(console, args); };

const root = createRoot(document.querySelector('#styleguide')!);
root.render(<App />);
