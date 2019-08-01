import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';
import { CSSTransition } from 'react-transition-group';

import Button from './Button';
import Title from './Title';
import Icon from './Icon';
import { Sizes, Tiers } from '../base';
import { styles as themeStyles } from '../base/ThemeProvider';


const styles = {
  overlay: css`
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: ${sv.darkOverlay};
    display: flex;
    z-index: 99999;
  `,
  container: css`
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    padding: ${sv.defaultPadding};

    > * {
      pointer-events: auto;
    }
  `,
  alignTop: css`
    align-items: flex-start;
    overflow: scroll;
  `,
  root: css`
    position: relative;
    padding: ${sv.defaultPadding};
    padding-top: calc(${sv.paddingExtraLarge} + ${sv.paddingExtraSmall});
    background: ${sv.white};
    display: flex;
    flex-direction: column;
    box-shadow: 0px 5px 15px ${sv.neutralDarker};
    min-width: 500px;
    border-radius: ${sv.defaultBorderRadius};
    overflow: hidden;

    @media ${sv.screenL} {
      min-width: auto;
      width: 100%;
    }
  `,
  large: css`
    min-width: 650px;
  `,
  title: css`
    border-bottom: 1px solid ${sv.neutralLight};
    margin: 0 calc(${sv.defaultPadding} * -1);
    margin-top: calc(${sv.defaultPadding} * -1);
    margin-bottom: ${sv.defaultMargin};
    padding: ${sv.defaultPadding};
    padding-top: 0;
  `,
  content: css`
    flex: 1;
  `,
  footer: css`
    padding: ${sv.paddingSmall};
    margin: 0 calc(${sv.defaultPadding} * -1);
    margin-bottom: calc(${sv.defaultPadding} * -1);
    margin-top: ${sv.defaultMargin};
    background: ${sv.neutralLight};
  `,
  close: css`
    position: absolute;
    top: ${sv.marginSmall};
    right: ${sv.marginSmall};
  `,
  modalEnter: css`
    opacity: 0;

    & [data-element="container"] {
      transform: scale(1.3);
      opacity: 0;
    }
  `,
  modalEnterActive: css`
    opacity: 1;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};

    & [data-element="container"] {
      transform: scale(1);
      opacity: 1;
      transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
    }
  `,
  modalExit: css`
    opacity: 1;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};

    & [data-element="container"] {
      transform: scale(1);
      opacity: 1;
    }
  `,
  modalExitActive: css`
    opacity: 0.01;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};

    & [data-element="container"] {
      transform: scale(1.2);
      opacity: 0.01;
      transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
    }
  `,
};


const BaseModal = React.forwardRef(({
  children,
  onClickClose,
  footer,
  size,
  title,
}, ref) => (
  <div className={cx(styles.root, {
    [styles.large]: size === Sizes.LARGE,
  })} ref={ref}>
    <div className={styles.close}>
      <Button size={Sizes.SMALL} onClick={onClickClose} tier={Tiers.TERTIARY} leading={<Icon name="x" />} />
    </div>
    {do {
      if (title) {
        <div className={styles.title}>
          <Title size={4} noMargin>{title}</Title>
        </div>
      }
    }}
    <div className={styles.content}>
      {children}
    </div>
    {do {
      if (footer) {
        <div className={styles.footer}>
          {footer}
        </div>
      }
    }}
  </div>
));

BaseModal.displayName = 'BaseModal';


const Modal = ({
  children,
  footer,
  visible,
  onClickClose,
  size,
  raw,
  title,
}) => {
  const [ outletElement, setOutletElement ] = useState(null);
  const [ overflowing, setOverflowing ] = useState(false);
  const overlayElement = useRef();
  const modalElement = useRef();

  useEffect(() => {
    if ( ! document.getElementById('modals-outlet')) {
      const modalsOutlet = document.createElement('div');
      modalsOutlet.id = 'modals-outlet';
      document.body.appendChild(modalsOutlet);
      setOutletElement(modalsOutlet);
    }
    else {
      setOutletElement(document.getElementById('modals-outlet'));
    }

    return () => {
      if (! visible && outletElement) {
        document.body.removeChild(outletElement);
      }
    };
  }, []);

  useEffect(() => {
    visible ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'initial';
  });

  useEffect(() => {
    const handleWindowResize = () => {
      if (modalElement.current) {
        modalElement.current.getBoundingClientRect().height > window.innerHeight ? setOverflowing(true) : setOverflowing(false);
      }
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  if (! outletElement) return '';

  const handleClickOverlay = (e) => e.target === overlayElement?.current ? onClickClose() : null;

  return ReactDOM.createPortal(
    <div className={themeStyles.root}>
      <CSSTransition
        in={visible}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles.modalEnter,
          enterActive: styles.modalEnterActive,
          exit: styles.modalExit,
          exitActive: styles.modalExitActive,
        }}>
        <div onClick={handleClickOverlay} className={styles.overlay} ref={overlayElement}>
          <div className={cx(styles.container, { [styles.alignTop]: overflowing })} data-element="container">
            {do {
              if (raw) {
                children
              }
              else {
                <BaseModal
                  size={size}
                  ref={modalElement}
                  onClickClose={onClickClose}
                  footer={footer}
                  title={title}>
                  {children}
                </BaseModal>
              }
            }}
          </div>
        </div>
      </CSSTransition>
    </div>,
    document.getElementById('modals-outlet'),
  );
  // eslint-disable-next-line no-unreachable
  return <div></div>;  // NOTE: proptypes fail if no "concrete" element is returned
};


Modal.propTypes = {
  /** Content rendered within the modal */
  children: PropTypes.node.isRequired,

  /** Fixed content at the bottom of the modal, not shown if raw is true */
  footer: PropTypes.node,

  /** Determines if the modal is visible or not */
  visible: PropTypes.bool.isRequired,

  /** Triggered when the "close" button is clicked, or when the overlay is clicked */
  onClickClose: PropTypes.func,

  /** Determines the minimum width of the modal */
  size: PropTypes.oneOf([Sizes.DEFAULT, Sizes.LARGE]),

  /** If true, the children are rendered without decoration, you have to style your own modal */
  raw: PropTypes.bool,

  /** Displayed at the top left of the modal window, not shown if raw is true */
  title: PropTypes.string,
};


Modal.defaultProps = {
  size: Sizes.DEFAULT,
  raw: false,
};



export default Modal;
