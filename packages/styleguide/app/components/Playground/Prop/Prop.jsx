import React from 'react';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';

import {
  SelectProp,
  InputProp,
  CheckboxProp,
} from './props';


const styles = {
  union: css`
    > * {
      margin-bottom: ${sv.marginSmall};
    }
  `,
};


function setValueFromType(value, { name: type }) {
  if (typeof value === type) {
    return value;
  }
  else if (typeof value === 'boolean' && type === 'bool') {
    return value;
  }
  else {
    return null;
  }
}


const Prop = ({
  name,
  prop,
  value,
  onChange,
}) => {
  const { name: type } = prop.type;
  const propWithKey = { ...prop, key: name };
  switch (type) {
    case 'bool':
      return (
        <CheckboxProp prop={propWithKey} value={value} onChange={onChange} />
      );
    case 'enum':
      return (
        <SelectProp prop={propWithKey} value={value} onChange={onChange} />
      );
    case 'string':
      return (
        <InputProp prop={propWithKey} value={value} onChange={onChange} />
      );
    case 'number':
      return (
        <InputProp prop={propWithKey} value={value} onChange={(v, n) => onChange(Number(v), n)} />
      );
    case 'union':
      return (
        <div className={styles.union}>
          {prop.type.value.map((type, i) => (
            <Prop
              key={i}
              name={name}
              prop={{ type }}
              value={setValueFromType(value, type)}
              onChange={onChange} />
          ))}
        </div>
      );
    default:
      // console.warn('Unknown prop', prop);
      return null;
  }
};


export default Prop;
