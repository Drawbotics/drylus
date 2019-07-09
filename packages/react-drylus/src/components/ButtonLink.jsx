import React from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

import { Categories, Sizes, Tiers } from '../base';
import { getEnumAsClass } from '../utils';
import { styles } from './Button';


const ButtonLink = ({
  children,
  disabled,
  onClick,
  category,
  size,
  tier,
  leading,
  trailing,
  fullWidth,
}) => {
  if (! children && trailing && leading) {
    throw new Error('If no children are given, only pass trailing or leading, but not both');
  }
  const round = ! children && (trailing || leading);
  return (
    <span
      onClick={onClick}
      className={cx(styles.root, {
        [styles[getEnumAsClass(size)]]: size,
        [styles[getEnumAsClass(tier)]]: tier,
        [styles.round]: round,
        [styles.roundSmall]: round && size === Sizes.SMALL,
        [styles[getEnumAsClass(category)]]: category && tier === Tiers.PRIMARY,
        [styles.fullWidth]: fullWidth,
      })}
      disabled={disabled}>
      {do{
        if (leading) {
          <div className={cx({ [styles.leading]: ! round })}>
            {leading}
          </div>
        }
      }}
      {children}
      {do{
        if (trailing) {
          <div className={cx({ [styles.trailing]: ! round })}>
            {trailing}
          </div>
        }
      }}
    </span>
  );
}


ButtonLink.propTypes = {
  /** Just text for the button */
  children: PropTypes.string,

  /** Disables the button click */
  disabled: PropTypes.bool,

  /** Triggered after the button is clicked */
  onClick: PropTypes.func,

  category: PropTypes.oneOf([
    Categories.BRAND,
    Categories.DANGER,
    Categories.SUCCESS,
    Categories.INFO,
    Categories.WARNING,
  ]),

  size: PropTypes.oneOf([
    Sizes.SMALL,
    Sizes.DEFAULT,
    Sizes.LARGE,
  ]),

  tier: PropTypes.oneOf([
    Tiers.PRIMARY,
    Tiers.SECONDARY,
    Tiers.TERTIARY,
  ]),

  /** Shown in front of the button text, can be a Spinner or Icon */
  leading: PropTypes.node,

  /** Shown after the button text, can be a Spinner or Icon */
  trailing: PropTypes.node,

  /** Makes button take the full width of the container */
  fullWidth: PropTypes.bool,
};


ButtonLink.defaultProps = {
  size: Sizes.DEFAULT,
  tier: Tiers.PRIMARY,
};


export default ButtonLink;
