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
        checked={value}
        onChange={onChange} />
    </div>
  );
}


export default CheckboxProp;
