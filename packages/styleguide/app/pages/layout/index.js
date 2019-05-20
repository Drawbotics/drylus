import index from './index.mdx';
import layout from './layout';
import flex from './flex';


const components = {
  index,
  layout,
  flex,
};


export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
