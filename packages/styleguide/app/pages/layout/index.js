import index from './index.mdx';
import layout from './layout';
import flex from './flex';
import margin from './margin';


const components = {
  index,
  layout,
  flex,
  margin,
};


export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
