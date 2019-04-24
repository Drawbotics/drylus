import React from 'react';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';


const styles = {
  sidebar: css`
    height: 100%;
    background: ${sv.neutral};
    padding: ${sv.basePadding};
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
  `,
  longContent: css`
    height: 700px;
    width: 100%;
    flex-shrink: 0;
  `,
};


const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      This is some content sdfsdf 
      <div className={styles.longContent}>

      </div>
    </div>
  );
};


export default Sidebar;
