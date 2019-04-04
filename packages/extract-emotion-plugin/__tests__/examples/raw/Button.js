import React from 'react';
import { css } from 'emotion';


const styles = {
  button: css`
    color: red;
  `,
  active: css`
    background: blue;
  `,
};


const Button = () => {
  return (
    <button className={styles.button}></button>
  );
};


export default Button;
