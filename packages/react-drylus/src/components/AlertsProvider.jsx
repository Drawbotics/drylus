import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import React, { useEffect, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import v4 from 'uuid/v4';

import { styles as themeStyles } from '../base/ThemeProvider';
import { Category, Size, Tier } from '../enums';
import { Flex, FlexAlign, FlexItem, FlexJustify, Margin } from '../layout';
import { getEnumAsClass } from '../utils';
import Button from './Button';
import Icon from './Icon';

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

function _getIconForCategory(category) {
  switch (category) {
    case Category.DANGER:
      return 'alert-circle';
    case Category.SUCCESS:
      return 'check-circle';
    case Category.WARNING:
      return 'alert-triangle';
    default:
      return 'info';
  }
}

export const Alert = ({ id, text, category, onClickDismiss, hideDelay }) => {
  const icon = _getIconForCategory(category);

  useEffect(() => {
    if (category !== Category.DANGER) {
      setTimeout(() => onClickDismiss(id), hideDelay);
    }
  }, []);

  return (
    <div
      className={cx(styles.root, {
        [styles[getEnumAsClass(category)]]: category,
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
              onClick={() => onClickDismiss(id)}
              tier={Tier.TERTIARY}
              leading={<Icon name="x" />}
            />
          </Margin>
        </FlexItem>
      </Flex>
    </div>
  );
};

Alert.propTypes = {
  /** Text shown within the alert */
  text: PropTypes.string.isRequired,

  category: PropTypes.oneOf([Category.DANGER, Category.SUCCESS, Category.INFO, Category.WARNING])
    .isRequired,

  /** Triggered when the dismiss button is clicked */
  onClickDismiss: PropTypes.func,

  /** If you need to manually hide the alert, you can pass your own ID to call hide */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Amount of milliseconds before the alert is dismissed (except for danger) */
  hideDelay: PropTypes.number,
};

Alert.defaultProps = {
  hideDelay: 4000,
};

const Context = React.createContext();

function reducer(alerts, action) {
  const { type, payload } = action;
  if (type === 'showAlert') {
    return [...alerts, payload.alert];
  } else if (type === 'hideAlert') {
    return alerts.filter((a) => payload.id !== a.id);
  } else {
    return alerts;
  }
}

const AlertsProvider = ({ children }) => {
  const [outletElement, setOutletElement] = useState(null);
  const [alerts, dispatch] = useReducer(reducer, []);

  const hideAlert = (id) => {
    dispatch({ type: 'hideAlert', payload: { id } });
  };

  const showAlert = (alertProps) => {
    const id = v4();
    const alert = { id, ...alertProps };
    dispatch({ type: 'showAlert', payload: { alert } });
  };

  useEffect(() => {
    if (!document.getElementById('alerts-outlet')) {
      const alertsOutlet = document.createElement('div');
      alertsOutlet.id = 'alerts-outlet';
      document.body.appendChild(alertsOutlet);
      setOutletElement(alertsOutlet);
    } else {
      setOutletElement(document.getElementById('alerts-outlet'));
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
            {alerts.map((alert) => (
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
                  <Alert onClickDismiss={(id) => hideAlert(id, alerts)} {...alert} />
                </Margin>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>,
        document.getElementById('alerts-outlet'),
      )}
    </Context.Provider>
  );
};

AlertsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlertsProvider;

export function useAlert() {
  return React.useContext(Context);
}
