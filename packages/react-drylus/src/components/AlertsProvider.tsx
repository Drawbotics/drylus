import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { useEffect, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 } from 'uuid';

import { themeStyles } from '../base/ThemeProvider';
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
    display: inline-flex;
    flex-direction: column-reverse;
    align-items: flex-start;
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

    [data-element='text'] {
      font-size: 0.95rem;
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
  alertEnter: css`
    opacity: 0;
    transform: translateY(-5px);
  `,
  alertEnterActive: css`
    opacity: 1;
    transform: translateY(0);
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
  `,
  alertEnterDone: css``,
  alertExit: css`
    opacity: 1;
    transform: translateY(0);
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
  `,
  alertExitActive: css`
    opacity: 0.01;
    transform: translateY(5px);
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
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
        <FlexItem flex>
          <Margin size={{ top: Size.EXTRA_SMALL, bottom: Size.EXTRA_SMALL }}>
            <span data-element="text">{text}</span>
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
        <div className={themeStyles.root}>
          <TransitionGroup className={styles.provider}>
            {alerts.map((alert: AlertProps) => (
              <CSSTransition
                key={alert.id}
                timeout={{
                  enter: 500,
                  exit: 300,
                }}
                classNames={{
                  enter: styles.alertEnter,
                  enterActive: styles.alertEnterActive,
                  exit: styles.alertExit,
                  exitActive: styles.alertExitActive,
                }}>
                <Margin size={{ top: Size.SMALL }}>
                  <Alert onClickDismiss={(id) => hideAlert(id)} {...alert} />
                </Margin>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>,
        document.getElementById('alerts-outlet') as Element,
      )}
    </Context.Provider>
  );
};

export function useAlert() {
  return React.useContext(Context);
}
