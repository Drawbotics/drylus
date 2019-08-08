import React from 'react';
import JSONPretty from 'react-json-pretty';
import sv from '@drawbotics/drylus-style-vars';


const PropsInfo = ({
  props
}) => {
  return (
    <div style={{ textAlign: 'left' }}>
      <JSONPretty data={props} theme={{
        main: `line-height: 1.3; color: ${sv.brand}; overflow: auto;`,
        key: `color: ${sv.green};`,
        string: `color: ${sv.blueLight};`,
        value: `color:${sv.orange};`,
        boolean: `color: ${sv.red};`,
      }} />
    </div>
  );
};


export default PropsInfo;
