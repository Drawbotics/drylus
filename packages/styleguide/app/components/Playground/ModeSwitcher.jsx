import React from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';


const styles = {
  switcher: css`
    display: flex;
    align-items: center;
  `,
  mode: css`
    padding: ${sv.paddingExtraSmall} ${sv.paddingSmall};
    border-radius: ${sv.defaultBorderRadius};
    background: ${sv.neutral};
    color: ${sv.colorPrimary};
    margin: 0 ${sv.marginExtraSmall};

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
