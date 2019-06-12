import select from './select';
import index from './index.mdx';
import input from './input';
import checkbox from './checkbox';
import radioGroup from './radio-group';
import searchInput from './search-input';
import multiSelect from './multi-select';
import countbox from './countbox';
import datePicker from './date-picker';


const components = {
  select,
  index,
  input,
  checkbox,
  radioGroup,
  searchInput,
  multiSelect,
  countbox,
  datePicker,
};


export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
