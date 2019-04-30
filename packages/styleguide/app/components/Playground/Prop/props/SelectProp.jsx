import React from 'react';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';


const styles = {
  selectProp: css`
    margin: ${sv.marginSmall} 0;
  `,
  input: css`
    height: 35px;
    width: 100%;
    display: block;
    border-radius: ${sv.defaultBorderRadius};
    border: 1px solid rgba(84, 110, 122, 0.23);
    color: rgba(0, 0, 0, 0.7);
    outline: none !important;

    &:focus: {
      border: 1px solid rgba(84, 110, 122, 0.4);
    }
  }`
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
      <select
        id={key}
        className={styles.input}
        name={key}
        value={value}
        defaultValue="_empty"
        onChange={(e) => onChange(e.target.value, e.target.name)}>
        <option value="_empty">none</option>
        {values.map((v) => (
          <option key={v.value} value={v.value.split(/[.]/).pop().replace(/'/g, '')}>
            {v.value.split(/[.]/).pop().replace(/'/g, '')}
          </option>
        ))}
      </select>
    </div>
  );
}


export default SelectProp;
