import React from 'react';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';


const styles = {
  customFooter: css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: ${sv.baseMargin};
  `,
  bubble: css`
    background: ${sv.white};
    padding: ${sv.basePadding};
    border-radius: ${sv.baseBorderRadiusBig};
    box-shadow: ${sv.elevation1};
  `,
}


const CustomFooter = () => {
  return (
    <div className={styles.customFooter}>
      <div className={styles.bubble}>
        Hello
      </div>
    </div>
  );
};


export default CustomFooter;
