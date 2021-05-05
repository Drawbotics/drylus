import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

import { Category, Position, Shade } from '../enums';
import { ListTile } from '../layout';
import { Responsive, Style } from '../types';
import { Deprecated, getEnumAsClass, useResponsiveProps } from '../utils';
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
    z-index: 99999;
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
  bottom: css`
    right: 0;
  `,
  top: css`
    right: 0;
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

  /**
   * If given displays an icon to the left of the title
   * @deprecated Use leading instead
   */
  icon?: IconType;

  /** If given, renders in front of the dropdown option. */
  leading?: ReactNode;

  /** @kind Category */
  category?: Category.SUCCESS | Category.WARNING | Category.DANGER;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;

  /** @private */
  onClickClose?: () => void;
}

export const DropdownOption = ({ responsive, ...rest }: DropdownOptionProps) => {
  const {
    text,
    category,
    disabled,
    onClick,
    onClickClose,
    icon,
    leading: _leading,
    style,
    className,
  } = useResponsiveProps<DropdownOptionProps>(rest, responsive);

  const leading =
    _leading != null ? (
      _leading
    ) : icon != null ? (
      <Icon name={icon} shade={category ? undefined : Shade.MEDIUM} />
    ) : null;

  return (
    <div
      style={style}
      className={cx(
        styles.option,
        {
          [styles[getEnumAsClass<typeof styles>(category)]]: category != null,
          [styles.disabled]: disabled === true,
        },
        className,
      )}
      onClick={
        disabled
          ? undefined
          : () => {
              onClickClose != null ? onClickClose() : null;
              onClick != null ? onClick() : null;
            }
      }>
      <ListTile title={text} leading={leading} />
    </div>
  );
};

DropdownOption.propTypes = {
  icon: Deprecated,
};

export interface DropdownLinkProps extends DropdownOptionProps {
  /**
   *  The component used as link, defaults to the native 'a'
   * @default 'a'
   */
  linkComponent: React.ReactNode;

  /** Url string for the link */
  href: string;
}

export const DropdownLink = ({ linkComponent = 'a', href, ...rest }: DropdownLinkProps) => {
  return React.createElement(
    linkComponent as React.ComponentClass<{ href: string }>,
    {
      href,
    },
    <DropdownOption {...rest} />,
  );
};

export interface DropdownTitleProps {
  /** Value of the title */
  text: string;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;
}

export const DropdownTitle = ({ text, style, className }: DropdownTitleProps) => {
  return (
    <div style={style} className={cx(styles.title, className)}>
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

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const Dropdown = ({ responsive, ...rest }: DropdownProps) => {
  const { children, trigger, side = Position.BOTTOM, style, className } = useResponsiveProps<
    DropdownProps
  >(rest, responsive);

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
    <div style={style} className={cx(styles.wrapper, className)}>
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
