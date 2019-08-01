import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';

import { Categories } from '../base';
import Icon from './Icon';
import Dot from './Dot';


const styles = {
  root: css`
    margin: 0;
    padding-left: ${sv.paddingExtraLarge};
    list-style: none;
    counter-reset: custom-counter;
  `,
  ordered: css`
    > li {
      counter-increment: custom-counter;

      &::before {
        position: absolute;
        left: calc(${sv.marginSmall} * -1.2);
        top: calc(50% - 1px);
        transform: translate(-25%, -50%);
        content: counter(custom-counter) ". ";
      }

      > i, [data-element="dot"] {
        display: none;
      }
    }
  `,
  item: css`
    position: relative;
    color: ${sv.colorPrimary};
    margin-bottom: ${sv.marginExtraSmall};

    &:last-of-type {
      margin-bottom: 0;
    }

    > i, [data-element="dot"] {
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


export const ListItem = ({
  children,
  icon,
  category,
  disabled,
}) => {
  return (
    <li className={cx(styles.item, { [styles.disabled]: disabled })}>
      {children}
      {do {
        if (icon) {
          <Icon name={icon} category={category === Categories.PRIMARY ? null : category} bold />
        }
        else {
          <div data-element="dot">
            <Dot category={disabled ? null : category} />
          </div>
        }
      }}
    </li>
  );
};


ListItem.propTypes = {
  /** Content of the list item */
  children: PropTypes.node.isRequired,

  category: PropTypes.oneOf([
    Categories.BRAND,
    Categories.DANGER,
    Categories.SUCCESS,
    Categories.INFO,
    Categories.WARNING,
    Categories.PRIMARY,
  ]),

  /** If passed, the specified icon will be displayed instead of the bullet */
  icon: PropTypes.string,

  /** If true the item is less visible */
  disabled: PropTypes.bool,
};

ListItem.defaultProps = {
  category: Categories.PRIMARY,
};


const List = ({ children, ordered }) => {
  if (ordered) {
    return (
      <ol className={cx(styles.root, styles.ordered)}>
        {children}
      </ol>
    );
  }
  return (
    <ul className={styles.root}>
      {children}
    </ul>
  );
};


List.propTypes = {
  /** Items to display in the list */
  children: PropTypes.node.isRequired,

  ordered: PropTypes.bool,
};


List.defaultProps = {
  ordered: false,
};


export default List;
