import { css, cx } from 'emotion';
import React from 'react';

import { Position } from '../enums';
import { Responsive, Style } from '../types';
import { getEnumAsClass, useResponsiveProps } from '../utils';

const styles = {
  layout: css`
    display: grid;
    width: 100%;
    height: 100%;
  `,
  top: css`
    grid-template-rows: max-content minmax(0, 1fr);

    > [data-element='layout-bar'] {
      grid-column: 1;
      grid-row: 1;
    }
    > [data-element='layout-content'] {
      grid-column: 1;
      grid-row: 2;
    }
  `,
  bottom: css`
    grid-template-rows: minmax(0, 1fr) max-content;

    > [data-element='layout-bar'] {
      grid-column: 1;
      grid-row: 2;
    }
    > [data-element='layout-content'] {
      grid-column: 1;
      grid-row: 1;
    }
  `,
  right: css`
    grid-template-columns: minmax(0, 1fr) max-content;

    > [data-element='layout-bar'] {
      grid-column: 2;
      grid-row: 1;
    }
    > [data-element='layout-content'] {
      grid-column: 1;
      grid-row: 1;
    }
  `,
  left: css`
    grid-template-columns: max-content minmax(0, 1fr);

    > [data-element='layout-bar'] {
      grid-column: 1;
      grid-row: 1;
    }
    > [data-element='layout-content'] {
      grid-column: 2;
      grid-row: 1;
    }
  `,
  bar: css`
    display: flex;
    flex-direction: column;
  `,
  content: css`
    display: flex;
    flex-direction: column;

    > [data-element='layout'] {
      flex: 1;
      height: auto;
    }
  `,
  scrollable: css`
    overflow: auto;
  `,
};

export interface LayoutProps {
  /** Children can be of any type. You can pass another Layout if needed as well */
  children: React.ReactNode;

  /** Component that will be displayed in addition to the children */
  bar: React.ReactNode;

  /** Determines on which side of the layout the bar component will be shown */
  position: Position;

  /** If true the component will be fixed in place, and the children will scroll independently */
  fixed?: boolean;

  /**
   * If false the sidebar container is not made scrollable
   * @default true
   */
  barScrollable?: boolean;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const Layout = ({ responsive, ...rest }: LayoutProps) => {
  const {
    children,
    position,
    bar,
    fixed,
    barScrollable = true,
    style,
    className,
  } = useResponsiveProps<LayoutProps>(rest, responsive);

  return (
    <div
      style={style}
      data-element="layout"
      className={cx(
        styles.layout,
        {
          [styles[getEnumAsClass<typeof styles>(position)]]: position != null,
        },
        className,
      )}>
      <div
        className={cx(styles.bar, { [styles.scrollable]: barScrollable })}
        data-element="layout-bar">
        {bar}
      </div>
      <div
        className={cx(styles.content, { [styles.scrollable]: fixed === true })}
        data-element="layout-content">
        {children}
      </div>
    </div>
  );
};
