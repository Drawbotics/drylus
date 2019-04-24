import React from 'react';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';
import { Button, Icon } from '@drawbotics/react-drylus/components';


const styles = {
  component: css`
    margin-top: ${sv.baseMargin};
  `,
};


const Buttons = () => {
  return (
    <div>
      <div className={styles.component}>
        <Button>Button Text</Button>
      </div>
      <div className={styles.component}>
        <Button type="danger">Button Text</Button>
      </div>
      <div className={styles.component}>
        <Button type="info">Button Text</Button>
      </div>
      <div className={styles.component}>
        <Button type="success">Button Text</Button>
      </div>
      <div className={styles.component}>
        <Button type="warning">Button Text</Button>
      </div>
      <div className={styles.component}>
        <Button tier="secondary">Button Text</Button>
      </div>
      <div className={styles.component}>
        <Button tier="tertiary">Button Text</Button>
      </div>
      <div className={styles.component}>
        <Button><Icon name="activity" /></Button>
      </div>
      <div className={styles.component}>
        <Button>
          <Icon name="activity" />
          Button Text
        </Button>
      </div>
      <div className={styles.component}>
        <Button disabled>
          Button Text
          <Icon name="activity" />
        </Button>
      </div>
      <div className={styles.component}>
        <Button size="small">
          Button Text
          <Icon name="activity" />
        </Button>
      </div>
      <div className={styles.component}>
        <Button size="large">Button Text</Button>
      </div>
    </div>
  );
};


export default Buttons;
