import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';

import { Categories } from '../base';
import { getEnumAsClass } from '../utils';


const styles = {
  root: css`
    color: inherit;
    text-decoration: none;
    transition: ${sv.defaultTransition};

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
      text-decoration: underline;
    }
  `,
  underlinedAlways: css`
    text-decoration: underline;
  `,
};


export const LinkUnderlined = {
  ALWAYS: 'ALWAYS',
  HOVER: 'HOVER',
};


const Link = ({
  category,
  children,
  href,
  component,
  underlined,
  ...rest,
}) => {
  const className = cx(styles.root, {
    [styles[getEnumAsClass(category)]]: category,
    [styles.underlinedHover]: underlined === LinkUnderlined.HOVER,
    [styles.underlinedAlways]: underlined === LinkUnderlined.ALWAYS,
  });
  if (component) {
    return React.createElement(component, { ...rest, className }, children);
  }
  return (
    <a className={className} href={href} {...rest}>{children}</a>
  );
};


Link.propTypes = {
  /** This will be wrapped to serve as a link */
  children: PropTypes.node,

  href: PropTypes.string,

  category: PropTypes.oneOf([Categories.BRAND, Categories.DANGER, Categories.SUCCESS, Categories.INFO, Categories.WARNING]),

  /** If you want to use a project-specific link component you can pass it here */
  component: PropTypes.func,

  underlined: PropTypes.oneOf([ LinkUnderlined.ALWAYS, LinkUnderlined.HOVER ]),
};


export const TextLink = ({
  children,
  ...rest,
}) => {
  return (
    <Link {...rest}>{children}</Link>
  );
};


TextLink.propTypes = {
  /** Text of the link */
  children: PropTypes.string,

  href: PropTypes.string,

  category: PropTypes.oneOf([Categories.BRAND, Categories.DANGER, Categories.SUCCESS, Categories.INFO, Categories.WARNING]),

  /** If you want to use a project-specific link component you can pass it here */
  component: PropTypes.func,

  underlined: PropTypes.oneOf([ LinkUnderlined.ALWAYS, LinkUnderlined.HOVER ]),
};


TextLink.defaultProps = {
  underlined: LinkUnderlined.HOVER,
  category: Categories.INFO,
};


export default Link;
