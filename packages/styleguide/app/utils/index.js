import kebabCase from 'lodash/kebabCase';
import startCase from 'lodash/startCase';


export function generateRoutes({ route, routeName, parent='', base }) {
  const newPath = routeName ? `/${kebabCase(parent)}/${kebabCase(routeName)}` : `/${kebabCase(parent)}`;
  const noIndex = newPath.includes('index') ? newPath.replace('/index', '') : newPath;
  const withBase = base ? `/${base}/${noIndex}` : noIndex;
  if (typeof route !== 'function') {
    return Object.keys(route).reduce((memo, routeName) => ({
      ...memo,
      ...generateRoutes({
        route: route[routeName],
        routeName,
        parent: noIndex,
        base,
      }),
    }), {});
  }
  else {
    return {
      [withBase.replace(/\/+/g, '/').replace(/\/$/, "")]: route,
    };
  }
}


export function generateRouteObjects({ route, routeName, parent='', base }) {
  const newPath = routeName ? `/${kebabCase(parent)}/${kebabCase(routeName)}` : `/${kebabCase(parent)}`;
  const noIndex = newPath.includes('index') ? newPath.replace('/index', '') : newPath;
  const withBase = base ? `/${base}/${noIndex}` : noIndex;
  if (typeof route !== 'function') {
    return Object.keys(route).reduce((memo, routeName) => ([
      ...memo,
      ...generateRouteObjects({
        route: route[routeName],
        routeName,
        parent: noIndex,
      }),
    ]), []);
  }
  else {
    const baseName = parent.replace(/\//g, '');
    return [{
      name: routeName === 'index' ? startCase(baseName) : startCase(routeName),
      url: withBase.replace(/\/+/g, '/').replace(/\/$/, ""),
      base: baseName,
    }];
  }
}
