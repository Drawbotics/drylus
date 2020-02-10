import sv, { darken } from '@drawbotics/drylus-style-vars';
import Enum from '@drawbotics/enums';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';

import { Category, Shade } from '../enums';
import { getEnumAsClass } from '../utils';

const styles = {
  root: css`
    color: inherit;
    text-decoration: none;
    transition: ${sv.transitionShort};

    &:hover {
      cursor: pointer;
    }
  `,
  brand: css`
    color: ${sv.brand};

    &:hover {
      color: ${sv.brandDark};
    }
  `,
  info: css`
    color: ${sv.blue};

    &:hover {
      color: ${sv.blueDark};
    }
  `,
  success: css`
    color: ${sv.green};

    &:hover {
      color: ${sv.greenDark};
    }
  `,
  warning: css`
    color: ${sv.orange};

    &:hover {
      color: ${sv.orangeDark};
    }
  `,
  danger: css`
    color: ${sv.red};

    &:hover {
      color: ${sv.redDark};
    }
  `,
  underlinedHover: css`
    &:hover {
      text-decoration: underline !important;
    }
  `,
  underlinedAlways: css`
    text-decoration: underline !important;
  `,
  dark: css`
    color: ${sv.colorPrimary};

    &:hover {
      color: ${darken(sv.colorPrimary, 50)};
    }
  `,
  medium: css`
    color: ${sv.colorSecondary};

    &:hover {
      color: ${sv.colorPrimary};
    }
  `,
  light: css`
    color: ${sv.colorTertiary};

    &:hover {
      color: ${sv.colorSecondary};
    }
  `,
};

export const LinkUnderlined = new Enum('ALWAYS', 'HOVER');

const TextLink = ({ children, category, underlined, style, shade, ...rest }) => {
  return (
    <span
      style={style}
      className={cx(styles.root, {
        [styles[getEnumAsClass(category)]]: category,
        [styles[getEnumAsClass(shade)]]: shade,
        [styles.underlinedHover]: underlined === LinkUnderlined.HOVER,
        [styles.underlinedAlways]: underlined === LinkUnderlined.ALWAYS,
      })}
      {...rest}>
      {children}
    </span>
  );
};

TextLink.propTypes = {
  /** Text of the link */
  children: PropTypes.string,

  category: PropTypes.oneOf([
    Category.BRAND,
    Category.DANGER,
    Category.SUCCESS,
    Category.INFO,
    Category.WARNING,
  ]),

  shade: PropTypes.oneOf([Shade.DARK, Shade.MEDIUM, Shade.LIGHT]),

  underlined: PropTypes.oneOf([LinkUnderlined.ALWAYS, LinkUnderlined.HOVER]),

  /** Used for style overrides */
  style: PropTypes.object,
};

TextLink.defaultProps = {
  underlined: LinkUnderlined.HOVER,
  category: Category.INFO,
};

export default TextLink;
