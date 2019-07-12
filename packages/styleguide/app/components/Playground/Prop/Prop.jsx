import React from 'react';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';

import {
  SelectProp,
  InputProp,
  ToggleProp,
} from './props';
import { normalizeValue } from './utils';


const styles = {
  union: css`
    > * {
      margin-bottom: ${sv.marginSmall};
    }
  `,
};


const Prop = ({
  name,
  prop,
  value,
  onChange,
  enums,
}) => {
  const { name: type } = prop.type;
  const propWithKey = { ...prop, key: name };
  switch (type) {
    case 'bool':
      return (
        <ToggleProp prop={propWithKey} value={value} onChange={onChange} />
      );
    case 'enum':
      return (
        <SelectProp prop={propWithKey} value={value} onChange={onChange} enums={enums} />
      );
    case 'string':
      return (
        <InputProp prop={propWithKey} value={value} onChange={onChange} />
      );
    case 'number':
      return (
        <InputProp prop={propWithKey} value={value} onChange={(v, n) => onChange(normalizeValue(v), n)} />
      );
    case 'union':
      return (
        <div className={styles.union}>
          {prop.type.value.map((type, i) => (
            <Prop
              key={i}
              name={name}
              prop={{ type }}
              enums={enums}
              value={value}
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
