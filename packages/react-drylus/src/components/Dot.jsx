import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';

import Categories from '../base/Categories';
import { getEnumAsClass } from '../utils';


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
  primary: css`
    background: ${sv.colorPrimary};
  `,
};


const Dot = ({ category, style }) => {
  return (
    <div style={style} className={cx(styles.root, {
      [styles[getEnumAsClass(category)]]: category,
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
    Categories.PRIMARY,
  ]),

  /** Used for style overrides */
  style: PropTypes.object,
};


export default Dot;
