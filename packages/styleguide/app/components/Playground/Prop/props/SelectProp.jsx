import React from 'react';
import { Select } from '@drawbotics/react-drylus';

import { normalizeValue, displayValue } from '../utils';


const SelectProp = ({
  prop,
  value,
  onChange,
}) => {
  const { key, type } = prop;
  const { value: values } = type;
  return (
    <div>
      <Select
        name={key}
        value={value || '_empty'}
        options={[ {
          label: 'none',
          value: '_empty',
        }, ...values.map((v) => ({
          label: displayValue(v.value),
          value: displayValue(v.value),
        }))]}
        onChange={(v, k) => onChange(normalizeValue(v), k)} />
    </div>
  );
}


export default SelectProp;
