import { Select } from '@drawbotics/react-drylus';
import React from 'react';

import { normalizeValue } from '../utils';

const SelectProp = ({ prop, value, onChange, enums, isEnum }) => {
  const { key, type } = prop;
  const { values } = type;
  const finalValue = isEnum
    ? (type?.name || '') + '.' + (value?.description || value)
    : value;
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
            label: `${v}`,
            value: v,
          })),
        ]}
        onChange={(v, k) => onChange(normalizeValue(v, enums), k.toLowerCase())}
      />
    </div>
  );
};

export default SelectProp;
