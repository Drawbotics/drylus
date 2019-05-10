import React from 'react';
import { Checkbox } from '@drawbotics/react-drylus';


const CheckboxProp = ({
  prop,
  value,
  onChange,
}) => {
  const { key } = prop;
  return (
    <div>
      <Checkbox
        name={key}
        value={value}
        onChange={onChange}>
        True/false
      </Checkbox>
    </div>
  );
}


export default CheckboxProp;
