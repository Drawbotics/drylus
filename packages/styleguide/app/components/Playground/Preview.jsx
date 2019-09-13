import React, { Fragment, useState } from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/drylus-style-vars';
import { TextLink, Icon } from '@drawbotics/react-drylus';


const styles = {
  preview: css`
    position: relative;
    padding: ${sv.defaultPadding};
    background: ${sv.white};

    &:hover {
      [data-element="full-screen-toggle"] {
        opacity: 1;
        pointer-events: auto;
      }
    }
  `,
  fullScreen: css`
    position: fixed;
    top: ${sv.marginExtraSmall};
    left: ${sv.marginExtraSmall};
    z-index: 9999;
    min-height: calc(100vh - ${sv.marginSmall});
    min-width: calc(100vw - ${sv.marginSmall});
    overflow: hidden;
    border-radius: ${sv.defaultBorderRadius};
  `,
  fullScreenToggle: css`
    position: absolute;
    bottom: ${sv.marginExtraSmall};
    right: ${sv.marginExtraSmall};
    pointer-events: none;
    opacity: 0;
  `,
};


const Preview = ({ children, raw }) => {
  const [ fullScreen, setFullScreen ] = useState(false);
  
  return (
    <div className={cx(styles.preview, { [styles.fullScreen]: fullScreen })}>
      <div className={styles.fullScreenToggle} data-element="full-screen-toggle">
        <div onClick={() => setFullScreen(! fullScreen)}>
          <TextLink>
            <Icon name={fullScreen ? 'minimize' : 'maximize'} />
          </TextLink>
        </div>
      </div>
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
