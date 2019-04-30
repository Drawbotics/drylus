import React from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';


const styles = {
  switcher: css`
    position: absolute;
    top: ${sv.marginSmall};
    right: ${sv.marginSmall};
    display: flex;
    align-items: center;
  `,
  mode: css`
    padding: ${sv.paddingExtraSmall} ${sv.paddingSmall};
    border-radius: ${sv.defaultBorderRadius};

    &:hover {
      cursor: pointer;
    }
  `,
  active: css`
    background: ${sv.neutralDark};
    color: ${sv.colorPrimaryInverse};
  `,
}


const ModeSwitcher = ({ activeMode, modes, onChange }) => {
  return (
    <div className={styles.switcher}>
      {modes.map((mode, i) => (
        <div key={i} className={cx(styles.mode, { [styles.active]: activeMode === mode })} onClick={() => onChange(mode)}>
          {mode}
        </div>
      ))}
    </div>
  );
};


export default ModeSwitcher;
