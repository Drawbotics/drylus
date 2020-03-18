import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Category, Color } from '../enums';
import { Style } from '../types';
import { Deprecated, categoryEnumToColor, run } from '../utils';
import { Dot } from './Dot';
import { Icon, Icons } from './Icon';

const styles = {
  root: css`
    margin: 0;
    padding-left: ${sv.paddingExtraLarge};
    list-style: none;
    counter-reset: custom-counter;
    text-align: left;
    color: ${sv.colorPrimary};
  `,
  ordered: css`
    > li {
      counter-increment: custom-counter;

      &::before {
        position: absolute;
        left: calc(${sv.marginSmall} * -1.2);
        top: calc(50% - 1px);
        transform: translate(-25%, -50%);
        content: counter(custom-counter) '. ';
      }

      > i,
      [data-element='dot'] {
        display: none;
      }
    }
  `,
  item: css`
    position: relative;
    margin-bottom: ${sv.marginExtraSmall};

    &:last-of-type {
      margin-bottom: 0;
    }

    > i,
    [data-element='dot'] {
      position: absolute;
      left: calc(${sv.marginSmall} * -1.2);
      top: calc(50% - 1px);
      transform: translate(-25%, -50%);
      font-size: 1rem;
    }
  `,
  disabled: css`
    color: ${sv.colorDisabled};

    > i {
      color: ${sv.colorDisabled} !important;
    }
  `,
};

interface ListItemProps {
  /** Content of the list item */
  children: React.ReactNode;

  /** @deprecated use color instead */
  category?: Category;

  /** @default Color.PRIMARY */
  color?: Color;

  /** If passed, the specified icon will be displayed instead of the bullet */
  icon?: keyof typeof Icons;

  /** If true the item is less visible */
  disabled?: boolean;

  /** Used for style overrides */
  style?: Style;
}

export const ListItem = ({
  children,
  icon,
  category,
  disabled,
  style,
  color: _color = Color.PRIMARY,
}: ListItemProps) => {
  const color = category ? categoryEnumToColor(category) : _color;
  return (
    <li style={style} className={cx(styles.item, { [styles.disabled]: disabled })}>
      {children}
      {run(() => {
        if (icon != null) {
          return <Icon name={icon} color={color === Color.PRIMARY ? undefined : color} bold />;
        } else {
          return (
            <div data-element="dot">
              <Dot color={disabled ? undefined : color} />
            </div>
          );
        }
      })}
    </li>
  );
};

ListItem.propTypes = {
  category: Deprecated,
};

interface ListProps {
  /** Items to display in the list */
  children: React.ReactElement<typeof ListItem> | Array<React.ReactElement<typeof ListItem>>;

  /**
   * If true, list becomes an ordered list
   * @default false
   */
  ordered?: boolean;

  /** Used for style overrides */
  style?: Style;
}

export const List = ({ children, ordered = false, style }: ListProps) => {
  if (ordered) {
    return (
      <ol style={style} className={cx(styles.root, styles.ordered)}>
        {children}
      </ol>
    );
  }
  return (
    <ul style={style} className={styles.root}>
      {children}
    </ul>
  );
};