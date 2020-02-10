import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';

import { Category, Color } from '../enums';
import { CustomPropTypes, categoryEnumToColor, getEnumAsClass } from '../utils';
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
    color: ${sv.brandDark};
  `,
  red: css`
    background: ${sv.redLight};
    color: ${sv.redDark};
  `,
  green: css`
    background: ${sv.greenLight};
    color: ${sv.greenDark};
  `,
  orange: css`
    background: ${sv.orangeLight};
    color: ${sv.orangeDark};
  `,
  blue: css`
    background: ${sv.blueLight};
    color: ${sv.blueDark};
  `,
  inversed: css`
    color: ${sv.white};
    background: ${sv.neutralDarker};
  `,
  brandInversed: css`
    background: ${sv.brand};
  `,
  redInversed: css`
    background: ${sv.red};
  `,
  greenInversed: css`
    background: ${sv.green};
  `,
  orangeInversed: css`
    background: ${sv.orange};
  `,
  blueInversed: css`
    background: ${sv.blue};
  `,
};

const Tag = ({ children, category, onClickRemove, inversed, style, color: _color }) => {
  const color = category ? categoryEnumToColor(category) : _color;
  const className = inversed ? `${getEnumAsClass(color)}Inversed` : getEnumAsClass(color);
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles.inversed]: inversed,
        [styles[className]]: color,
      })}>
      {children}
      {do {
        if (onClickRemove) {
          <Icon name="x" onClick={onClickRemove} />;
        }
      }}
    </div>
  );
};

Tag.propTypes = {
  children: PropTypes.string.isRequired,

  /** DEPRECATED */
  category: CustomPropTypes.deprecated(
    PropTypes.oneOf([
      Category.BRAND,
      Category.DANGER,
      Category.SUCCESS,
      Category.INFO,
      Category.WARNING,
    ]),
  ),

  color: PropTypes.oneOf([Color.BRAND, Color.RED, Color.BLUE, Color.GREEN, Color.ORANGE]),

  /** If present, an X icon is shown on the right of the tag, and the function is called when that icon is clicked */
  onClickRemove: PropTypes.func,

  /** Modifies the way the category is shown */
  inversed: PropTypes.bool,

  /** Used for style overrides */
  style: PropTypes.object,
};

export default Tag;
