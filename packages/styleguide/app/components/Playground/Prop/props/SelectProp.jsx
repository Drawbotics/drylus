import React from 'react';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';
import { Select } from '@drawbotics/react-drylus';

import { normalizeValue, displayValue } from '../utils';


const styles = {
  selectProp: css`
    margin: ${sv.marginSmall} 0;
  `,
};


const SelectProp = ({
  prop,
  value,
  onChange,
}) => {
  const { key, type } = prop;
  const { value: values } = type;
  return (
    <div className={styles.selectProp}>
      <Select
        name={key}
        value={value || '_empty'}
        values={[ {
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
