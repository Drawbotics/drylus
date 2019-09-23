import layout from './layout';
import flex from './flex';
import margin from './margin';
import padding from './padding';
import grid from './grid';
import index from './index.mdx';


const components = {
  layout,
  flex,
  margin,
  padding,
  grid,
  index,
};


export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
