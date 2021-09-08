import checkbox from './checkbox';
import dateInput from './date-input';
import formGroup from './form-group';
import hint from './hint';
import index from './index.mdx';
import inlineEdit from './inline-edit';
import input from './input';
import inputGroup from './input-group';
import multiSelect from './multi-select';
import numberInput from './number-input';
import radioGroup from './radio-group';
import rangeInput from './range-input';
import searchInput from './search-input';
import select from './select';
import textArea from './text-area';
import phoneNumberInput from './phone-number-input';

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
  inlineEdit,
  phoneNumberInput,
};

export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
