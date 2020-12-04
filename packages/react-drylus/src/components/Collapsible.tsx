import sv from '@drawbotics/drylus-style-vars';
import { css } from 'emotion';
import React from 'react';

import { Shade } from '../enums';
import { ListTile } from '../layout';
import { OnClickCallback, Style } from '../types';
import { run } from '../utils';
import { Icon, IconType } from './Icon';
import { Label } from './Label';

const styles = {
  root: css``,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    & [data-element='title'] {
      transition: ${sv.transitionShort};

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
  icon: css`
    margin-bottom: -2px;
    color: ${sv.colorSecondary};
  `,
  content: css`
    padding-top: ${sv.paddingExtraSmall};
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

  /** If given displays an icon to the left of the title */
  icon?: IconType;

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
}: CollapsibleProps) => {
  return (
    <div style={style} className={styles.root}>
      <div className={styles.header} onClick={onClick}>
        <div data-element="title">
          <ListTile
            title={typeof title === 'string' ? <Label ellipsized>{title}</Label> : title}
            leading={icon != null ? <Icon name={icon} shade={Shade.LIGHT} /> : null}
          />
        </div>
        <div className={styles.icon}>
          <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} />
        </div>
      </div>
      {run(() => {
        if (isOpen) {
          return <div className={styles.content}>{children}</div>;
        }
      })}
    </div>
  );
};
