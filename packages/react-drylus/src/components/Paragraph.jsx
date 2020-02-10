import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';

import { Align } from '../enums';
import { useResponsiveProps } from '../utils/hooks';

const styles = {
  root: css`
    color: ${sv.colorPrimary};
    line-height: calc(${sv.defaultLineHeight} * 1.5);
  `,
  alignRight: css`
    text-align: right;
  `,
  alignCenter: css`
    text-align: center;
  `,
};

const Paragraph = ({ responsive, ...rest }) => {
  const { children, style, align } = useResponsiveProps(rest, responsive);
  return (
    <p
      style={style}
      className={cx(styles.root, {
        [styles.alignCenter]: align === Align.CENTER,
        [styles.alignRight]: align === Align.RIGHT,
      })}>
      {children}
    </p>
  );
};

Paragraph.propTypes = {
  /** Text displayed by the paragraph */
  children: PropTypes.node,

  /** Used for style overrides */
  style: PropTypes.object,

  align: PropTypes.oneOf([Align.CENTER, Align.LEFT, Align.RIGHT]),

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

Paragraph.defaultProps = {
  align: Align.LEFT,
};

export default Paragraph;
