import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';

import { Tiers, Sizes, Categories } from '../base';


const styles = {
  root: css`
    display: inline-block;
  `,
  bold: css`
    font-weight: bold;
  `,
  primary: css`
    color: ${sv.colorPrimary};
  `,
  secondary: css`
    color: ${sv.colorSecondary};
  `,
  tertiary: css`
    color: ${sv.colorTertiary};
  `,
  disabled: css`
    color: ${sv.colorDisabled};
  `,
  primaryInversed: css`
  color: ${sv.colorPrimaryInverse};
  `,
  secondaryInversed: css`
    color: ${sv.colorSecondaryInverse};
  `,
  tertiaryInversed: css`
    color: ${sv.colorTertiaryInverse};
  `,
  disabledInversed: css`
    color: ${sv.colorDisabledInverse};
  `,
  small: css`
    font-size: 0.9rem;
  `,
  default: css`
    font-size: 1rem;
  `,
  large: css`
    font-size: 1.1rem;
  `,
  brand: css`
    color: ${sv.brand};
  `,
  success: css`
    color: ${sv.success};
  `,
  danger: css`
    color: ${sv.danger};
  `,
  warning: css`
    color: ${sv.warning};
  `,
  info: css`
    color: ${sv.info};
  `,
};


const Text = ({
  inversed,
  bold,
  size,
  tier,
  disabled,
  children,
  category,
}) => {
  return (
    <span className={cx(styles.root, {
      [styles.bold]: bold,
      [styles.primary]: tier === Tiers.PRIMARY && ! disabled && ! inversed,
      [styles.secondary]: tier === Tiers.SECONDARY && ! disabled && ! inversed,
      [styles.tertiary]: tier === Tiers.TERTIARY && ! disabled && ! inversed,
      [styles.disabled]: disabled && ! inversed,
      [styles.primaryInversed]: tier === Tiers.PRIMARY && ! disabled && inversed,
      [styles.secondaryInversed]: tier === Tiers.SECONDARY && ! disabled && inversed,
      [styles.tertiaryInversed]: tier === Tiers.TERTIARY && ! disabled && inversed,
      [styles.disabledInversed]: disabled && inversed,
      [styles.small]: size === Sizes.SMALL,
      [styles.default]: size === Sizes.DEFAULT,
      [styles.large]: size === Sizes.LARGE,
      [styles[category?.toLowerCase()]]: category && ! disabled && ! inversed,
    })}>
      {children}
    </span>
  );
};


Text.propTypes = {
  /** Makes the text visible on dark backgrounds */
  inversed: PropTypes.bool,

  bold: PropTypes.bool,

  size: PropTypes.oneOf([Sizes.SMALL, Sizes.DEFAULT, Sizes.LARGE]),

  tier: PropTypes.oneOf([Tiers.PRIMARY, Tiers.SECONDARY, Tiers.TERTIARY]),

  /** Makes the text appear disabled, but still selectable */
  disabled: PropTypes.bool,

  children: PropTypes.string.isRequired,

  category: PropTypes.oneOf([Categories.BRAND, Categories.DANGER, Categories.SUCCESS, Categories.INFO, Categories.WARNING]),
};


Text.defaultProps = {
  inversed: false,
  bold: false,
  size: Sizes.DEFAULT,
  tier: Tiers.PRIMARY,
  disabled: false,
  children: '',
};


export default Text;
