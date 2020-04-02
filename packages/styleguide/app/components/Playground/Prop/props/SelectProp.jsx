import { Select } from '@drawbotics/react-drylus';
import React from 'react';

import { displayValue, normalizeValue } from '../utils';

const SelectProp = ({ prop, value, onChange, enums }) => {
  console.log('test', prop)
  const { key, type } = prop;
  const { values } = type;
  const isEnum = type.type === 'enum';
  const finalValue = isEnum
    ? (type?.name || '') + '.' + (value?.description || value)
    : normalizeValue(value);
  return (
    <div style={{ minWidth: 200 }}>
      <Select
        name={key}
        value={value ? finalValue : '_empty'}
        options={[
          {
            label: 'none',
            value: '_empty',
          },
          ...values.map((v) => ({
            label: isEnum ? v : `${normalizeValue(v.value)}`,
            value: isEnum ? v : normalizeValue(v.value),
          })),
        ]}
        onChange={(v, k) => { console.log({v, k}); onChange(normalizeValue(v, enums), k.toLowerCase())}}
      />
    </div>
  );
};

export default SelectProp;
