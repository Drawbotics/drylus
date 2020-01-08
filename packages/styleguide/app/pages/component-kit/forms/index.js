import select from './select';
import index from './index.mdx';
import input from './input';
import checkbox from './checkbox';
import radioGroup from './radio-group';
import searchInput from './search-input';
import multiSelect from './multi-select';
import numberInput from './number-input';
import dateInput from './date-input';
import formGroup from './form-group';
import inputGroup from './input-group';
import hint from './hint';
import textArea from './text-area';
import rangeInput from './range-input';


const components = {
  select,
  index,
  input,
  checkbox,
  radioGroup,
  searchInput,
  multiSelect,
  numberInput,
  dateInput,
  formGroup,
  inputGroup,
  hint,
  textArea,
  rangeInput,
};


export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
