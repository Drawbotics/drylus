import flex from './flex';
import grid from './grid';
import index from './index.mdx';
import layout from './layout';
import listTile from './list-tile';
import margin from './margin';
import padding from './padding';

const components = {
  layout,
  flex,
  margin,
  padding,
  grid,
  listTile,
  index,
};

export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
