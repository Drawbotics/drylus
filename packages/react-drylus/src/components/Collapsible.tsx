import sv from '@drawbotics/drylus-style-vars';
import { css } from 'emotion';
import get from 'lodash/get';
import React, { ReactNode } from 'react';

import { Shade } from '../enums';
import { ListTile } from '../layout';
import { OnClickCallback, Style } from '../types';
import { Deprecated, checkComponentProps, run } from '../utils';
import { Icon, IconType } from './Icon';
import { Label } from './Label';

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

  /** If given, renders in front of the collapsible title. For now limited to Icon */
  leading?: React.ReactElement<typeof Icon> | ReactNode;

  /** If given, renders after the collapsible arrow. Can be anything */
  trailing?: ReactNode;

  /** Used for style overrides */
  style?: Style;
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
}: CollapsibleProps) => {
  checkComponentProps({ leading: _leading }, { leading: [Icon] });

  const leading =
    _leading != null ? _leading : icon != null ? <Icon name={icon} shade={Shade.LIGHT} /> : null;
  const isValidLeading = get(leading, 'type') === Icon;

  return (
    <div style={style} className={styles.root}>
      <div className={styles.header}>
        <div data-element="title" onClick={onClick}>
          <ListTile
            title={typeof title === 'string' ? <Label ellipsized>{title}</Label> : title}
            leading={isValidLeading ? leading : null}
          />
        </div>
        <div className={styles.arrow} onClick={onClick}>
          <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} />
        </div>
        {trailing != null ? <div className={styles.trailing}>{trailing}</div> : null}
      </div>
      {run(() => {
        if (isOpen) {
          return <div className={styles.content}>{children}</div>;
        }
      })}
    </div>
  );
};

Collapsible.propTypes = {
  icon: Deprecated,
};
