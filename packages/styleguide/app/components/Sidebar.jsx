import React from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import omit from 'lodash/omit';
import startCase from 'lodash/startCase';
import kebabCase from 'lodash/kebabCase';
import { Title } from '@drawbotics/react-drylus';

import Link from './Link';


const styles = {
  sidebar: css`
    background: ${sv.neutralLightest};
    flex: 1;
  `,
  sidebarTitle: css`
    padding: ${sv.paddingExtraLarge} ${sv.defaultPadding};
    padding-left: 0;
    margin: 0 ${sv.marginSmall};
    border-bottom: 1px solid ${sv.neutral};
  `,
  links: css`
    margin-top: ${sv.defaultMargin};
    overflow: scroll;
  `,
  title: css`
    color: ${sv.colorSecondary};
    text-transform: uppercase;
    margin-bottom: ${sv.marginSmall};
  `,
  link: css`
    margin-bottom: ${sv.marginSmall};
    color: ${sv.colorPrimary};

    &:hover {
      cursor: pointer;
      color: ${sv.blue};
    }
  `,
  sublinks: css`
    padding-left: ${sv.defaultPadding};
  `,
  root: css`
    padding-left: 0;
  `,
};


export function generateLinks(route, routeName, parent='') {
  const newPath = routeName ? `/${kebabCase(parent)}/${kebabCase(routeName)}` : `/${kebabCase(parent)}`;
  const cleaned = newPath.replace(/\/+/g, '/');
  if (typeof route !== 'function') {
    return (
      <div key={cleaned} className={styles.section}>
        {do{
          if (routeName) {
            <div className={styles.title}>
              {do{
                if (route.index) {
                  <Link href={cleaned}>
                    <div className={styles.link}>
                      {startCase(routeName)}
                    </div>
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
          {Object.keys(omit(route, 'index')).map((routeName) => generateLinks(route[routeName], routeName, newPath))}
        </div>
      </div>
    );
  }
  else {
    return (
      <Link key={cleaned} href={cleaned}>
        <div className={styles.link}>
          {startCase(routeName)}
        </div>
      </Link>
    );
  }
}


const Sidebar = ({ routes }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarTitle}>
        <Title size={4} noMargin>Component kit</Title>
      </div>
      <div className={styles.links}>
        {generateLinks(routes)}
      </div>
    </div>
  );
};


export default Sidebar;
