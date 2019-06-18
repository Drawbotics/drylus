import React from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import omit from 'lodash/omit';
import startCase from 'lodash/startCase';
import kebabCase from 'lodash/kebabCase';

import Link from './Link';


const styles = {
  sidebar: css`
    background: ${sv.neutral};
    padding: ${sv.defaultPadding};
    flex: 1;
  `,
  links: css`
    margin-top: ${sv.defaultMargin};
  `,
  title: css`
    color: ${sv.colorSecondary};
    text-transform: uppercase;
    margin-bottom: ${sv.marginSmall};
  `,
  link: css`
    margin-bottom: ${sv.marginSmall};

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
      Styleguide sidebar
      <div className={styles.links}>
        {generateLinks(routes)}
      </div>
    </div>
  );
};


export default Sidebar;
