import React from 'react';
// import 'normalize.css/normalize.css';
// import { css } from 'emotion';


// NOTE: here we also include the custom fonts

// const styles = {
//   styleProvider: css`
//     font-family: Helvetica;
//     font-size: 14px;
//   `,
// };


const StyleProvider = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};


export default StyleProvider;
