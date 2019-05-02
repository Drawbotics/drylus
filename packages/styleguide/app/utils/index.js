export function generateRoutes(route, routeName, parent='') {
  const newPath = routeName ? `${parent}/${routeName}` : parent;
  const noIndex = newPath.includes('index') ? newPath.replace('/index', '') : newPath;
  if (typeof route !== 'function') {
    return Object.keys(route).reduce((memo, routeName) => ({ ...memo, ...generateRoutes(route[routeName], routeName, noIndex) }), {});
  }
  else {
    return {
      [noIndex]: route,
    };
  }
}
