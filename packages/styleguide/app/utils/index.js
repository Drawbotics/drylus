import kebabCase from 'lodash/kebabCase';


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
