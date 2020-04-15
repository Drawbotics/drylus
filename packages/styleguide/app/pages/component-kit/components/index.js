import alerts from './alerts';
import avatar from './avatar';
import badge from './badge';
import banner from './banner';
import bigCheckbox from './big-checkbox';
import bigRadio from './big-radio';
import breadcrumbs from './breadcrumbs';
import button from './button';
import buttonLink from './button-link';
import callout from './callout';
import circularProgress from './circular-progress';
import collapsible from './collapsible';
import dot from './dot';
import drawer from './drawer';
import dropdown from './dropdown';
import emptyState from './empty-state';
import filter from './filter';
import filterGroup from './filter-group';
import icon from './icon';
import label from './label';
import list from './list';
import loadingPlaceholder from './loading-placeholder';
import map from './map';
import modal from './modal';
import pagination from './pagination';
import panel from './panel';
import paragraph from './paragraph';
import popover from './popover';
import progressBar from './progress-bar';
import roundIcon from './round-icon';
import segmentedControl from './segmented-control';
import separator from './separator';
import spinner from './spinner';
import splashScreen from './splash-screen';
import steppedProgressBar from './stepped-progress-bar';
import tabNavigation from './tab-navigation';
import table from './table';
import tag from './tag';
import text from './text';
import textLink from './text-link';
import tile from './tile';
import title from './title';
import toggle from './toggle';
import tooltip from './tooltip';
import uploadBox from './upload-box';

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
  callout,
  buttonLink,
  alerts,
  splashScreen,
  breadcrumbs,
  dropdown,
  list,
  paragraph,
  map,
  filterGroup,
  popover,
  tile,
  progressBar,
  loadingPlaceholder,
  steppedProgressBar,
  uploadBox,
};

export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
