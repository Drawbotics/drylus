import { cx } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';

import { Category, Color, Size, Tier } from '../enums';
import { colorEnumToCategory, getEnumAsClass } from '../utils';
import { useResponsiveProps } from '../utils/hooks';
import { styles } from './Button';

const ButtonLink = ({ responsive, ...rest }) => {
  const {
    children,
    disabled,
    onClick,
    category: _category,
    size,
    tier,
    leading,
    trailing,
    fullWidth,
    style,
    color,
  } = useResponsiveProps(rest, responsive);

  if (!children && trailing && leading) {
    throw new Error('If no children are given, only pass trailing or leading, but not both');
  }
  const round = !children && (trailing || leading);

  const category = color ? colorEnumToCategory(color) : _category;

  return (
    <span
      style={style}
      onClick={onClick}
      className={cx(styles.root, {
        [styles[getEnumAsClass(size)]]: size,
        [styles[getEnumAsClass(tier)]]: tier,
        [styles.round]: round,
        [styles.roundSmall]: round && size === Size.SMALL,
        [styles[getEnumAsClass(category)]]: category && tier === Tier.PRIMARY,
        [styles.fullWidth]: fullWidth,
      })}
      disabled={disabled}>
      {do {
        if (leading) {
          <div className={cx({ [styles.leading]: !round })}>{leading}</div>;
        }
      }}
      {children}
      {do {
        if (trailing) {
          <div className={cx({ [styles.trailing]: !round })}>{trailing}</div>;
        }
      }}
    </span>
  );
};

ButtonLink.propTypes = {
  /** Just text for the button */
  children: PropTypes.string,

  /** Disables the button click */
  disabled: PropTypes.bool,

  /** Triggered after the button is clicked */
  onClick: PropTypes.func,

  category: PropTypes.oneOf([
    Category.BRAND,
    Category.DANGER,
    Category.SUCCESS,
    Category.INFO,
    Category.WARNING,
  ]),

  color: PropTypes.oneOf([Color.BRAND, Color.RED, Color.BLUE, Color.GREEN, Color.ORANGE]),

  size: PropTypes.oneOf([Size.SMALL, Size.DEFAULT, Size.LARGE]),

  tier: PropTypes.oneOf([Tier.PRIMARY, Tier.SECONDARY, Tier.TERTIARY]),

  /** Shown in front of the button text, can be a Spinner or Icon */
  leading: PropTypes.node,

  /** Shown after the button text, can be a Spinner or Icon */
  trailing: PropTypes.node,

  /** Makes button take the full width of the container */
  fullWidth: PropTypes.bool,

  /** Used for style overrides */
  style: PropTypes.object,

  /** Reponsive prop overrides */
  responsive: PropTypes.shape({
    XS: PropTypes.object,
    S: PropTypes.object,
    M: PropTypes.object,
    L: PropTypes.object,
    XL: PropTypes.object,
    HUGE: PropTypes.object,
  }),
};

ButtonLink.defaultProps = {
  size: Size.DEFAULT,
  tier: Tier.PRIMARY,
};

export default ButtonLink;
