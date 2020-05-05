import dashboardGrid from './dashboard-grid';
import index from './index.mdx';

const components = {
  index,
  dashboardGrid,
};

export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
