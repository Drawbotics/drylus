import React from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import { Link } from 'react-router-dom';
import omit from 'lodash/omit';
import startCase from 'lodash/startCase';


const styles = {
  sidebar: css`
    height: 100%;
    background: ${sv.neutral};
    padding: ${sv.defaultPadding};
    overflow-y: scroll;
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
    a {
      color: ${sv.colorPrimary};
    }
    margin-bottom: ${sv.marginSmall};
  `,
  sublinks: css`
    padding-left: ${sv.defaultPadding};
  `,
  root: css`
    padding-left: 0;
  `,
};


export function generateLinks(route, routeName, parent='') {
  const newPath = routeName ? `${parent}/${routeName}` : parent;
  if (typeof route !== 'function') {
    return (
      <div key={newPath} className={styles.section}>
        {do{
          if (routeName) {
            <div className={styles.title}>
              {do{
                if (route.index) {
                  <div className={styles.link}>
                    <Link to={newPath}>{startCase(routeName)}</Link>
                  </div>
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
      <div className={styles.link} key={newPath}>
        <Link to={newPath}>{startCase(routeName)}</Link>
      </div>
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
