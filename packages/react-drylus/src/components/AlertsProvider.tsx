import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import { v4 } from 'uuid';

import { ThemeProvider } from '../base/ThemeProvider';
import { Category, Size, Tier } from '../enums';
import { Flex, FlexAlign, FlexItem, FlexJustify, Margin } from '../layout';
import { getEnumAsClass, getIconForCategory } from '../utils';
import { Button } from './Button';
import { Icon } from './Icon';

const styles = {
  provider: css`
    position: fixed;
    z-index: 99999;
    bottom: ${sv.defaultMargin};
    left: ${sv.defaultMargin};
    width: 100%;
    pointer-events: none;
  `,
  root: css`
    display: inline-block;
    position: relative;
    padding: ${sv.paddingExtraSmall};
    padding-left: ${sv.defaultPadding};
    background: ${sv.white};
    border-radius: ${sv.defaultBorderRadius};
    box-shadow: ${sv.elevation2}, inset 0px 0px 0px 1px ${sv.neutralLight};
    max-width: 400px;
    color: ${sv.colorPrimary};
    overflow: hidden;
    pointer-events: auto;

    [data-element='text'] {
      font-size: 0.95em;
    }

    [data-element='icon'] {
      margin-top: -1px;
    }

    &::after {
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      width: 5px;
      height: 100%;
    }
  `,
  danger: css`
    [data-element='icon'] {
      color: ${sv.red};
    }

    &::after {
      background: ${sv.red};
    }
  `,
  info: css`
    [data-element='icon'] {
      color: ${sv.blue};
    }

    &::after {
      background: ${sv.blue};
    }
  `,
  warning: css`
    [data-element='icon'] {
      color: ${sv.orange};
    }

    &::after {
      background: ${sv.orange};
    }
  `,
  success: css`
    [data-element='icon'] {
      color: ${sv.green};
    }

    &::after {
      background: ${sv.green};
    }
  `,
};

export interface AlertProps {
  /** Text shown within the alert */
  text: string;

  /** @kind Category  */
  category: Category.DANGER | Category.SUCCESS | Category.INFO | Category.WARNING | Category.BRAND;

  /** Triggered when the dismiss button is clicked */
  onClickDismiss?: (id?: string) => void;

  /** If you need to manually hide the alert, you can pass your own ID to call hide */
  id?: string;

  /**
   * Amount of milliseconds before the alert is dismissed (except for danger)
   * @default 4000
   */
  hideDelay?: number;
}

export const Alert = ({ id, text, category, onClickDismiss, hideDelay = 4000 }: AlertProps) => {
  const icon = getIconForCategory(category);

  useEffect(() => {
    if (category !== Category.DANGER && onClickDismiss != null) {
      setTimeout(() => onClickDismiss(id), hideDelay);
    }
  }, []);

  return (
    <div
      className={cx(styles.root, {
        [styles[getEnumAsClass<typeof styles>(category)]]: category != null,
      })}>
      <Flex justify={FlexJustify.START} align={FlexAlign.START}>
        <FlexItem>
          <Margin size={{ right: Size.SMALL, top: Size.EXTRA_SMALL }}>
            <div data-element="icon">
              <Icon name={icon} />
            </div>
          </Margin>
        </FlexItem>
        <FlexItem flex style={{ minWidth: 0 }}>
          <Margin size={{ top: Size.EXTRA_SMALL, bottom: Size.EXTRA_SMALL }}>
            <span style={{ overflowWrap: 'break-word' }} data-element="text">
              {text}
            </span>
          </Margin>
        </FlexItem>
        <FlexItem>
          <Margin size={{ left: Size.DEFAULT }}>
            <Button
              size={Size.SMALL}
              onClick={onClickDismiss != null ? () => onClickDismiss(id) : undefined}
              tier={Tier.TERTIARY}
              leading={<Icon name="x" />}
            />
          </Margin>
        </FlexItem>
      </Flex>
    </div>
  );
};

export interface AlertsContext {
  showAlert: (props: AlertProps) => void;
  hideAlert: (id?: string) => void;
}

export interface Action {
  type: 'showAlert' | 'hideAlert';
  payload: { alert?: AlertProps; id?: string };
}

const Context = React.createContext<AlertsContext>({} as AlertsContext);

function reducer(alerts: Array<AlertProps>, action: Action): Array<AlertProps> {
  const { type, payload } = action;
  if (type === 'showAlert' && payload.alert != null) {
    return [...alerts, payload.alert];
  } else if (type === 'hideAlert') {
    return alerts.filter((a) => payload.id !== a.id);
  } else {
    return alerts;
  }
}

export interface AlertsProviderProps {
  children: React.ReactNode;
}

export const AlertsProvider = ({ children }: AlertsProviderProps) => {
  const [outletElement, setOutletElement] = useState<HTMLElement>();
  const [alerts, dispatch] = useReducer(reducer, []);

  const hideAlert = (id?: string) => {
    dispatch({ type: 'hideAlert', payload: { id } });
  };

  const showAlert = (alertProps: AlertProps) => {
    const id = v4();
    const alert = { id, ...alertProps };
    dispatch({ type: 'showAlert', payload: { alert } });
  };

  useEffect(() => {
    const outlet = document.getElementById('alerts-outlet');
    if (outlet == null) {
      const alertsOutlet = document.createElement('div');
      alertsOutlet.id = 'alerts-outlet';
      document.body.appendChild(alertsOutlet);
      setOutletElement(alertsOutlet);
    } else {
      setOutletElement(outlet);
    }

    return () => {
      if (outletElement) {
        document.body.removeChild(outletElement);
      }
    };
  }, []);

  if (!outletElement) return null;

  return (
    <Context.Provider value={{ showAlert, hideAlert }}>
      {children}
      {ReactDOM.createPortal(
        <ThemeProvider injectGlobal={false}>
          <div className={styles.provider}>
            <AnimatePresence>
              {alerts.map((alert: AlertProps) => (
                <motion.div
                  key={alert.id}
                  layoutTransition={{ duration: 0.2 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5, transition: { duration: 0.3 } }}>
                  <Margin size={{ top: Size.SMALL }}>
                    <Alert onClickDismiss={(id) => hideAlert(id)} {...alert} />
                  </Margin>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ThemeProvider>,
        document.getElementById('alerts-outlet') as Element,
      )}
    </Context.Provider>
  );
};

export function useAlert() {
  return React.useContext(Context);
}
