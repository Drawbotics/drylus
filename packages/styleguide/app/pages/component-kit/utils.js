import React, { useState } from 'react';


export const ControlledField = ({ component: Component, style, initialValue='' }) => {
  const [ value, setValue ] = useState(initialValue);
  return (
    <div style={style}>
      {React.cloneElement(Component, { value, onChange: (v) => setValue(v), onClear: () => setValue(initialValue) })}
    </div>
  );
};


export const ControlledBoolField = ({ component: Component }) => {
  const [value, setValue] = useState(false);
  return (
    <div>
      {React.cloneElement(Component, { value, onChange: (v) => setValue(v) })}
    </div>
  );
};


export const ControlledMultiField = ({ component: Component, style }) => {
  const [values, setValues] = useState([]);
  return (
    <div style={style}>
      {React.cloneElement(Component, {
        values,
        onChange: (values) => setValues(values),
        onClear: () => setValues([]) })}
    </div>
  );
};
