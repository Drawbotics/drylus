import React from 'react';
import { css } from 'emotion';
import sv from '@drawbotics/drylus-style-vars';

import Logo from './Logo';


const styles = {
  sidebar: css`
    height: ${sv.marginHuge};
    padding: ${sv.paddingExtraSmall};
    background: ${sv.backgroundColor};
  `,
  logo: css`
    
  `,
};


const MoebileSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo color={sv.neutralDarkest} />
    </div>
  );
};


export default MoebileSidebar;