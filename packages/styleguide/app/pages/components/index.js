import button from './button';
import title from './title';
import roundIcon from './round-icon';
import segmentedControl from './segmented-control';
import table from './table';
import label from './label';
import panel from './panel';
import pagination from './pagination';
import badge from './badge';
import drawer from './drawer';
import combinationFilter from './combination-filter';
import icon from './icon';


const components = {
  button,
  title,
  roundIcon,
  segmentedControl,
  table,
  label,
  panel,
  pagination,
  badge,
  drawer,
  combinationFilter,
  icon,
};


export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
