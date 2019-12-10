import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';

import Label from './Label';
import Icon from './Icon';


const styles = {
  root: css`
  `,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    & [data-element="title"] {
      transition: ${sv.transitionShort};
    }

    &:hover {
      cursor: pointer;

      & [data-element="title"] {
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


const Collapsible = ({
  title,
  isOpen,
  children,
  onClick,
  style,
}) => {
  return (
    <div style={style} className={styles.root}>
      <div className={styles.header} onClick={onClick}>
        <div data-element="title">
          <Label ellipsized>{title}</Label>
        </div>
        <div className={styles.icon}>
          <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} />
        </div>
      </div>
      {do {
        if (isOpen) {
          <div className={styles.content}>
            {children}
          </div>
        }
      }}
    </div>
  );
};


Collapsible.propTypes = {
  /** Shown on the left side as a label */
  title: PropTypes.string.isRequired,

  /** Determines whether the content of the collapsible is visible */
  isOpen: PropTypes.bool,

  /** The togglable content */
  children: PropTypes.node.isRequired,

  /** Triggered when the arrow is clicked */
  onClick: PropTypes.func,

  /** Used for style overrides */
  style: PropTypes.object,
};


export default Collapsible;
