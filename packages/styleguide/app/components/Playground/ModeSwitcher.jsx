import { SegmentedControl } from '@drawbotics/react-drylus';
import React, { useEffect } from 'react';

const ModeSwitcher = ({ activeMode, modes, onChange }) => {
  useEffect(() => {
    window._drylus.all();
  }, [activeMode]);

  return (
    <SegmentedControl
      value={activeMode}
      onChange={onChange}
      options={modes.map((mode) => ({ value: mode, label: mode }))}
    />
  );
};

export default ModeSwitcher;
