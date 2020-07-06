import { addDocumentReady } from '../utils';
import alerts from './alerts';
import dropdown from './dropdown';
import modal, { closeModal } from './modal';
import multiSelect from './multi-select';
import searchInput from './searchInput';

addDocumentReady();

export default {
  dropdown,
  searchInput,
  alerts,
  modal,
  closeModal,
  multiSelect,
  all() {
    dropdown();
    searchInput();
    alerts();
    modal();
    multiSelect();
  },
};
