import sv from '@drawbotics/drylus-style-vars';
import { css } from 'emotion';
import React from 'react';

import { extractIntrinsics } from '../utils';
import { InputProp, SelectProp, ToggleProp } from './props';
import { normalizeValue } from './utils';

const styles = {
  stacked: css`
    > * {
      margin-bottom: ${sv.marginSmall};
    }
  `,
};

function _isIntrinsic(type) {
  return typeof type === 'string' && ['boolean', 'number', 'string'].includes(type);
}

function _isNumberStringUnion(array) {
  return array.length === 2 && array.includes('string') && array.includes('number');
}

const Prop = ({ prop, name, value, onChange, enums }) => {
  const { type } = prop;
  const propWithKey = { ...prop, key: name };
  const typeName = type.name === 'IconValues' ? type.name : type?.type ?? type;
  switch (typeName) {
    case 'boolean':
      return <ToggleProp prop={propWithKey} value={value} onChange={onChange} />;
    case 'enum':
      const { variants, nonVariants } = extractIntrinsics(type.values);
      const updatedType = { ...type, values: variants };
      return (
        <div className={nonVariants.length > 0 ? styles.stacked : 'test'}>
          <SelectProp
            prop={{ ...propWithKey, type: updatedType }}
            value={value}
            onChange={onChange}
            enums={enums}
            isEnum={true}
          />
          {nonVariants.map((type, i) => (
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
    case 'React Node':
    case 'IconValues':
    case 'string':
      return <InputProp prop={propWithKey} value={value} onChange={(v, n) => onChange(normalizeValue(v), n)} />;
    case 'number':
      return (
        <InputProp
          prop={propWithKey}
          value={value}
          onChange={(v, n) => onChange(normalizeValue(v), n)}
        />
      );
    case 'union':
      if (type.values.some((v) => v === 'string')) {
        return (
          <InputProp
            prop={propWithKey}
            value={value}
            onChange={(v, n) => onChange(normalizeValue(v), n)}
          />
        );
      }
      // Show only one input box for props that accept `string | number`
      if (_isNumberStringUnion(type.values)) {
        return (
          <InputProp
            prop={propWithKey}
            value={value}
            onChange={(v, n) => onChange(normalizeValue(v), n)}
          />
        );
      }
      if (
        type.values.every((v) => !_isIntrinsic(v)) &&
        type.values.every((v) => typeof v !== 'object')
      ) {
        return (
          <SelectProp
            prop={propWithKey}
            value={value}
            onChange={onChange}
            enums={enums}
            isEnum={false}
          />
        );
      } else if (type.values.every((v) => _isIntrinsic(v))) {
        return (
          <div className={styles.stacked}>
            {prop.type.values.map((type, i) => (
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
      }
      return null;
    default:
      return null;
  }
};

export default Prop;
