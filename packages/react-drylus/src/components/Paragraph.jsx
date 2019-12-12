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
    line-height: calc(${sv.defaultLineHeight} * 1.5);
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
export const ParagraphAlign = deprecateProperty(new Enum(
  'CENTER',
  'LEFT',
  'RIGHT',
), 'ParagraphAlign', 'Align');


const Paragraph = ({
  responsive,
  ...rest,
}) => {
  const {
    children,
    style,
    align,
  } = useResponsiveProps(rest, responsive);
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


Paragraph.defaultProps = {
  align: Align.LEFT,
};


export default Paragraph;
