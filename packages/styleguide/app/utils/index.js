export function generateRoutes(route, routeName, parent='') {
  const newPath = routeName ? `${parent}/${routeName}` : parent;
  if (typeof route !== 'function') {
    return Object.keys(route).reduce((memo, routeName) => ({ ...memo, ...generateRoutes(route[routeName], routeName, newPath) }), {});
  }
  else {
    return {
      [newPath]: route,
    };
  }
}
