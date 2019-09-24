import React from 'react';
import { Toggle } from '@drawbotics/react-drylus';
import { css } from 'emotion';


const styles = {
  rightAlign: css`
    display: inline-flex;
    justify-content: flex-end;
  `,
}


const ToggleProp = ({
  prop,
  value,
  onChange,
}) => {
  const { key } = prop;
  return (
    <div className={styles.rightAlign}>
      <Toggle
        value={value || false}
        onChange={(v) => onChange(v, key)} />
    </div>
  );
}


export default ToggleProp;
