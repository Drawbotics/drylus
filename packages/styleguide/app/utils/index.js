import kebabCase from 'lodash/kebabCase';
import startCase from 'lodash/startCase';


export function generateRoutes(route, routeName, parent='') {
  const newPath = routeName ? `/${kebabCase(parent)}/${kebabCase(routeName)}` : `/${kebabCase(parent)}`;
  const noIndex = newPath.includes('index') ? newPath.replace('/index', '') : newPath;
  if (typeof route !== 'function') {
    return Object.keys(route).reduce((memo, routeName) => ({ ...memo, ...generateRoutes(route[routeName], routeName, noIndex) }), {});
  }
  else {
    return {
      [noIndex.replace(/\/+/g, '/')]: route,
    };
  }
}


export function generateRouteObjects(route, routeName, parent='') {
  const newPath = routeName ? `/${kebabCase(parent)}/${kebabCase(routeName)}` : `/${kebabCase(parent)}`;
  const noIndex = newPath.includes('index') ? newPath.replace('/index', '') : newPath;
  if (typeof route !== 'function') {
    return Object.keys(route).reduce((memo, routeName) => ([ ...memo, ...generateRouteObjects(route[routeName], routeName, noIndex) ]), []);
  }
  else {
    const baseName = parent.replace(/\//g, '');
    return [{
      name: routeName === 'index' ? startCase(baseName) : startCase(routeName),
      url: noIndex.replace(/\/+/g, '/'),
      base: baseName,
    }];
  }
}
