import sv, { fade } from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { ComponentClass, ReactElement, ReactNode } from 'react';

import { Size } from '../enums';
import { Padding } from '../layout';
import { Responsive, Style } from '../types';
import { useResponsiveProps } from '../utils';

const styles = {
  root: css`
    display: flex;
    align-items: flex-end;
    width: 100%;
    position: relative;

    &::after {
      content: ' ';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: ${sv.neutral};
      z-index: 1;
    }

    & > a {
      display: flex;
      text-decoration: none;
    }
  `,
  vertical: css`
    flex-direction: column;
    align-items: stretch;

    &::after {
      content: none;
    }

    & > div,
    > a > div {
      flex: 1;
      justify-content: space-between;
      color: ${sv.colorPrimary};
      border-bottom: 1px solid ${sv.neutralLight};

      &::after {
        top: 0;
        height: 100%;
        width: 0px;
      }
    }

    & > div:last-of-type {
      border-bottom: none;
    }

    & > a:last-of-type {
      > div {
        border-bottom: none;
      }
    }
  `,
  item: css`
    display: flex;
    align-items: center;
    padding: ${sv.defaultPadding} ${sv.paddingExtraLarge};
    color: ${sv.colorSecondary};
    transition: ${sv.transitionShort};
    position: relative;

    &:hover {
      cursor: pointer;
      color: ${sv.colorPrimary};
      background: ${fade(sv.neutralLight, 50)};
    }

    &::after {
      content: ' ';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0px;
      background: ${sv.brand};
      z-index: 2;
      transition: ${sv.transitionShort};
    }
  `,
  active: css`
    color: ${sv.colorPrimary};

    &::after {
      height: 3px;
    }
  `,
  verticalActive: css`
    background: ${sv.neutralLight} !important;

    &::after {
      width: 4px !important;
    }
  `,
  disabled: css`
    color: ${sv.colorDisabled} !important;

    &:hover {
      cursor: not-allowed;
      background: none;
    }

    & > [data-element='trailing'] {
      opacity: 0.5;
    }
  `,
  trailing: css`
    display: inline-block;
    margin-left: ${sv.marginExtraSmall};
  `,
};

export interface TabMenuItemProps {
  /** Text displayed in the item */
  text: string;

  /** If true, the item is set as active */
  active?: boolean;

  /** If true, the item is not clickable */
  disabled?: boolean;

  /** Triggered when the option is clicked */
  onClick?: VoidFunction;

  /** Component will be displayed on the right side of the item, works best with Spinner or Badge */
  trailing?: ReactNode;

  /** Component will be displayed on the left side of the item, works best with Spinner or Badge */
  leading?: ReactNode;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;

  /** @private */
  vertical?: boolean;
}

export const TabMenuItem = ({ responsive, ...rest }: TabMenuItemProps) => {
  const {
    text,
    disabled,
    onClick,
    trailing,
    leading,
    active,
    style,
    vertical,
  } = useResponsiveProps<TabMenuItemProps>(rest, responsive);
  return (
    <div
      style={style}
      className={cx(styles.item, {
        [styles.active]: active,
        [styles.verticalActive]: vertical && active,
        [styles.disabled]: disabled,
      })}
      onClick={disabled ? undefined : onClick}>
      {leading ? <Padding size={{ right: Size.EXTRA_SMALL }}>{leading}</Padding> : null}
      {text}
      {trailing ? <Padding size={{ left: Size.EXTRA_SMALL }}>{trailing}</Padding> : null}
    </div>
  );
};

interface TabMenuLinkProps extends TabMenuItemProps {
  /**
   *  The component used as link, defaults to the native 'a'
   * @default 'a'
   */
  linkComponent: ReactNode;

  /** Url string for the link */
  href: string;
}

export const TabMenuLink = ({ linkComponent = 'a', href, ...rest }: TabMenuLinkProps) => {
  return React.createElement(
    linkComponent as ComponentClass<{ href: string }>,
    {
      href,
    },
    <TabMenuItem {...rest} />,
  );
};

export interface TabMenuProps {
  /** Should be TabMenuItems */
  children: ReactNode;

  /**
   * If true, the tabs are rendered in a vertical fashion, by default they take the full width of the container
   * @default false
   */
  vertical?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const TabMenu = ({ responsive, ...rest }: TabMenuProps) => {
  const { children, vertical = false, style } = useResponsiveProps<TabMenuProps>(rest, responsive);
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles.vertical]: vertical,
      })}>
      {React.Children.map(children as any, (child) => {
        if (child?.type === TabMenuItem || child?.type === TabMenuLink) {
          return React.cloneElement(
            child as ReactElement<typeof TabMenuItem>,
            {
              vertical,
            } as Partial<typeof TabMenuItem>,
          );
        }
        return child;
      })}
    </div>
  );
};
