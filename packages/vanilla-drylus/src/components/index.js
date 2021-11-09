import { addDocumentReady } from '../utils';
import alerts from './alerts';
import dropdown from './dropdown';
import filter from './filter';
import modal, { closeModal } from './modal';
import multiSelect from './multi-select';
import searchInput from './searchInput';

addDocumentReady();

export default {
  dropdown,
  filter,
  searchInput,
  alerts,
  modal,
  closeModal,
  multiSelect,
  all() {
    filter();
    dropdown();
    searchInput();
    alerts();
    modal();
    multiSelect();
  },
};
