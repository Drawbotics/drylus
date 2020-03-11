import sv from '@drawbotics/drylus-style-vars';
import { useScreenSize } from '@drawbotics/use-screen-size';
import { css, cx } from 'emotion';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import { themeStyles } from '../base';
import { Size, Tier } from '../enums';
import { Responsive, Style } from '../types';
import { run, useResponsiveProps } from '../utils';
import { Button } from './Button';
import { Icon } from './Icon';
import { Title } from './Title';

const styles = {
  overlay: css`
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: ${sv.darkOverlay};
    display: flex;
    z-index: 9999;
    pointer-events: auto;
    overscroll-behavior: none;
  `,
  container: css`
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    padding: ${sv.defaultPadding};
    overscroll-behavior: none;

    > * {
      pointer-events: auto;
    }

    @media ${sv.screenL} {
      padding: ${sv.paddingSmall};
      ${'' /* To account for bottom bar in mobile */}
      padding-bottom: 100px;
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

    @media ${sv.screenL} {
      padding: ${sv.paddingSmall};
      padding-top: ${sv.paddingLarge};
    }

    @media ${sv.phonePortrait} {
      min-width: auto;
      width: 100%;
    }
  `,
  large: css`
    min-width: 650px;
  `,
  title: css`
    border-bottom: 1px solid ${sv.neutralLight};
    margin: 0 calc(${sv.defaultMargin} * -1);
    margin-top: calc(${sv.defaultMargin} * -1);
    margin-bottom: ${sv.defaultMargin};
    padding: ${sv.defaultPadding};
    padding-top: 0;

    @media ${sv.screenL} {
      margin: 0 calc(${sv.marginSmall} * -1);
      margin-top: calc(${sv.marginSmall} * -1);
      margin-bottom: ${sv.marginSmall};
      padding: ${sv.paddingSmall};
      padding-top: 0;
    }
  `,
  content: css`
    flex: 1;
  `,
  footer: css`
    padding: ${sv.paddingSmall};
    margin: 0 calc(${sv.defaultMargin} * -1);
    margin-bottom: calc(${sv.defaultMargin} * -1);
    margin-top: ${sv.defaultMargin};
    background: ${sv.neutralLight};
    border-bottom-right-radius: ${sv.defaultBorderRadius};
    border-bottom-left-radius: ${sv.defaultBorderRadius};

    @media ${sv.screenL} {
      padding: ${sv.paddingExtraSmall};
      margin: 0 calc(${sv.marginSmall} * -1);
      margin-bottom: calc(${sv.marginSmall} * -1);
      margin-top: ${sv.marginSmall};
    }
  `,
  close: css`
    position: absolute;
    top: ${sv.marginSmall};
    right: ${sv.marginSmall};

    @media ${sv.screenL} {
      top: ${sv.marginExtraSmall};
      right: ${sv.marginExtraSmall};
    }
  `,
  modalEnter: css`
    opacity: 0;

    & [data-element='container'] {
      transform: scale(1.3);
      opacity: 0;
    }
  `,
  modalEnterActive: css`
    opacity: 1;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};

    & [data-element='container'] {
      transform: scale(1);
      opacity: 1;
      transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
    }
  `,
  modalExit: css`
    opacity: 1;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};

    & [data-element='container'] {
      transform: scale(1);
      opacity: 1;
    }
  `,
  modalExitActive: css`
    opacity: 0.01;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};

    & [data-element='container'] {
      transform: scale(1.2);
      opacity: 0.01;
      transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
    }
  `,
};

interface BaseModalProps {
  /** Content rendered within the modal */
  children: React.ReactNode;

  /** Triggered when the "close" button is clicked, or when the overlay is clicked */
  onClickClose?: () => void;

  /** Fixed content at the bottom of the modal, not shown if raw is true */
  footer?: React.ReactNode;

  /**
   * Determines the minimum width of the modal
   * @default Size.DEFAULT
   */
  size?: Size.DEFAULT | Size.LARGE;

  /** Displayed at the top left of the modal window, not shown if raw is true */
  title?: string;

  /** Used for style overrides */
  style?: Style;
}

const BaseModal = React.forwardRef<HTMLDivElement, BaseModalProps>(
  ({ children, onClickClose, footer, size = Size.DEFAULT, title, style }: BaseModalProps, ref) => (
    <div
      style={style}
      className={cx(styles.root, { [styles.large]: size === Size.LARGE })}
      ref={ref}>
      <div className={styles.close}>
        <Button
          size={Size.SMALL}
          onClick={onClickClose}
          tier={Tier.TERTIARY}
          leading={<Icon name="x" />}
        />
      </div>
      {run(() => {
        if (title != null) {
          return (
            <div className={styles.title}>
              <Title size={4} noMargin>
                {title}
              </Title>
            </div>
          );
        }
      })}
      <div className={styles.content}>{children}</div>
      {run(() => {
        if (footer != null) {
          return <div className={styles.footer}>{footer}</div>;
        }
      })}
    </div>
  ),
);

