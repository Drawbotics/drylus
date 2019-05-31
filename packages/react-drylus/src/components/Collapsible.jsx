import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';

import Label from './Label';
import Icon from './Icon';


const styles = {
  root: css`
  `,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  icon: css`
    margin-bottom: -2px;
    color: ${sv.colorSecondary};
    transition: ${sv.defaultTransition};

    &:hover {
      cursor: pointer;
      color: ${sv.colorPrimary};
    }
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
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Label ellipsized>{title}</Label>
        <div className={styles.icon}>
          <Icon onClick={onClick} name={isOpen ? 'chevron-up' : 'chevron-down'} />
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
  title: PropTypes.string,

  /** Determines whether the content of the collapsible is visible */
  isOpen: PropTypes.bool,

  /** The togglable content */
  children: PropTypes.node.isRequired,

  /** Triggered when the arrow is clicked */
  onClick: PropTypes.func,
};


export default Collapsible;
