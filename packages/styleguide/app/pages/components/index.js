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
import textLink from './text-link';
import modal from './modal';
import tag from './tag';
import spinner from './spinner';
import bigRadio from './big-radio';
import bigCheckbox from './big-checkbox';
import toggle from './toggle';
import separator from './separator';
import circularProgress from './circular-progress';
import emptyState from './empty-state';
import banner from './banner';


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
  textLink,
  modal,
  tag,
  spinner,
  bigRadio,
  bigCheckbox,
  toggle,
  separator,
  circularProgress,
  emptyState,
  banner,
};


export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
