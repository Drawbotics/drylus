import React, { useState } from 'react';


export const ControlledField = ({ component: Component }) => {
  const [value, setValue] = useState('');
  return (
    <div style={{ maxWidth: 250 }}>
      {React.cloneElement(Component, { value, onChange: (v) => setValue(v) })}
    </div>
  );
};
