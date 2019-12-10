import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';

import Category from '../enums/Category';
import Icon from './Icon';
import { getEnumAsClass } from '../utils';


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
  inversed: css`
    color: ${sv.white};
    background: ${sv.neutralDarker};
  `,
  brandInversed: css`
    background: ${sv.brand};
  `,
  dangerInversed: css`
    background: ${sv.red};
  `,
  successInversed: css`
    background: ${sv.green};
  `,
  warningInversed: css`
    background: ${sv.orange};
  `,
  infoInversed: css`
    background: ${sv.blue};
  `,
};


const Tag = ({
  children,
  category,
  onClickRemove,
  inversed,
  style,
}) => {
  const className = inversed ? `${getEnumAsClass(category)}Inversed` : getEnumAsClass(category);
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles.inversed]: inversed,
        [styles[className]]: category,
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
    Category.BRAND,
    Category.DANGER,
    Category.SUCCESS,
    Category.INFO,
    Category.WARNING,
  ]),

  /** If present, an X icon is shown on the right of the tag, and the function is called when that icon is clicked */
  onClickRemove: PropTypes.func,

  /** Modifies the way the category is shown */
  inversed: PropTypes.bool,

  /** Used for style overrides */
  style: PropTypes.object,
};


Tag.defaultProps = {
  category: Category.DEFAULT,
};


export default Tag;
