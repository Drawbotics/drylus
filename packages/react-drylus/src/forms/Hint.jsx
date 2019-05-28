import React from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';


const styles = {
  root: css`
    font-size: 0.8rem;
    color: ${sv.colorSecondary};
    margin-top: ${sv.marginExtraSmall};
  `,
  error: css`
    color: ${sv.red};
  `,
}


const Hint = ({ children, error }) => {
  return (
    <div className={cx(styles.root, { [styles.error]: error })}>
      {children}
    </div>
  );
};


export default Hint;
