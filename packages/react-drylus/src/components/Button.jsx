import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';

import { Categories, Sizes, Tiers } from '../base';
import { getEnumAsClass } from '../utils';


export const styles = {
  root: css`
    background: ${sv.neutralLight};
    color: ${sv.colorPrimary};
    border-radius: ${sv.defaultBorderRadius};
    padding: calc(${sv.paddingExtraSmall} * 1.5) ${sv.defaultPadding};
    outline: 0;
    border: 0;
    transition: ${sv.defaultTransition};
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:hover {
      cursor: pointer;
      background: ${sv.neutral};
    }

    &:active {
      box-shadow: ${sv.insetActiveMedium};
    }

    &:disabled {
      cursor: not-allowed;
      background: ${sv.neutralLight} !important;
      color: ${sv.colorDisabled} !important;
      box-shadow: none;
    }
  `,
  brand: css`
    background: ${sv.brand};
    color: ${sv.white};

    &:hover {
      background: ${sv.brandDark};
    }

    &:active {
      box-shadow: ${sv.insetActive};
    }
  `,
  danger: css`
    background: ${sv.red};
    color: ${sv.white};

    &:hover {
      background: ${sv.redDark};
    }

    &:active {
      box-shadow: ${sv.insetActive};
    }
  `,
  info: css`
    background: ${sv.blue};
    color: ${sv.white};

    &:hover {
      background: ${sv.blueDark};
    }

    &:active {
      box-shadow: ${sv.insetActive};
    }
  `,
  success: css`
    background: ${sv.green};
    color: ${sv.white};

    &:hover {
      background: ${sv.greenDark};
    }

    &:active {
      box-shadow: ${sv.insetActive};
    }
  `,
  warning: css`
    background: ${sv.orange};
    color: ${sv.white};

    &:hover {
      background: ${sv.orangeDark};
    }

    &:active {
      box-shadow: ${sv.insetActive};
    }
  `,
  brandAlt: css`
    color: ${sv.brand};

    &:hover {
      color: ${sv.brandDark};
    }
  `,
  dangerAlt: css`
    color: ${sv.red};

    &:hover {
      color: ${sv.redDark};
    }
  `,
  warningAlt: css`
    color: ${sv.orange};

    &:hover {
      color: ${sv.orangeDark};
    }
  `,
  infoAlt: css`
    color: ${sv.blue};

    &:hover {
      color: ${sv.blueDark};
    }
  `,
  successAlt: css`
    color: ${sv.green};

    &:hover {
      color: ${sv.greenDark};
    }
  `,
  small: css`
    padding: ${sv.paddingExtraSmall} ${sv.paddingExtraSmall};
    font-size: 0.9rem;
  `,
  large: css`
    padding: ${sv.paddingSmall} ${sv.paddingHuge};
  `,
  secondary: css`
    background: transparent;
    color: ${sv.colorPrimary};
    box-shadow: 0 0 0 1px ${sv.neutral} inset;

    &:hover {
      background: ${sv.neutralLight};
    }

    &:active {
      box-shadow: 0 0 0 1px ${sv.neutral} inset, ${sv.insetActiveLight};
    }
  `,
  tertiary: css`
    background: transparent;
    color: ${sv.blue};

    &:hover {
      background: ${sv.neutralLight};
      color: ${sv.blueDark};
    }

    &:active {
      box-shadow: ${sv.insetActiveLight};
    }
  `,
  round: css`
    border-radius: 1000px;
    height: ${sv.marginExtraLarge};
    width: ${sv.marginExtraLarge};
    padding: 0;

    i {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0;
      margin-left: -1px;
      margin-bottom: -1px;
    }
  `,
  roundSmall: css`
    height: ${sv.marginLarge};
    width: ${sv.marginLarge};

    i {
      font-size: 1rem;
      margin-bottom: -1px;
      margin-left: -1px;
    }
  `,
  fullWidth: css`
    width: 100%;
    flex: 1;
  `,
  leading: css`
    margin-right: ${sv.marginExtraSmall};
    height: 0;
    display: flex;
    align-items: center;
  `,
  trailing: css`
    margin-left: ${sv.marginExtraSmall};
    height: 0;
    display: flex;
    align-items: center;
  `,
};


const Button = ({
  children,
  disabled,
  onClick,
  category,
  size,
  tier,
  leading,
  trailing,
  fullWidth,
  style,
}) => {
  if (! children && trailing && leading) {
    throw new Error('If no children are given, only pass trailing or leading, but not both');
  }
  const round = ! children && (trailing || leading);
  return (
    <button
      style={style}
      onClick={onClick}
      className={cx(styles.root, {
        [styles[getEnumAsClass(size)]]: size,
        [styles.round]: round,
        [styles.roundSmall]: round && size === Sizes.SMALL,
        [styles[getEnumAsClass(category)]]: category && tier === Tiers.PRIMARY,
        [styles[getEnumAsClass(tier)]]: tier,
        [styles[`${category?.description?.toLowerCase()}Alt`]]: category && tier !== Tiers.PRIMARY,
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
    </button>
  );
}


Button.propTypes = {
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

  /** Used for style overrides */
  style: PropTypes.object,
};


Button.defaultProps = {
  size: Sizes.DEFAULT,
  tier: Tiers.PRIMARY,
};


export default Button;
