import dashboardGrid from './dashboard-grid';
import index from './index.mdx';
import toolbar from './toolbar';

const components = {
  index,
  dashboardGrid,
  toolbar,
};

export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
