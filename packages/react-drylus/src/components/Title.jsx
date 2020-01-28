import React from 'react';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import Enum from '@drawbotics/enums';

import { useResponsiveProps } from '../utils/hooks';
import { deprecateProperty } from '../utils';
import { Align } from '../enums';


const styles = {
  root: css`
    color: ${sv.colorPrimary};
    font-weight: 300;
  `,
  h1: css`
    font-size: 3.4rem;
    
    @media ${sv.screenL} {
      font-size: 2.8rem;
    }
  `,
  h2: css`
    font-size: 2.4rem;

    @media ${sv.screenL} {
      font-size: 2rem;
    }
  `,
  h3: css`
    font-size: 2rem;

    @media ${sv.screenL} {
      font-size: 1.6rem;
    }
  `,
  h4: css`
    font-size: 1.3rem;
    font-weight: 400;

    @media ${sv.screenL} {
      font-size: 1.1rem;
    }
  `,
  noMargin: css`
    margin-top: 0;
    margin-bottom: 0;
  `,
  alignRight: css`
    text-align: right;
  `,
  alignCenter: css`
    text-align: center;
  `,
};


/**
 * @deprecated and will be removed in version 6.0
 */
export const TitleAlign = deprecateProperty(new Enum(
  'CENTER',
  'LEFT',
  'RIGHT',
), 'TitleAlign', 'Align');


const Title = ({
  responsive,
  ...rest
}) => {
  const {
    children,
    size,
    noMargin,
    style,
    align,
  } = useResponsiveProps(rest, responsive);

  if (size === 1) {
    return (
      <h1
        style={style}
        className={cx(styles.root, styles.h1, {
          [styles.noMargin]: noMargin,
          [styles.alignCenter]: align === Align.CENTER,
          [styles.alignRight]: align === Align.RIGHT,
        })}>
        {children}
      </h1>
    );
  }
  else if (size === 2) {
    return (
      <h2
        style={style}
        className={cx(styles.root, styles.h2, {
          [styles.noMargin]: noMargin,
          [styles.alignCenter]: align === Align.CENTER,
          [styles.alignRight]: align === Align.RIGHT,
        })}>
        {children}
      </h2>
    );
  }
  else if (size === 3) {
    return (
      <h3
        style={style}
        className={cx(styles.root, styles.h3, {
          [styles.noMargin]: noMargin,
          [styles.alignCenter]: align === Align.CENTER,
          [styles.alignRight]: align === Align.RIGHT,
        })}>
        {children}
      </h3>
    );
  }
  else if (size === 4) {
    return (
      <h4
        style={style}
        className={cx(styles.root, styles.h4, {
          [styles.noMargin]: noMargin,
          [styles.alignCenter]: align === Align.CENTER,
          [styles.alignRight]: align === Align.RIGHT,
        })}>
        {children}
      </h4>
    );
  }
  else {
    console.warn('Unsupported title size');
    return '';
  }
};


Title.propTypes = {
  /** Text displayed by the title */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),

  /** Each number is equivalent to the h[n] in html, smaller value equals larger title */
  size: PropTypes.oneOf([1, 2, 3, 4]),

  /** Use this if you dont want the component to set margin. By default it has some top and bottom margin since it is a textual component */
  noMargin: PropTypes.bool,

  /** Used for style overrides */
  style: PropTypes.object,

  align: PropTypes.oneOf([
    Align.CENTER,
    Align.LEFT,
    Align.RIGHT,
  ]),

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


Title.defaultProps = {
  size: 1,
  align: Align.LEFT, 
};


export default Title;
