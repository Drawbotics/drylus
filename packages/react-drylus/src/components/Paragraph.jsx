import React from 'react';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import Enum from '@drawbotics/enums';


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


export const ParagraphAlign = new Enum(
  'CENTER',
  'LEFT',
  'RIGHT',
);


const Paragraph = ({
  children,
  style,
  align,
}) => {
  return (
    <p
      style={style}
      className={cx(styles.root, {
        [styles.alignCenter]: align === ParagraphAlign.CENTER,
        [styles.alignRight]: align === ParagraphAlign.RIGHT,
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
    ParagraphAlign.CENTER,
    ParagraphAlign.LEFT,
    ParagraphAlign.RIGHT,
  ]),
};


Paragraph.defaultProps = {
  align: ParagraphAlign.LEFT,
};


export default Paragraph;
