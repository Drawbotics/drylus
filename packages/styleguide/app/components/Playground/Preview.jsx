import sv from '@drawbotics/drylus-style-vars';
import { Button, Icon, Size, Tier } from '@drawbotics/react-drylus';
import { css, cx } from '@emotion/css';
import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';

const styles = {
  preview: css`
    position: relative;
    padding: ${sv.defaultPadding};
    background: ${sv.white};

    &:hover {
      [data-element='toggles'] {
        opacity: 1;
        pointer-events: auto;
      }
    }
  `,
  fullScreen: css`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    height: 100%;
    width: 100%;
    overflow: scroll;
    border-radius: ${sv.defaultBorderRadius};
  `,
  fullScreenToggles: css`
    display: flex;
    position: absolute;
    z-index: 99999;
    bottom: ${sv.marginExtraSmall};
    right: ${sv.marginExtraSmall};
    pointer-events: none;
    opacity: 0;
  `,
  floating: css`
    position: fixed;
    bottom: ${sv.marginSmall};
    right: ${sv.marginSmall};
  `,
};

const Preview = ({ children, raw, onClickRefresh }) => {
  const [fullScreen, setFullScreen] = useState(false);

  const content = (
    <div
      className={cx(styles.preview, {
        [styles.fullScreen]: fullScreen,
      })}>
      <div
        className={cx(styles.fullScreenToggles, {
          [styles.floating]: fullScreen,
        })}
        data-element="toggles">
        {onClickRefresh && (
          <Button
            onClick={onClickRefresh}
            size={Size.SMALL}
            tier={Tier.TERTIARY}
            trailing={<Icon name="refresh-cw" />}
          />
        )}
        <Button
          onClick={() => setFullScreen(!fullScreen)}
          size={Size.SMALL}
          tier={Tier.TERTIARY}
          trailing={<Icon name={fullScreen ? 'minimize' : 'maximize'} />}
        />
      </div>
      {raw
        ? <div dangerouslySetInnerHTML={{ __html: children }} />
        : <Fragment>{children}</Fragment>
      }
    </div>
  );

  if (fullScreen) {
    const target = document.querySelector('[data-element="layout-content"]');
    if (target) {
      return ReactDOM.createPortal(content, target);
    }
  }

  return content;
};

export default Preview;
