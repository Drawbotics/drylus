import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { useEffect, useRef, useState } from 'react';

import { Category, Position } from '../enums';
import { Responsive, Style } from '../types';
import { getEnumAsClass, run, useResponsiveProps } from '../utils';
import { Icon, IconType } from './Icon';

const styles = {
  wrapper: css`
    position: relative;
    display: inline-block;
  `,
  trigger: css`
    &:hover {
      cursor: pointer;
    }
  `,
  root: css`
    position: absolute;
    z-index: 9999;
    top: 100%;
    margin-top: ${sv.marginExtraSmall};
    background: ${sv.white};
    border-radius: ${sv.defaultBorderRadius};
    border: 1px solid ${sv.azure};
    box-shadow: ${sv.elevation2};
    opacity: 0;
    transform: translateY(-5px);
    pointer-events: none;
    transition: all ${sv.defaultTransitionTime} ${sv.bouncyTransitionCurve};
    padding: ${sv.paddingExtraSmall} 0;
  `,
  visible: css`
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  `,
  bottom: css``,
  top: css`
    top: auto;
    bottom: 100%;
    margin-top: 0;
    margin-bottom: ${sv.marginExtraSmall};
  `,
  right: css`
    top: 0;
    margin-top: 0;
    margin-left: ${sv.marginExtraSmall};
    left: 100%;
  `,
  left: css`
    top: 0;
    margin-top: 0;
    margin-right: ${sv.marginExtraSmall};
    right: 100%;
  `,
  option: css`
    color: ${sv.colorPrimary};
    padding: 5px ${sv.paddingSmall};
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &:hover {
      cursor: pointer;
      background: ${sv.neutralLight};
    }

    > i {
      margin-right: ${sv.marginExtraSmall};
    }
  `,
  disabled: css`
    color: ${sv.colorDisabled};
    cursor: not-allowed;
    background: none;

    &:hover {
      cursor: not-allowed;
      color: ${sv.colorDisabled};
      background: none;
    }
  `,
  danger: css`
    color: ${sv.red};

    &:hover {
      color: ${sv.redDark};
      background: ${sv.redLighter};
    }
  `,
  success: css`
    color: ${sv.green};

    &:hover {
      color: ${sv.greenDark};
      background: ${sv.greenLighter};
    }
  `,
  warning: css`
    color: ${sv.orange};

    &:hover {
      color: ${sv.orangeDark};
      background: ${sv.orangeLighter};
    }
  `,
  separator: css`
    height: 1px;
    width: 100%;
    background: ${sv.neutralLight};
    margin: ${sv.marginExtraSmall} 0;
  `,
  title: css`
    padding: ${sv.paddingExtraSmall};
    font-size: 0.8rem;
    color: ${sv.colorTertiary};
    text-transform: uppercase;
  `,
};

export interface DropdownOptionProps {
  /** Text displayed in the option */
  text: string;

  /** If true, the option is not clickable */
  disabled?: boolean;

  /** Triggered when the option is clicked */
  onClick?: () => void;

  /** Name of the icon to be shown on the left side */
  icon?: IconType;

  /** @kind Category */
  category?: Category.SUCCESS | Category.WARNING | Category.DANGER;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;

  /** @private */
  onClickClose?: () => void;
}

export const DropdownOption = ({ responsive, ...rest }: DropdownOptionProps) => {
  const { text, category, disabled, onClick, onClickClose, icon, style } = useResponsiveProps<
    DropdownOptionProps
  >(rest, responsive);

  return (
    <div
      style={style}
      className={cx(styles.option, {
        [styles[getEnumAsClass<typeof styles>(category)]]: category != null,
        [styles.disabled]: disabled === true,
      })}
      onClick={
        disabled
          ? undefined
          : () => {
              onClickClose != null ? onClickClose() : null;
              onClick != null ? onClick() : null;
            }
      }>
      {run(() => {
        if (icon) {
          return <Icon name={icon} />;
        }
      })}
      {text}
    </div>
  );
};

export interface DropdownTitleProps {
  /** Value of the title */
  text: string;

  /** Used for style overrides */
  style?: Style;
}

export const DropdownTitle = ({ text, style }: DropdownTitleProps) => {
  return (
    <div style={style} className={styles.title}>
      {text}
    </div>
  );
};

export const DropdownSeparator = () => {
  return <div className={styles.separator} />;
};

export type DropdownChild =
  | React.ReactElement<typeof DropdownOption>
  | React.ReactElement<typeof DropdownTitle>
  | React.ReactElement<typeof DropdownSeparator>;

export interface DropdownProps {
  /** This will be the trigger of the dropdown, and relative to which the menu will be positioned */
  trigger?: React.ReactNode;

  /** This is the content of the dropdown menu. Can also be custom. */
  children: DropdownChild | Array<DropdownChild> | React.ReactNode;

  /** @default Position.BOTTOM */
  side?: Position;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const Dropdown = ({ responsive, ...rest }: DropdownProps) => {
  const { children, trigger, side = Position.BOTTOM, style } = useResponsiveProps<DropdownProps>(
    rest,
    responsive,
  );

  if (!React.isValidElement(trigger)) {
    console.warn('Dropdown only accepts a single child as trigger');
    return null;
  }

  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setDropdowOpen] = useState(false);

  const handleDocumentClick = (e: Event) => {
    // Needs Event because React.MouseEvent<HTMLDivElement> does not match addEventListener signature
    if (!ref.current?.contains(e.target as Node)) {
      setDropdowOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  return (
    <div style={style} className={styles.wrapper}>
      <div onClick={() => setDropdowOpen(true)} className={styles.trigger}>
        {trigger}
      </div>
      <div
        ref={ref}
        className={cx(styles.root, {
          [styles.visible]: isOpen,
          [styles[getEnumAsClass<typeof styles>(side)]]: side != null,
        })}>
        {React.Children.map(children as any, (child) => {
          if (child?.type === DropdownOption) {
            return React.cloneElement(
              child as React.ReactElement<typeof DropdownOption>,
              {
                onClickClose: () => setDropdowOpen(false),
              } as Partial<typeof DropdownOption>,
            );
          }
          return child;
        })}
      </div>
    </div>
  );
};
