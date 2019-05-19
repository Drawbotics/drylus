import layout from './layout';
import index from './index.mdx';


const components = {
  index,
  layout,
};


export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
