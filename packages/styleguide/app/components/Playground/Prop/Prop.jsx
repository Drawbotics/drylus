import React from 'react';

import { SelectProp, InputProp } from './props';


const Prop = ({
  name,
  prop,
  value,
  onChange,
}) => {
  const { name: type } = prop.type;
  const propWithKey = { ...prop, key: name };
  // console.log(name, type, prop.type.value);
  switch (type) {
    // case 'bool':
    //   return (
    //     <CheckboxProp prop={propWithKey} value={value} onChange={onChange} />
    //   );
    case 'enum':
      return (
        <SelectProp prop={propWithKey} value={value} onChange={onChange} />
      );
    case 'string':
      return (
        <InputProp prop={propWithKey} value={value} onChange={onChange} />
      );
    default:
      // console.warn('Unknown prop', prop);
      return null;
  }
};


export default Prop;
