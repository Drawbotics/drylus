import sv from '@drawbotics/drylus-style-vars';
import { useScreenSize } from '@drawbotics/use-screen-size';
import { css, cx } from 'emotion';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '../base';
import { Size, Tier } from '../enums';
import { Responsive, Style } from '../types';
import { fsv, run, useResponsiveProps } from '../utils';
import { Button } from './Button';
import { Icon } from './Icon';
import { Title } from './Title';

const styles = {
  overlay: css`
    position: fixed;
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
    overflow: auto;
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
    padding-right: ${sv.paddingExtraHuge};

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
};

export interface BaseModalProps {
  /** Content rendered within the modal */
  children: React.ReactNode;

  /** Triggered when the "close" button is clicked, or when the overlay is clicked */
  onClickClose?: () => void;

  /** Fixed content at the bottom of the modal, not shown if raw is true */
  footer?: React.ReactNode;

  /**
   * Determines the minimum width of the modal
   * @default Size.DEFAULT
   * @kind Size
   */
  size?: Size.DEFAULT | Size.LARGE;

  /** Displayed at the top left of the modal window, not shown if raw is true */
  title?: string;

  /** Used for style overrides */
  style?: Style;
}

export const BaseModal = React.forwardRef<HTMLDivElement, BaseModalProps>(
  ({ children, onClickClose, footer, size = Size.DEFAULT, title, style }: BaseModalProps, ref) => (
    <div
      style={style}
      className={cx(styles.root, { [styles.large]: size === Size.LARGE })}
      ref={ref}>
      {onClickClose != null ? (
        <div className={styles.close}>
          <Button
            size={Size.SMALL}
            onClick={onClickClose}
            tier={Tier.TERTIARY}
            leading={<Icon name="x" />}
          />
        </div>
      ) : null}
      {title != null ? (
        <div className={styles.title}>
          <Title size={4} noMargin>
            {title}
          </Title>
        </div>
      ) : null}
      <div className={styles.content}>{children}</div>
      {footer != null ? <div className={styles.footer}>{footer}</div> : null}
    </div>
  ),
);

BaseModal.displayName = 'BaseModal';

const variants = {
  hidden: { opacity: 0, scale: 1.2 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      ease: fsv.bouncyTransitionCurve,
      delay: fsv.transitionTimeShort,
      duration: fsv.defaultTransitionTime,
    },
  },
};

export interface ModalProps extends BaseModalProps {
  /**
   * If true, the children are rendered without decoration, you have to style your own modal
   * @default false
   */
  raw?: boolean;

  /** Responsive prop overrides */
  responsive?: Responsive<this>;

  /** Used to override the style of the overlay */
  overlayStyle?: Style;

  /** Determines if the modal is visible or not */
  visible: boolean;

  /** Called when the animation is started, and when it's over, respectively, see https://www.framer.com/api/motion/component/#motioncallbacks.onanimationstart */
  animationCallbacks?: {
    onAnimationStart: VoidFunction;
    onAnimationComplete: VoidFunction;
  };

  /** Used for style overrides, given to outermost parent for easy access to children customisation */
  className?: string;
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
    animationCallbacks,
    overlayStyle,
    className,
  } = useResponsiveProps<ModalProps>(rest, responsive);

  const [outletElement, setOutletElement] = useState<HTMLElement>();
  const [overflowing, setOverflowing] = useState(false);
  const [previousTouchY, setTouchY] = useState<number>();
  const { screenSize, ScreenSizes } = useScreenSize();
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

  const handleEscKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClickClose?.();
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
        if (document.body.parentElement != null) {
          document.body.parentElement.style.position = 'fixed';
        }
      }
    } else {
      document.body.style.overflow = 'initial';
      document.body.style.pointerEvents = 'auto';
      if (document.body.parentElement != null) {
        document.body.parentElement.style.position = '';
      }
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      setTimeout(handleWindowResize, 300);
    }
  }, [visible]);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('keydown', handleEscKey, false);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      document.addEventListener('keydown', handleEscKey, false);
    };
  });

  if (outletElement == null) return null;

  const handleClickOutsideModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerElement.current) {
      onClickClose?.();
    }
  };

  return ReactDOM.createPortal(
    <ThemeProvider injectGlobal={false}>
      <AnimatePresence>
        {visible ? (
          <motion.div
            onAnimationComplete={animationCallbacks?.onAnimationComplete}
            onAnimationStart={animationCallbacks?.onAnimationStart}
            transition={{ duration: fsv.defaultTransitionTime, ease: 'easeInOut' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cx(styles.overlay, className)}
            style={overlayStyle}>
            <motion.div
              onMouseDown={handleClickOutsideModal}
              initial="hidden"
              animate="visible"
              variants={variants}
              exit="hidden"
              ref={containerElement}
              style={{ padding: raw ? '0' : undefined }}
              className={cx(styles.container, { [styles.alignTop]: overflowing })}>
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
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ThemeProvider>,
    document.getElementById('modals-outlet') as Element,
  );
};
