import React from 'react';
import { LiveProvider, LivePreview } from 'react-live';


const Preview = ({ children, component }) => {
  const componentName = component.displayName || component.name;
  if (! componentName) {
    console.warn('Component has no name, won\'t render');
    return null;
  }
  return (
    <div style={{ marginTop: '40px' }}>
      <LiveProvider code={children} scope={{ [componentName]: component }}>
        <LivePreview />
      </LiveProvider>
    </div>
  );
};


export default Preview;
