import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { Fragment } from 'react';

import { Style } from '../types';
import { run } from '../utils';

const styles = {
  root: css`
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
  `,
  crumb: css`
    padding: 5px;
    transition: ${sv.transitionShort};
    color: ${sv.colorSecondary};
    border-radius: ${sv.defaultBorderRadius};

    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }
  `,
  clickable: css`
    color: ${sv.blue};

    &:hover {
      cursor: pointer;
      background: ${sv.neutralLight};
      color: ${sv.blue};
    }
  `,
  active: css`
    color: ${sv.colorPrimary};
  `,
  divisor: css`
    margin: 0 3px;
    color: ${sv.colorSecondary};
  `,
};

interface Crumb {
  label: string;
  url?: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  /** Array of objects with properties: label (text), url (link to page), active (if crumb is current page) */
  crumbs: Array<Crumb>;

  /** If provided, will wrap the breadcrumb and use its given url */
  linkComponent?: React.ReactNode;

  /** Used for style overrides */
  style?: Style;
}

export const Breadcrumbs = ({ crumbs, linkComponent: Link, style }: BreadcrumbsProps) => {
  const renderCrumb = (crumb: Crumb) => (
    <div
      className={cx(styles.crumb, {
        [styles.clickable]: crumb.url != null,
        [styles.active]: crumb.active,
      })}>
      {crumb.label}
    </div>
  );
  return (
    <div className={styles.root} style={style}>
      {crumbs.map((crumb, i) => (
        <Fragment key={i}>
          {run(() => {
            if (i > 0) {
              return <div className={styles.divisor}>/</div>;
            }
          })}
          {Link
            ? React.createElement(
                Link as React.ComponentClass<{ href?: string }>,
                { href: crumb.url },
                renderCrumb(crumb),
              )
            : renderCrumb(crumb)}
        </Fragment>
      ))}
    </div>
  );
};