import React from 'react';
import { css, cx } from 'emotion';
import sv, { fade } from '@drawbotics/style-vars';
import omit from 'lodash/omit';
import startCase from 'lodash/startCase';
import kebabCase from 'lodash/kebabCase';
import { Title } from '@drawbotics/react-drylus';
import { withRouter } from 'react-router-dom';

import Link from './Link';


const styles = {
  sidebar: css`
    background: ${sv.neutralLightest};
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;
  `,
  sidebarTitle: css`
    padding: ${sv.paddingExtraLarge} ${sv.defaultPadding};
    padding-left: 0;
    margin: 0 ${sv.marginSmall};
    border-bottom: 1px solid ${sv.neutral};
  `,
  links: css`
    flex: 1;
    overflow: scroll;
    padding-top: ${sv.defaultPadding};
  `,
  title: css`
    color: ${sv.colorSecondary};
    text-transform: uppercase;
    padding: ${sv.paddingExtraSmall} ${sv.defaultPadding};

    a {
      cursor: pointer;
      color: ${sv.colorSecondary};
    }
  `,
  link: css`
    position: relative;
    padding: ${sv.paddingExtraSmall} ${sv.defaultPadding};
    color: ${sv.colorPrimary};

    &:hover {
      cursor: pointer;
      background: ${fade(sv.neutralLight, 50)};
    }

    &::after {
      content: ' ';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0px;
      height: 100%;
      background: ${sv.brand};
      z-index: 2;
      transition: ${sv.defaultTransition};
    }
  `,
  sublinks: css`
    & > a > [data-element="link"] {
      padding-left: ${sv.paddingExtraLarge};
    }
  `,
  root: css`
    & > a > [data-element="link"] {
      padding-left: ${sv.defaultPadding};
    }
  `,
  active: css`
    background: ${sv.neutralLight} !important;

    &::after {
      width: 4px !important;
    }
  `,
};


export function generateLinks(route, routeName, parent='', pathname) {
  const newPath = routeName ? `/${kebabCase(parent)}/${kebabCase(routeName)}` : `/${kebabCase(parent)}`;
  const cleaned = newPath.replace(/\/+/g, '/');
  const active = pathname === cleaned;
  if (typeof route !== 'function') {
    return (
      <div key={cleaned} className={styles.section}>
        {do{
          if (routeName) {
            <div className={cx(styles.title, {
              [styles.link]: route.index,
              [styles.active]: active,
            })}>
              {do{
                if (route.index) {
                  <Link href={cleaned}>
                    {startCase(routeName)}
                  </Link>
                }
                else {
                  routeName
                }
              }}
            </div>
          }
        }}
        <div className={cx(styles.sublinks, { [styles.root]: ! routeName })}>
          {Object.keys(omit(route, 'index')).map((routeName) => generateLinks(route[routeName], routeName, newPath, pathname))}
        </div>
      </div>
    );
  }
  else {
    return (
      <Link key={cleaned} href={cleaned}>
        <div
          className={cx(styles.link, {
            [styles.active]: active,
          })}
          data-element="link">
          {startCase(routeName)}
        </div>
      </Link>
    );
  }
}


const Sidebar = ({ routes, location }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarTitle}>
        <Title size={4} noMargin>Component kit</Title>
      </div>
      <div className={styles.links}>
        {generateLinks(routes, undefined, undefined, location.pathname)}
      </div>
    </div>
  );
};


export default withRouter(Sidebar);
