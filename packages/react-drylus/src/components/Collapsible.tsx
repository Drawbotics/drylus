import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { ReactNode } from 'react';

import { Shade } from '../enums';
import { ListTile } from '../layout';
import { OnClickCallback, Style } from '../types';
import { Deprecated, checkComponentProps } from '../utils';
import { Icon, IconType } from './Icon';
import { Label } from './Label';
import { Toggle } from './Toggle';

const styles = {
  root: css``,
  header: css`
    display: flex;
    align-items: center;

    & [data-element='title'] {
      transition: ${sv.transitionShort};
      flex: 1;

      /* flex item */
      > div > div > div {
        display: flex;
      }
    }

    &:hover {
      cursor: pointer;

      & [data-element='title'] {
        transform: translateX(5px);
      }
    }
  `,
  arrow: css`
    margin-bottom: -2px;
    color: ${sv.colorSecondary};
  `,
  content: css`
    padding-top: ${sv.paddingExtraSmall};
  `,
  trailing: css`
    margin-left: ${sv.paddingExtraSmall};
  `,
};

export interface CollapsibleProps {
  /** Shown on the left side as a label */
  title: React.ReactNode;

  /** Determines whether the content of the collapsible is visible */
  isOpen?: boolean;

  /** The togglable content */
  children: React.ReactNode;

  /** Triggered when the arrow is clicked */
  onClick?: OnClickCallback<HTMLDivElement>;

  /**
   * If given displays an icon to the left of the title
   * @deprecated Use leading instead
   */
  icon?: IconType;

  /** If given, renders in front of the collapsible title */
  leading?: ReactNode;

  /** If given, renders after the collapsible arrow. Can be anything */
  trailing?: ReactNode;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;
}

export const Collapsible = ({
  title,
  isOpen,
  children,
  onClick,
  style,
  icon,
  leading: _leading,
  trailing,
  className,
}: CollapsibleProps) => {
  checkComponentProps({ leading: _leading }, { leading: [Icon, Toggle] });

  const leading =
    _leading != null ? _leading : icon != null ? <Icon name={icon} shade={Shade.LIGHT} /> : null;

  return (
    <div style={style} className={cx(styles.root, className)}>
      <div className={styles.header}>
        <div data-element="title" onClick={onClick}>
          <ListTile
            title={typeof title === 'string' ? <Label ellipsized>{title}</Label> : title}
            leading={leading}
          />
        </div>
        <div className={styles.arrow} onClick={onClick}>
          <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} />
        </div>
        {trailing != null ? <div className={styles.trailing}>{trailing}</div> : null}
      </div>
      {isOpen ? <div className={styles.content}>{children}</div> : null}
    </div>
  );
};

Collapsible.propTypes = {
  icon: Deprecated,
};
