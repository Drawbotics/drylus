import React from 'react';
import { css } from 'emotion';
import sv, { fade } from '@drawbotics/style-vars';
import { Icon } from '@drawbotics/react-drylus';


const styles = {
  sidebar: css`
    height: 100%;
    padding: ${sv.paddingSmall};
    background: ${sv.neutralDarkest};
  `,
  button: css`
    margin-bottom: ${sv.marginSmall};
    border-radius: 1000px;
    height: ${sv.marginLarge};
    width: ${sv.marginLarge};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${sv.white};

    &:hover {
      cursor: pointer;
      background: ${fade(sv.neutralLight, 30)};
    }
  `,
};


const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.button}>
        <Icon name="search" />
      </div>
      <div className={styles.button}>
        <Icon name="menu" />
      </div>
    </div>
  );
};


export default Sidebar;
