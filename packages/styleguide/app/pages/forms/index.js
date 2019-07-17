import select from './select';
import index from './index.mdx';
import input from './input';
import checkbox from './checkbox';
import radioGroup from './radio-group';
import searchInput from './search-input';
import multiSelect from './multi-select';
import numberInput from './number-input';
import datePicker from './date-picker';
import formGroup from './form-group';
import inputGroup from './input-group';
import hint from './hint';


const components = {
  select,
  index,
  input,
  checkbox,
  radioGroup,
  searchInput,
  multiSelect,
  numberInput,
  datePicker,
  formGroup,
  inputGroup,
  hint,
};


export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
