import React, { useEffect } from 'react';
import { css, cx } from 'emotion';
import sv, { fade } from '@drawbotics/drylus-style-vars';
import omit from 'lodash/omit';
import startCase from 'lodash/startCase';
import kebabCase from 'lodash/kebabCase';
import last from 'lodash/last';
import { Title } from '@drawbotics/react-drylus';
import { withRouter, Link } from 'react-router-dom';


const styles = {
  linksNavigation: css`
    background: ${sv.white};
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;

    @media ${sv.phoneLandscape} {
      display: none;
    }
  `,
  navigationTitle: css`
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
    color: ${sv.colorSecondary} !important;
    text-transform: uppercase;
    padding: ${sv.paddingExtraSmall} ${sv.defaultPadding};
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


export function generateLinks({ route, routeName, parent='', pathname, base='' }) {
  const newPath = routeName ? `/${kebabCase(parent)}/${kebabCase(routeName)}` : `/${kebabCase(parent)}`;
  const withBase = `/${base}/${newPath}`;
  const cleaned = withBase.replace(/\/+/g, '/');
  const active = pathname === cleaned;
  if (typeof route !== 'function') {
    return (
      <div key={cleaned} className={styles.section}>
        {do{
          if (routeName) {
            const link = (
              <div className={cx(styles.title, {
                [styles.link]: route.index,
                [styles.active]: active,
              })}>
                {startCase(routeName)}
              </div>
            );
            if (route.index) {
              return (
                <Link to={cleaned}>
                  {link}
                </Link>
              );
            }
            else {
              return link;
            }
          }
        }}
        <div className={cx(styles.sublinks, { [styles.root]: ! routeName })}>
          {Object.keys(omit(route, 'index')).map((routeName) => generateLinks({
            route: route[routeName],
            routeName,
            parent: newPath,
            pathname,
            base,
          }))}
        </div>
      </div>
    );
  }
  else {
    return (
      <Link key={cleaned} to={cleaned}>
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


const LinksNavigation = ({ title, routes, location, base }) => {
  useEffect(() => {
    const current = last(location.pathname.split('/'));
    document.title = `Drawbotics Styleguide - ${startCase(current)}`;
  }, [location.pathname]);
  return (
    <div className={styles.linksNavigation}>
      <div className={styles.navigationTitle}>
        <Title size={4} noMargin>{title}</Title>
      </div>
      <div className={styles.links}>
        {generateLinks({ route: routes, pathname: location.pathname, base })}
      </div>
    </div>
  );
};


export default withRouter(LinksNavigation);
