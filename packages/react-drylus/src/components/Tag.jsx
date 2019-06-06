import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';

import Categories from '../base/Categories';
import Icon from './Icon';


const styles = {
  root: css`
    display: inline-flex;
    align-items: center;
    padding: 5px;
    background: ${sv.neutralLight};
    color: ${sv.colorPrimary};
    border-radius: ${sv.defaultBorderRadius};
    font-size: 0.85rem;

    > i {
      font-size: 0.85rem;
      margin-left: 5px;
      margin-bottom: -1px;
      color: ${sv.colorSecondary};

      &:hover {
        color: inherit;
      }
    }
  `,
  brand: css`
    background: ${sv.brandLight};
  `,
  danger: css`
    background: ${sv.redLight};
  `,
  success: css`
    background: ${sv.greenLight};
  `,
  warning: css`
    background: ${sv.orangeLight};
  `,
  info: css`
    background: ${sv.blueLight};
  `,
};


const Tag = ({
  children,
  category,
  onClickRemove,
}) => {
  return (
    <div className={cx(styles.root, {
      [styles[category?.toLowerCase()]]: category,
    })}>
      {children}
      {do {
        if (onClickRemove) {
          <Icon name="x" onClick={onClickRemove} />
        }
      }}
    </div>
  );
};


Tag.propTypes = {
  children: PropTypes.string.isRequired,

  category: PropTypes.oneOf([
    Categories.BRAND,
    Categories.DANGER,
    Categories.SUCCESS,
    Categories.INFO,
    Categories.WARNING,
  ]),

  /** If present, an X icon is shown on the right of the tag, and the function is called when that icon is clicked */
  onClickRemove: PropTypes.func,
};


Tag.defaultProps = {
  category: Categories.DEFAULT,
};


export default Tag;
