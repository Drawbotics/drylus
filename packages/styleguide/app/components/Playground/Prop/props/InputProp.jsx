import React from 'react';
import { Input } from '@drawbotics/react-drylus';


const SelectProp = ({
  prop,
  value,
  onChange,
}) => {
  const { key } = prop;
  return (
    <div>
      <Input
        name={key}
        value={value}
        onChange={onChange} />
    </div>
  );
}


export default SelectProp;
