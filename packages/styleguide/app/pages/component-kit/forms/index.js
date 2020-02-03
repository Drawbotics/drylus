import checkbox from './checkbox';
import dateInput from './date-input';
import formGroup from './form-group';
import hint from './hint';
import index from './index.mdx';
import input from './input';
import inputGroup from './input-group';
import multiSelect from './multi-select';
import numberInput from './number-input';
import radioGroup from './radio-group';
import rangeInput from './range-input';
import searchInput from './search-input';
import select from './select';
import textArea from './text-area';

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