BaseModal.displayName = 'BaseModal';

interface ModalProps extends BaseModalProps {
  /**
   * If true, the children are rendered without decoration, you have to style your own modal
   * @default false
   */
  raw?: boolean;

  /** Reponsive prop overrides */
  responsive?: Responsive;

  /** Determines if the modal is visible or not */
  visible: boolean;

  /**
   * Passed to the CSSTransition component to fire events at different points of the animation. See reactcommunity.org/react-transition-group docs
   * @default {}
   */
  cssTransitionCallbacks: {
    onEnter: () => void;
    onEntering: () => void;
    onEntered: () => void;
    onExit: () => void;
    onExiting: () => void;
    onExited: () => void;
  };
}

export const Modal = ({ responsive, ...rest }: ModalProps) => {
  const {
    children,
    footer,
    visible,
    onClickClose,
    size = Size.DEFAULT,
    raw = false,
    title,
    style,
    cssTransitionCallbacks = {},
  } = useResponsiveProps<ModalProps>(rest, responsive);

  const [outletElement, setOutletElement] = useState<HTMLElement>();
  const [overflowing, setOverflowing] = useState(false);
  const [previousTouchY, setTouchY] = useState<number>();
  const { screenSize, ScreenSizes } = useScreenSize();
  const overlayElement = useRef<HTMLDivElement>(null);
  const modalElement = useRef<HTMLDivElement>(null);
  const containerElement = useRef<HTMLDivElement>(null);

  const handleWindowResize = () => {
    if (modalElement.current) {
      modalElement.current.getBoundingClientRect().height > window.innerHeight
        ? setOverflowing(true)
        : setOverflowing(false);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchY(e.touches[0]?.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (modalElement?.current?.contains(e.target as Node)) {
      const touchY = e.changedTouches[0]?.clientY;
      if (previousTouchY != null && containerElement.current != null) {
        const touchDelta = Math.abs(touchY - previousTouchY);
        if (touchY > previousTouchY && touchDelta < 50) {
          containerElement.current.scrollTop -= touchDelta;
        } else if (touchY < previousTouchY && touchDelta < 50) {
          containerElement.current.scrollTop += touchDelta;
        }
      }
      if (touchY >= 0) {
        setTouchY(touchY);
      }
    }
  };

  useEffect(() => {
    const outlet = document.getElementById('modals-outlet');
    if (outlet == null) {
      const modalsOutlet = document.createElement('div');
      modalsOutlet.id = 'modals-outlet';
      document.body.appendChild(modalsOutlet);
      setOutletElement(modalsOutlet);
    } else {
      setOutletElement(outlet);
    }

    return () => {
      if (!visible && outletElement) {
        document.body.removeChild(outletElement);
      }
    };
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
      if (screenSize <= ScreenSizes.L) {
        document.body.style.pointerEvents = 'none';
        if (document.body.parentElement) {
          document.body.parentElement.style.position = 'fixed';
        }
      }
    } else {
      document.body.style.overflow = 'initial';
      document.body.style.pointerEvents = 'auto';
      if (document.body.parentElement) {
        document.body.parentElement.style.position = '';
      }
    }
  }, [visible]);

  useEffect(() => (visible ? handleWindowResize() : undefined), [visible]);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  });

  if (!outletElement) return '';

  const handleClickOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayElement?.current && onClickClose != null) {
      onClickClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={themeStyles.root}>
      <CSSTransition
        {...cssTransitionCallbacks}
        in={visible}
        timeout={300}
        mountOnEnter
        unmountOnExit
        appear
        classNames={{
          enter: styles.modalEnter,
          enterActive: styles.modalEnterActive,
          exit: styles.modalExit,
          exitActive: styles.modalExitActive,
        }}>
        <div onClick={handleClickOverlay} className={styles.overlay} ref={overlayElement}>
          <div
            ref={containerElement}
            className={cx(styles.container, { [styles.alignTop]: overflowing })}
            data-element="container">
            {run(() => {
              if (raw) {
                return children;
              } else {
                return (
                  <BaseModal
                    size={size}
                    ref={modalElement}
                    onClickClose={onClickClose}
                    footer={footer}
                    style={style}
                    title={title}>
                    {children}
                  </BaseModal>
                );
              }
            })}
          </div>
        </div>
      </CSSTransition>
    </div>,
    document.getElementById('modals-outlet') as Element,
  );
};
