import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';

import Categories from '../base/Categories';


const styles = {
  root: css`
    display: inline-block;
    border-radius: 1000px;
    height: ${sv.marginExtraSmall};
    width: ${sv.marginExtraSmall};
    background: ${sv.neutral};
  `,
  brand: css`
    background: ${sv.brand};
  `,
  success: css`
    background: ${sv.green};
  `,
  danger: css`
    background: ${sv.red};
  `,
  warning: css`
    background: ${sv.orange};
  `,
  info: css`
    background: ${sv.blue};
  `,
};


const Dot = ({ category }) => {
  return (
    <div className={cx(styles.root, {
      [styles[category?.toLowerCase()]]: category,
    })} />
  );
};


Dot.propTypes = {
  /** Determines the background color of the badge */
  category: PropTypes.oneOf([
    Categories.BRAND,
    Categories.SUCCESS,
    Categories.INFO,
    Categories.WARNING,
    Categories.DANGER,
  ]),
};


export default Dot;
