import dropdown from './dropdown';
import searchInput from './searchInput';
import alerts from './alerts';
import modal, { closeModal } from './modal';

import { addDocumentReady } from '../utils';


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
}
