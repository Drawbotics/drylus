import React, { useState } from 'react';


export const ControlledField = ({ component: Component, style }) => {
  const [value, setValue] = useState('');
  return (
    <div style={style}>
      {React.cloneElement(Component, { value, onChange: (v) => setValue(v), onClear: () => setValue('') })}
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
        onChange: (value, add) => add ? setValues([ ...values, value ]) : setValues(values.filter((v) => v !== value)),
        onClear: () => setValues([]) })}
    </div>
  );
};
