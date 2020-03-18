import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Category } from '../enums';
import { Responsive, Style } from '../types';
import { getEnumAsClass, useResponsiveProps } from '../utils';

const styles = {
  root: css`
    font-size: 0.8rem;
    color: ${sv.colorSecondary};
    margin-top: ${sv.marginExtraSmall};
  `,
  danger: css`
    color: ${sv.red};
  `,
};

interface HintProps {
  /** Text displayed by the hint */
  children: React.ReactNode;

  category?: Category.DANGER;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const Hint = ({ responsive, ...rest }: HintProps) => {
  const { children, category, style } = useResponsiveProps<HintProps>(rest, responsive);

  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles[getEnumAsClass<typeof styles>(category)]]: category != null,
      })}>
      {children}
    </div>
  );
};