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
import filter from './filter';
import icon from './icon';
import tabNavigation from './tab-navigation';
import listTile from './list-tile';
import avatar from './avatar';
import text from './text';
import dot from './dot';
import tooltip from './tooltip';
import collapsible from './collapsible';
import link from './link';
import modal from './modal';


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
  filter,
  icon,
  tabNavigation,
  listTile,
  avatar,
  text,
  dot,
  tooltip,
  collapsible,
  link,
  modal,
};


export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
