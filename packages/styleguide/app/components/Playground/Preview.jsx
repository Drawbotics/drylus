import React, { Fragment } from 'react';
import { css } from 'emotion';
import sv from '@drawbotics/drylus-style-vars';


const styles = {
  preview: css`
    padding: ${sv.defaultPadding};
    background: ${sv.white};
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
          <Fragment>
            {children}
          </Fragment>
        }
      }}
    </div>
  );
};


export default Preview;
