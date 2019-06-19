import React from 'react';
import { Input } from '@drawbotics/react-drylus';


const InputProp = ({
  prop,
  value,
  onChange,
}) => {
  const { key } = prop;
  return (
    <div>
      <Input
        name={key}
        value={value === 0 ? value : (value || '')}
        onChange={onChange} />
    </div>
  );
}


export default InputProp;
