import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';
import sv from '@drawbotics/drylus-style-vars';

import { Categories, Sizes } from '../enums';
import Tooltip from '../components/Tooltip';
import { getEnumAsClass } from '../utils';
import { useResponsiveProps } from '../utils/hooks';


const styles = {
  root: css`
    border-radius: 1000px;
    height: ${sv.marginLarge};
    width: ${sv.marginLarge};
    color: ${sv.colorPrimary};
    background: ${sv.neutral};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-top: 2px;
    text-transform: uppercase;
    overflow: hidden;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
  small: css`
    height: ${sv.defaultMargin};
    width: ${sv.defaultMargin};
    font-size: 0.8rem;
    padding-top: 1px;
  `,
  large: css`
    height: ${sv.marginExtraLarge};
    width: ${sv.marginExtraLarge};
    font-size: 1.1rem;
    padding-top: 0;
  `,
  danger: css`
    color: ${sv.white};
    background: ${sv.red};
  `,
  info: css`
    color: ${sv.white};
    background: ${sv.blue};
  `,
  success: css`
    color: ${sv.white};
    background: ${sv.green};
  `,
  warning: css`
    color: ${sv.white};
    background: ${sv.orange};
  `,
  brand: css`
    color: ${sv.white};
    background: ${sv.brand};
  `,
  customBackground: css`
    color: ${sv.white};
  `,
};


const Avatar = ({
  responsive,
  ...rest,
}) => {
  const {
    image,
    text,
    size,
    category,
    backgroundColor,
    hint,
    style,
  } = useResponsiveProps(rest, responsive);

  const customSize = typeof size === 'number';
  const avatar = (
    <div className={cx(styles.root, {
      [styles[getEnumAsClass(category)]]: category,
      [styles[! customSize && getEnumAsClass(size)]]: size,
      [styles.customBackground]: backgroundColor,
    })} style={{
      backgroundColor,
      height: customSize ? size : undefined,
      width: customSize ? size : undefined,
      fontSize: customSize ? size * 0.5 : undefined,
      ...style,
    }}>
      {do {
        if (image) {
          <img src={image} />
        }
        else if (text) {
          text.substring(0, 2)
        }
      }}
    </div>
  );
  if (hint) {
    return (
      <Tooltip content={hint}>
        {avatar}
      </Tooltip>
    );
  }
  else {
    return avatar;
  }
};


Avatar.propTypes = {
  /** Image url. Takes the full background of the avatar if given, will be fit to cover surface. Takes precedence over text */
  image: PropTypes.string,

  /** Text to be displayed within the avatar. It scales with the size, and will be limited to 2 characters max. */
  text: PropTypes.string,

  /** Text shown when the avatar is hovered */
  hint: PropTypes.string,

  /** Size of the avatar */
  size: PropTypes.oneOfType([
    PropTypes.oneOf([Sizes.SMALL, Sizes.DEFAULT, Sizes.LARGE]),
    PropTypes.number,
  ]),

  /** Category of the avatar */
  category: PropTypes.oneOf([
    Categories.DANGER,
    Categories.INFO,
    Categories.SUCCESS,
    Categories.WARNING,
    Categories.BRAND,
  ]),

  /** Custom override for the background color, useful for profiles */
  backgroundColor: PropTypes.string,

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


Avatar.defaultProps = {
  style: {},
};


export default Avatar;
