import { addDocumentReady } from '../utils';
import alerts from './alerts';
import dropdown from './dropdown';
import modal, { closeModal } from './modal';
import searchInput from './searchInput';

addDocumentReady();

export default {
  dropdown,
  searchInput,
  alerts,
  modal,
  closeModal,
  all() {
    dropdown();
    searchInput();
    alerts();
    modal();
  },
};
