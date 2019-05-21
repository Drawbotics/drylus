import button from './button';
import title from './title';
import roundIcon from './round-icon';
import segmentedControl from './segmented-control';
import table from './table';
import label from './label';
import panel from './panel';
import pagination from './pagination';


const components = {
  button,
  title,
  roundIcon,
  segmentedControl,
  table,
  label,
  panel,
  pagination,
};


export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
