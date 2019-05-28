import React from 'react';
import { SegmentedControl } from '@drawbotics/react-drylus';


const ModeSwitcher = ({ activeMode, modes, onChange }) => {
  return (
    <SegmentedControl
      value={activeMode}
      onChange={onChange}
      options={modes.map((mode) => ({ value: mode, label: mode }))} />
  );
};


export default ModeSwitcher;
