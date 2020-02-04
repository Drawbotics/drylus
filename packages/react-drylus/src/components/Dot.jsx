import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';

import Category from '../enums/Category';
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
    <div
      style={style}
      className={cx(styles.root, {
        [styles[getEnumAsClass(category)]]: category,
      })}
    />
  );
};

Dot.propTypes = {
  /** Determines the background color of the badge */
  category: PropTypes.oneOf([
    Category.BRAND,
    Category.SUCCESS,
    Category.INFO,
    Category.WARNING,
    Category.DANGER,
    Category.PRIMARY,
  ]),

  /** Used for style overrides */
  style: PropTypes.object,
};

export default Dot;
