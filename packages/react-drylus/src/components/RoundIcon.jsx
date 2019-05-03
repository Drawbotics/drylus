import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';

import Icon from './Icon';
import { Categories, Sizes } from '../base';


const styles = {
  base: css`
    border-radius: 1000px;
    height: ${sv.defaultMargin};
    width: ${sv.defaultMargin};
    color: ${sv.colorPrimaryInverse};
    background: ${sv.neutralDark};
    display: flex;
    align-items: center;
    justify-content: center;

    > i {
      font-size: 1.1rem;
      margin-top: 1px;
    }
  `,
  small: css`
    height: ${sv.marginSmall};
    width: ${sv.marginSmall};

    > i {
      font-size: 0.65rem;
    }
  `,
  danger: css`
    background: ${sv.red};
  `,
  info: css`
    background: ${sv.blue};
  `,
  success: css`
    background: ${sv.green};
  `,
  warning: css`
    background: ${sv.orange};
  `,
  brand: css`
    background: ${sv.brand};
  `,
};


const RoundIcon = ({ name, size=Sizes.DEFAULT, category }) => {
  return (
    <div className={cx(styles.base, {
      [styles[category?.toLowerCase()]]: category,
      [styles[size?.toLowerCase()]]: size,
    })}>
      <Icon name={name} bold />
    </div>
  );
}


RoundIcon.propTypes = {
  /** Name of the icon */
  name: PropTypes.string.isRequired,

  /** Size of the icon */
  size: PropTypes.oneOf([Sizes.SMALL, Sizes.DEFAULT]),

  /** Category of the icon */
  category: PropTypes.oneOf([
    Categories.DANGER,
    Categories.INFO,
    Categories.SUCCESS,
    Categories.WARNING,
    Categories.BRAND,
  ]),
};


RoundIcon.defaultProps = {
  size: Sizes.DEFAULT,
};


export default RoundIcon;
