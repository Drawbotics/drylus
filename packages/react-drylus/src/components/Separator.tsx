import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Style } from '../types';

const styles = {
  root: css`
    height: 1px;
    width: 100%;
    flex: 1;
    background: ${sv.neutralLight};
  `,
  vertical: css`
    width: 1px;
    height: 100%;
  `,
};

export interface SeparatorProps {
  /** If true, the separator is rendered in a vertical fashion, by default it takes the full width of the container */
  vertical?: boolean;

  /** Used for style overrides */
  style?: Style;
}

export const Separator = ({ vertical, style }: SeparatorProps) => {
  return (
    <div style={style} className={cx(styles.root, { [styles.vertical]: vertical === true })} />
  );
};
