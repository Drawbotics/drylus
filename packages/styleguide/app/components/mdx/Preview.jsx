import React from 'react';
import { LiveProvider, LivePreview } from 'react-live';

import { Button } from '@drawbotics/react-drylus/components';


const Preview = ({ children }) => {
  return (
    <div style={{ marginTop: '40px' }}>
      <LiveProvider code={children} scope={{ Button }}>
        <LivePreview />
      </LiveProvider>
    </div>
  );
};


export default Preview;
