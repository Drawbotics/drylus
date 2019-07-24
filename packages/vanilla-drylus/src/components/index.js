import dropdown from './dropdown';
import searchInput from './searchInput';
import alerts from './alerts';

import { addDocumentReady } from '../utils';


addDocumentReady();


export default {
  dropdown,
  searchInput,
  alerts,
  all() {
    dropdown();
    searchInput();
    alerts();
  },
}
