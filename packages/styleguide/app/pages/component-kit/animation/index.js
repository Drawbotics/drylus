import dashboardGrid from './dashboard-grid';
import index from './index.mdx';
import toolbar from './toolbar';
import routeChanges from './route-changes';

const components = {
  index,
  dashboardGrid,
  toolbar,
  routeChanges,
};

export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
