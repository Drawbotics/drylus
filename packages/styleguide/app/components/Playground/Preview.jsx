import React from 'react';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';


const styles = {
  preview: css`
    padding: ${sv.defaultPadding};
    border-radius: ${sv.defaultBorderRadius};
    background: ${sv.white};
    margin: ${sv.marginSmall};
  `,
};


const Preview = ({ children, raw }) => {
  return (
    <div className={styles.preview}>
      {do{
        if (raw) {
          <div dangerouslySetInnerHTML={{ __html: children }} />
        }
        else {
          <>
            {children}
          </>
        }
      }}
    </div>
  );
};


export default Preview;
