import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Align } from '../enums';
import { Responsive, Style } from '../types';
import { useResponsiveProps } from '../utils';

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

export interface ParagraphProps {
  /** Text displayed by the paragraph */
  children: React.ReactNode;

  /**
   * @default Align.LEFT
   */
  align?: Align;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const Paragraph = ({ responsive, ...rest }: ParagraphProps) => {
  const { children, style, align = Align.LEFT } = useResponsiveProps<ParagraphProps>(
    rest,
    responsive,
  );
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
