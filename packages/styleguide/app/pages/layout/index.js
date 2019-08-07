import layout from './layout';
import flex from './flex';
import margin from './margin';
import padding from './padding';
import grid from './grid';


const components = {
  layout,
  flex,
  margin,
  padding,
  grid,
};


export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
