import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Align } from '../enums';
import { Responsive, Style } from '../types';
import { useResponsiveProps } from '../utils';

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
  alignJustify: css`
    text-align: justify;
  `,
};

export interface TitleProps {
  /** Text displayed by the title */
  children: React.ReactNode;

  /**
   * Each number is equivalent to the h[n] in html, smaller value equals larger title
   * @default 1
   */
  size?: 1 | 2 | 3 | 4;

  /** Use this if you dont want the component to set margin. By default it has some top and bottom margin since it is a textual component */
  noMargin?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** @default Align.LEFT */
  align?: Align;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const Title = ({ responsive, ...rest }: TitleProps) => {
  const { children, size = 1, noMargin, style, align = Align.LEFT, className } = useResponsiveProps<
    TitleProps
  >(rest, responsive);

  if (size < 1 || size > 4) {
    console.warn('Unsupported title size');
    return null;
  }
  return (
    <h1
      style={style}
      className={cx(
        styles.root,
        {
          [styles.h1]: size === 1,
          [styles.h2]: size === 2,
          [styles.h3]: size === 3,
          [styles.h4]: size === 4,
          [styles.noMargin]: noMargin === true,
          [styles.alignCenter]: align === Align.CENTER,
          [styles.alignRight]: align === Align.RIGHT,
          [styles.alignJustify]: align === Align.JUSTIFY,
        },
        className,
      )}>
      {children}
    </h1>
  );
};
