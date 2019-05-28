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
import tabNavigation from './tab-navigation';
import listTile from './list-tile';
import avatar from './avatar';


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
  tabNavigation,
  listTile,
  avatar,
};


export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
