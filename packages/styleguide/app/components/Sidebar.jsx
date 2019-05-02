import React from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import { Link } from 'react-router-dom';


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
    color: ${sv.red};
    margin-bottom: ${sv.marginSmall};
  `,
  link: css`
    color: ${sv.blue};
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
              {routeName}
            </div>
          }
        }}
        <div className={cx(styles.sublinks, { [styles.root]: ! routeName })}>
          {Object.keys(route).map((routeName) => generateLinks(route[routeName], routeName, newPath))}
        </div>
      </div>
    );
  }
  else {
    return (
      <div className={styles.link} key={newPath}>
        <Link to={newPath}>{routeName}</Link>
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
