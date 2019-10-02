import React, { useState } from 'react';
import { css } from 'emotion';
import sv from '@drawbotics/drylus-style-vars';
import { Drawer, DrawerSides } from '@drawbotics/react-drylus';

import Logo from './Logo';


const styles = {
  sidebar: css`
    height: calc(${sv.marginExtraLarge} + ${sv.marginExtraSmall});
    padding: ${sv.paddingExtraSmall};
    padding-left: ${sv.paddingSmall};
    padding-top: ${sv.paddingSmall};
  `,
  logo: css`
    height: 100%;
  `,
  content: css`
    background: ${sv.neutralDarkest};
    width: 100px;
    min-height: 100vh;
  `,
};


const MoebileSidebar = () => {
  const [ sidebarOpen, toggleSidebar ] = useState(false);
  
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo} onClick={() => toggleSidebar(true)}>
        <Logo color={sv.neutralDarkest} />
      </div>
      <Drawer
        width="auto"
        onClickOverlay={() => toggleSidebar(false)}
        visible={sidebarOpen}
        side={DrawerSides.LEFT}
        asOverlay
        raw
        responsive={{
          M: {
            width: 'auto',
          },
        }}>
        <div className={styles.content}>
          
        </div>
      </Drawer>
    </div>
  );
};


export default MoebileSidebar;