import index from './index.mdx';
import layout from './layout';
import flex from './flex';
import margin from './margin';
import padding from './padding';


const components = {
  index,
  layout,
  flex,
  margin,
  padding,
};


export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
