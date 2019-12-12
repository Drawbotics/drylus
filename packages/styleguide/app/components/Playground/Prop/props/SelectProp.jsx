import React from 'react';
import { Select } from '@drawbotics/react-drylus';

import { normalizeValue, displayValue } from '../utils';


const SelectProp = ({
  prop,
  value,
  onChange,
  enums,
}) => {
  const { key, type } = prop;
  const { value: values } = type;
  const isEnum = value?.description;
  const finalValue = isEnum ? (values[0].value.split('.')[0] || '') + '.' + (value?.description || value) : normalizeValue(value);
  return (
    <div style={{ minWidth: 200 }}>
      <Select
        name={key}
        value={value ? finalValue : '_empty'}
        options={[ {
          label: 'none',
          value: '_empty',
        }, ...values.map((v) => ({
          label: isEnum ? `${displayValue(v.value)}` : `${normalizeValue(v.value)}`,
          value: isEnum ? displayValue(v.value) : normalizeValue(v.value),
        }))]}
        onChange={(v, k) => onChange(normalizeValue(v, enums), k)} />
    </div>
  );
}


export default SelectProp;
