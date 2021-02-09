import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Size } from '../enums';
import { Responsive, Style } from '../types';
import { Deprecated, getIconContent, isFunction, useResponsiveProps } from '../utils';

const TRIGGER_DIMENSIONS = '18px';
const TOGGLE_PADDING = '3px';
const TRIGGER_OFFSET = '12px';

const styles = {
  root: css`
    padding: ${TOGGLE_PADDING};
    background: ${sv.neutral};
    border-radius: ${TRIGGER_DIMENSIONS};
    width: calc(${TRIGGER_DIMENSIONS} * 2 + ${TRIGGER_OFFSET});
    transition: ${sv.transitionShort};
    overflow: hidden;

    &:hover {
      cursor: pointer;
      background: ${sv.neutralDark};
    }
  `,
  active: css`
    background: ${sv.green} !important;

    & > [data-element='trigger'] {
      transform: translateX(calc(100% + ${TRIGGER_OFFSET} - ${TOGGLE_PADDING} * 2)) !important;
    }
  `,
  trigger: css`
    position: relative;
    height: ${TRIGGER_DIMENSIONS};
    width: ${TRIGGER_DIMENSIONS};
    border-radius: 100%;
    background: ${sv.white};
    transform: translateX(0);
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};

    &::after {
      content: ${getIconContent('check')};
      font-family: 'drycons';
      color: ${sv.white};
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: calc(${TRIGGER_DIMENSIONS} * -1);
      pointer-events: none;
    }
  `,
  disabled: css`
    background: ${sv.neutralLight} !important;

    &:hover {
      cursor: not-allowed;
      background: ${sv.neutral};
    }
  `,
};

export interface ToggleProps<T> {
  /** Triggered when toggle value is changed */
  onChange: (value: boolean, name?: T) => void;

  /** If true, toggle is not clickable */
  disabled?: boolean;

  /** Determines if toggle is active */
  value?: ((name?: T) => boolean) | boolean;

  /**
   * @default Size.DEFAULT
   * @kind Size
   * @deprecated Toggle has one size, this prop will be removed in the next major release
   */
  size?: Size.SMALL | Size.DEFAULT;

  /** Name of the form element (target.name) */
  name?: T;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const Toggle = <T extends string>({ responsive, ...rest }: ToggleProps<T>) => {
  const { onChange, disabled, value: _value, style, name, className } = useResponsiveProps<
    ToggleProps<T>
  >(rest, responsive);
  const value = isFunction(_value) ? _value(name) : _value;
  return (
    <div
      style={style}
      className={cx(
        styles.root,
        {
          [styles.active]: value === true,
          [styles.disabled]: disabled === true,
        },
        className,
      )}
      onClick={() => (disabled ? null : onChange(!value, name))}>
      <div className={styles.trigger} data-element="trigger" />
    </div>
  );
};

Toggle.propTypes = {
  size: Deprecated,
};
