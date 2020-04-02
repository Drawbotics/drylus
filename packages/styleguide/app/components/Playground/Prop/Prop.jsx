import sv from '@drawbotics/drylus-style-vars';
import { css } from 'emotion';
import React from 'react';

import { InputProp, SelectProp, ToggleProp } from './props';
import { normalizeValue } from './utils';

const styles = {
  union: css`
    > * {
      margin-bottom: ${sv.marginSmall};
    }
  `,
};

const Prop = ({ prop, value, onChange, enums }) => {
  console.log(prop)
  const { type } = prop; 
  const propWithKey = { ...prop, key: type.name };
  switch (type.type) {
    case 'bool':
      return <ToggleProp prop={propWithKey} value={value} onChange={onChange} />;
    case 'enum':
      console.log(';we are here')
      return <SelectProp prop={propWithKey} value={value} onChange={onChange} enums={enums} />;
    case 'string':
      return <InputProp prop={propWithKey} value={value} onChange={onChange} />;
    case 'number':
      return (
        <InputProp
          prop={propWithKey}
          value={value}
          onChange={(v, n) => onChange(normalizeValue(v), n)}
        />
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
              onChange={onChange}
            />
          ))}
        </div>
      );
    default:
      // console.warn('Unknown prop', prop);
      return null;
  }
};

export default Prop;
