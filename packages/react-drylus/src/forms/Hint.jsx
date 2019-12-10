import React from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/drylus-style-vars';
import PropTypes from 'prop-types';

import Category from '../enums/Category';
import { getEnumAsClass } from '../utils';


const styles = {
  root: css`
    font-size: 0.8rem;
    color: ${sv.colorSecondary};
    margin-top: ${sv.marginExtraSmall};
  `,
  danger: css`
    color: ${sv.red};
  `,
}


const Hint = ({ children, category, style }) => {
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles[getEnumAsClass(category)]]: category,
      })}>
      {children}
    </div>
  );
};


Hint.propTypes = {
  /** Text displayed by the hint */
  children: PropTypes.string.isRequired,

  category: PropTypes.oneOf([ Category.DANGER ]),
  
  /** Used for style overrides */
  style: PropTypes.object,
};


export default Hint;
